import request from './request';

export default {
	async getParkingAdmins(query) {
		const res = await request.get(`/admin/parking-admins`, query);
		return res;
	},
	async getParkingAdminById(query) {
		const res = await request.get(`/admin/parking-admins/id`, query);
		return res;
	},
	async createParkingAdmin(body) {
		const res = await request.post(`/admin/parking-admins`, body);
		return res;
	},
	async updateParkingAdminById(id, body) {
		const res = await request.patch(`/admin/parking-admins/id?id=${id}`, body);
		return res;
	}
};