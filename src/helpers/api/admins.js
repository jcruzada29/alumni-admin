import request from './request';

export default {
	async getAdmins(query) {
		const res = await request.get(`/admin/admins`, query);
		return res;
	},
	async getAdminById(id) {
		const res = await request.get(`/admin/admins/id?id=${id}`);
		return res;
	},
	async createAdmin(body) {
		const res = await request.post(`/admin/admins`, body);
		return res;
	},
	async updateAdminById(id, body) {
		const res = await request.patch(`/admin/admins/id?id=${id}`, body);
		return res;
	},
	async deleteAdminById(id) {
		const res = await request.delete(`/admin/admins/id?id=${id}`);
		return res;
	}
};
