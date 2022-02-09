import request from './request';

export default {
	async getParkingNotifications(query) {
		const res = await request.get(`/admin/parking-notifications`, query);
		return res;
	},
	async getParkingNotificationById(id) {
		const res = await request.get(`/admin/parking-notifications/id?id=${id}`);
		return res;
	},
	async createParkingNotification(body) {
		const res = await request.post(`/admin/parking-notifications`, body);
		return res;
	},
	async updateParkingNotificationById(id, body) {
		const res = await request.patch(`/admin/parking-notifications/id?id=${id}`, body);
		return res;
	},
	async scheduleParkingNotificationById(id) {
		const res = await request.post(`/admin/parking-notifications/id/schedule?id=${id}`);
		return res;
	},
	async sendParkingNotificationById(id) {
		const res = await request.post(`/admin/parking-notifications/id/send?id=${id}`);
		return res;
	}
};
