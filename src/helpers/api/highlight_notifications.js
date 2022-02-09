import request from './request';

export default {
	async getHighlightNotifications(query) {
		const res = await request.get(`/admin/highlight-notifications`, query);
		return res;
	},
	async getHighlightNotificationById(id) {
		const res = await request.get(`/admin/highlight-notifications/id?id=${id}`);
		return res;
	},
	async createHighlightNotification(body) {
		const res = await request.post(`/admin/highlight-notifications`, body);
		return res;
	},
	async updateHighlightNotificationById(id, body) {
		const res = await request.patch(`/admin/highlight-notifications/id?id=${id}`, body);
		return res;
	},
	async scheduleHighlightNotificationById(id) {
		const res = await request.post(`/admin/highlight-notifications/id/schedule?id=${id}`);
		return res;
	},
	async sendHighlightNotificationById(id) {
		const res = await request.post(`/admin/highlight-notifications/id/send?id=${id}`);
		return res;
	}
};
