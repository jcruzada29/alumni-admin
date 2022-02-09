import request from './request';

export default {
	async getNewsNotifications(query) {
		const res = await request.get(`/admin/news-notifications`, query);
		return res;
	},
	async getNewsNotificationById(id) {
		const res = await request.get(`/admin/news-notifications/id?id=${id}`);
		return res;
	},
	async createNewsNotification(body) {
		const res = await request.post(`/admin/news-notifications`, body);
		return res;
	},
	async updateNewsNotificationById(id, body) {
		const res = await request.patch(`/admin/news-notifications/id?id=${id}`, body);
		return res;
	},
	async scheduleNewsNotificationById(id) {
		const res = await request.post(`/admin/news-notifications/id/schedule?id=${id}`);
		return res;
	},
	async sendNewsNotificationById(id) {
		const res = await request.post(`/admin/news-notifications/id/send?id=${id}`);
		return res;
	}
};
