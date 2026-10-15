import frappe
from frappe import _
from frappe.utils import getdate

@frappe.whitelist(allow_guest=False)
def get_practitioner_slots(practitioner: str, date: str):
    """
    Fetches available slots for a practitioner using core Healthcare availability logic.
    Requires authenticated user session.
    """
    if not practitioner or not date:
        return []

    practitioner_doc = frappe.get_doc("Healthcare Practitioner", practitioner)
    availability = practitioner_doc.get_availability_data(getdate(date))
    return availability.get("slot_details", [])

@frappe.whitelist(allow_guest=False)
def create_appointment(patient: str, practitioner: str, date: str, time: str, department: str = None, notes: str = None):
    """
    Creates and inserts a Patient Appointment record.
    Requires authenticated user session and enforces doc permissions.
    """
    if not patient:
        frappe.throw(_("Patient ID is required to book an appointment."))

    try:
        appointment = frappe.get_doc({
            "doctype": "Patient Appointment",
            "patient": patient,
            "practitioner": practitioner,
            "appointment_date": date,
            "appointment_time": time,
            "department": department,
            "notes": notes,
            "status": "Open"
        })
        
        # Enforces standard user permission checks based on logged-in user role
        appointment.insert()

        return {
            "success": True,
            "appointment_id": appointment.name,
            "message": _("Appointment scheduled successfully.")
        }

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Patient Appointment Creation Failed")
        frappe.throw(str(e))