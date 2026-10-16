import frappe

no_cache = 1

def get_context(context):
    user = frappe.session.user
    patient = None

    if user != "Guest":
        patient_name = frappe.db.get_value("Patient", {"user_id": user}, "name")
        if patient_name:
            doc = frappe.get_doc("Patient", patient_name)
            patient = doc.as_dict()
            
            # Convert any datetime/date objects to ISO strings so JSON serialization works
            for key, value in patient.items():
                if hasattr(value, "isoformat"):
                    patient[key] = value.isoformat()

    csrf_token = frappe.sessions.get_csrf_token()

    context.boot = {
        "csrf_token": csrf_token,
        "user": user,
        "patient": patient,
    }
    return context