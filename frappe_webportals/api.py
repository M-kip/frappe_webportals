import frappe  # pyright: ignore[reportMissingImports]
from frappe import _ # pyright: ignore[reportMissingImports]
from frappe.utils import getdate, time_diff_in_seconds # pyright: ignore[reportMissingImports]
from datetime import timedelta


@frappe.whitelist(allow_guest=True)
def register_patient(first_name: str, mobile_no: str, email: str | None = None, gender: str | None = None, birth_date: str | None = None):
    """
    Whitelisted public endpoint to register a new Patient in Frappe Health.
    """
    if not first_name or not mobile_no:
        return {
            "success": False,
            "message": "First Name and Mobile Number are required fields."
        }

    try:
        # Optional: Check if a patient with this mobile number already exists to prevent duplicates
        existing_patient = frappe.db.exists("Patient", {"mobile_no": mobile_no})
        if existing_patient:
            return {
                "success": False,
                "message": "A patient with this mobile number is already registered.",
                "patient_name": existing_patient
            }

        # Create a new Patient document
        new_patient = frappe.get_doc({
            "doctype": "Patient",
            "first_name": first_name,
            "mobile_no": mobile_no,
            "email": email,
            "gender": gender,
            "birth_date": birth_date,
            # If your custom setup requires a default customer group/territory, you can add them here:
            # "customer_group": "Commercial",
            # "territory": "All Territories"
        })
        
        # Insert the document into the database (bypassing strict session permissions for guests)
        new_patient.insert(ignore_permissions=True)
        frappe.db.commit()

        return {
            "success": True,
            "message": "Patient registered successfully!",
            "patient_id": new_patient.name,
            "patient_name": new_patient.patient_name
        }

    except Exception as e:
        frappe.db.rollback()
        frappe.log_error(title="Patient Public Registration Failed", message=frappe.get_traceback())
        return {
            "success": False,
            "error": str(e)
        }

@frappe.whitelist(allow_guest=True)
def get_practitioners_list(department: str | None = None):
    """
    Retrieves a list of Healthcare Practitioners (doctors).
    Optionally filters by department.
    """
    try:
        # Check if the Healthcare Practitioner DocType exists to prevent hard errors
        if not frappe.db.exists("DocType", "Healthcare Practitioner"):
            return {
                "success": False,
                "message": "Healthcare module or Practitioner DocType is not installed."
            }

        filters = {}
        # Only filter by department if a valid, non-empty department string is passed
        if department and department != "null" and department != "undefined":
            filters["department"] = department

        # Fetch practitioners from the database
        practitioners = frappe.get_all(
            "Healthcare Practitioner",
            filters=filters,
            fields=[
                "name", 
                "practitioner_name", 
                "department", 
                "op_consulting_charge", 
                "image"
            ],
            order_by="practitioner_name asc"
        )

        # Optional: Ensure image URLs are complete paths if uploaded via file manager
        for doc in practitioners:
            if doc.get("image") and not doc["image"].startswith("http"):
                # Makes relative paths like /files/doc.jpg accessible to external frontends
                doc["image"] = frappe.utils.get_url(doc["image"])

        return {
            "success": True,
            "practitioners": practitioners
        }

    except Exception as e:
        frappe.log_error(title="Fetch Practitioners Failed", message=frappe.get_traceback())
        return {
            "success": False,
            "error": str(e)
        }


@frappe.whitelist(allow_guest=True)
def get_practitioner_slots(practitioner: str, date: str):
    if not practitioner or not date:
        return {"success": False, "message": "Missing parameters"}

    try:
        target_date = getdate(date)
        if not frappe.db.exists("Healthcare Practitioner", practitioner):
            return {"success": False, "message": "Practitioner not found"}
        
        practitioner_doc = frappe.get_doc("Healthcare Practitioner", practitioner)
        day_of_week = target_date.strftime("%A")
        
        raw_slots = []
        # 1. Gather raw time slots from schedules
        for row in practitioner_doc.get("practitioner_schedules", []):
            schedule_name = row.get("schedule")
            if not schedule_name or not frappe.db.exists("Practitioner Schedule", schedule_name):
                continue
            schedule_doc = frappe.get_doc("Practitioner Schedule", schedule_name)
            
            for slot in schedule_doc.get("time_slots", []):
                if slot.get("day") == day_of_week:
                    raw_slots.append({
                        "from_time": str(slot.get("from_time")),
                        "to_time": str(slot.get("to_time")),
                        "service_unit": row.get("service_unit") or schedule_doc.get("service_unit")
                    })

        # 2. Fetch existing appointments for that day
        booked_appointments = frappe.get_all(
            "Patient Appointment",
            filters={
                "practitioner": practitioner,
                "appointment_date": target_date,
                "status": ["not in", ["Cancelled", "Closed"]]
            },
            fields=["appointment_time", "duration"]
        )

        # 3. Cross-reference: Mark slots as available or booked
        final_slots = []
        for slot in raw_slots:
            is_booked = False
            # Check if any booked appointment falls inside this slot's time range
            for appt in booked_appointments:
                appt_time = str(appt.get("appointment_time"))
                # Simple string or time comparison check
                if slot["from_time"] <= appt_time < slot["to_time"]:
                    is_booked = True
                    break
            
            final_slots.append({
                "from_time": slot["from_time"],
                "to_time": slot["to_time"],
                "service_unit": slot["service_unit"],
                "is_available": not is_booked # <--- Flag for your UI
            })

        return {
            "success": True,
            "date": str(target_date),
            "slots": final_slots
        }

    except Exception as e:
        return {"success": False, "error": str(e)}


@frappe.whitelist(allow_guest=False)
def create_appointment(patient: str, practitioner: str, date: str, time: str, department: str | None = None, notes: str | None = None):
    """
    Creates and inserts a Patient Appointment record with schedule validation.
    """
    if not patient or not practitioner or not date or not time:
        return {
            "success": False,
            "message": _("Patient, Practitioner, Date, and Time are required fields.")
        }

    try:
        target_date = getdate(date)
        day_of_week = target_date.strftime("%A")

        practitioner_doc = frappe.get_doc("Healthcare Practitioner", practitioner)

        # 1. VALIDATE: Check if the practitioner works on this day and time slot
        is_valid_slot = False
        for row in practitioner_doc.get("practitioner_schedules", []):
            schedule_name = row.get("schedule")
            if not schedule_name or not frappe.db.exists("Practitioner Schedule", schedule_name):
                continue
            
            schedule_doc = frappe.get_doc("Practitioner Schedule", schedule_name)
            for slot in schedule_doc.get("time_slots", []):
                if slot.get("day") == day_of_week:
                    # Check if the requested time falls within this time slot range
                    slot_from = str(slot.get("from_time"))
                    slot_to = str(slot.get("to_time"))
                    if slot_from <= time <= slot_to:
                        is_valid_slot = True
                        break
            if is_valid_slot:
                break

        if not is_valid_slot:
            return {
                "success": False,
                "message": _("The selected practitioner is not available at this date and time.")
            }

        # 2. VALIDATE: Prevent double booking for the same slot
        existing_booking = frappe.db.exists(
            "Patient Appointment",
            {
                "practitioner": practitioner,
                "appointment_date": target_date,
                "appointment_time": time,
                "status": ["not in", ["Cancelled", "Closed"]]
            }
        )
        if existing_booking:
            return {
                "success": False,
                "message": _("This time slot is already booked for this practitioner.")
            }

        # 3. Proceed with creation
        patient_doc = frappe.get_doc("Patient", patient)

        appointment = frappe.get_doc({
            "doctype": "Patient Appointment",
            "patient": patient,
            "patient_name": patient_doc.patient_name,
            "practitioner": practitioner,
            "practitioner_name": practitioner_doc.practitioner_name,
            "department": department or practitioner_doc.get("department"),
            "appointment_date": target_date,
            "appointment_time": time,
            "notes": notes,
            "status": "Open",
            "conflicting": 0
        })
        
        appointment.insert()
        frappe.db.commit()

        return {
            "success": True,
            "appointment_id": appointment.name,
            "message": _("Appointment scheduled successfully.")
        }

    except Exception as e:
        frappe.db.rollback()
        frappe.log_error(title="Patient Appointment Creation Failed", message=frappe.get_traceback())
        return {
            "success": False,
            "error": str(e)
        }