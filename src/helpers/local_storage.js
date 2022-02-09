const LocalStorageHelper = {
	getUsername() {
		try {
			const admin = JSON.parse(localStorage.getItem('wan_admin'));
			return admin.admin.email;
		} catch (e) { }
		return '';
	},
	getAdminId() {
		try {
			const admin = JSON.parse(localStorage.getItem('wan_admin'));
			return admin.admin.id;
		} catch (e) { }
		return '';
	},
	getAdminRoles() {
		const jsonData = JSON.parse(localStorage.getItem('wan_admin'));
		const { roles } = jsonData.admin;

		return roles;
	}
};

export default LocalStorageHelper;
