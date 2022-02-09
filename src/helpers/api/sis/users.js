import request from '../request';

export default {
	async getUsers(query) {
		const res = await request.get(`/admin/sis/users`, query);
		return res;
	},
	async getUserById(id) {
		const res = await request.get(`/admin/sis/users/id?id=${id}`);
		return res;
	},
	// async createUser(body) {
	// 	const res = await request.post(`/admin/users`, body);
	// 	return res;
	// },
	// async updateUserById(id, body) {
	// 	const res = await request.patch(`/admin/users/id?id=${id}`, body);
	// 	return res;
	// },
	// async deleteUserById(id) {
	// 	const res = await request.delete(`/admin/users/id?id=${id}`);
	// 	return res;
	// },
	async getEventsByUser(query) {
		const res = await request.get(`/admin/events/user`, query);
		return res;
	},
	async getCouponsByUser(query) {
		const res = await request.get(`/admin/coupons/user`, query);
		return res;
	},
	async getParkingPriviligesByUser(query) {
		const res = await request.get(`/admin/parking-privileges/user`, query);
		return res;
	}
};
