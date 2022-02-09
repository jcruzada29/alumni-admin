import request from './request';

export default {
	async getCheckInAdmins(query) {
		const res = await request.get(`/admin/check-in-admins`, query);
		return res;
	},
	async getCheckInAdminById(query) {
		const res = await request.get(`/admin/check-in-admins/id`, query);
		return res;
	},
	async createCheckInAdmin(body) {
		const res = await request.post(`/admin/check-in-admins`, body);
		return res;
	},
	async updateCheckInAdminById(id, body) {
		const res = await request.patch(`/admin/check-in-admins/id?id=${id}`, body);
		return res;
	}
};
