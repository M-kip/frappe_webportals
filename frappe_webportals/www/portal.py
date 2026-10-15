import frappe

no_cache = 1

def get_context(context):
    user = frappe.session.user
    patient = None

    if user != "Guest":
        patient_name = frappe.db.get_value("Patient", {"user_id": user}, "name")
        if patient_name:
            patient = frappe.get_doc("Patient", patient_name).as_dict()

    csrf_token = frappe.sessions.get_csrf_token()

    # Pass boot to the Jinja context safely
    context.boot = {
        "csrf_token": csrf_token,
        "user": user,
        "patient": patient,
    }
    context.csrf_token = csrf_token
    return context