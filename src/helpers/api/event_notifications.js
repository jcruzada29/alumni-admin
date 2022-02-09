import request from './request';

export default {
	async getEventNotifications(query) {
		const res = await request.get(`/admin/event-notifications`, query);
		return res;
	},
	async getEventNotificationById(id) {
		const res = await request.get(`/admin/event-notifications/id?id=${id}`);
		return res;
	},
	async createEventNotification(body) {
		const res = await request.post(`/admin/event-notifications`, body);
		return res;
	},
	async updateEventNotificationById(id, body) {
		const res = await request.patch(`/admin/event-notifications/id?id=${id}`, body);
		return res;
	},
	async scheduleEventNotificationById(id) {
		const res = await request.post(`/admin/event-notifications/id/schedule?id=${id}`);
		return res;
	},
	async sendEventNotificationById(id) {
		const res = await request.post(`/admin/event-notifications/id/send?id=${id}`);
		return res;
	}
};
