frappe.pages['frontend_app'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'app',
		single_column: true
	});
}