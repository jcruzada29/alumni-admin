import request from './request';

export default {
	async getPushNotifications(query) {
		const res = await request.get(`/admin/push-notifications`, query);
		return res;
	},
	async getPushNotificationById(id){
		const res = await request.get(`/admin/push-notifications/id?id=${id}`);
		return res;
	},
	async createPushNotification(body) {
		const res = await request.post(`/admin/push-notifications`, body);
		return res;
	},
	async updatePushNotificationById(id, body){
		const res = await request.patch(`/admin/push-notifications/id?id=${id}`, body);
		return res;
	},
	async schedulePushNotificationById(id) {
		const res = await request.post(`/admin/push-notifications/id/schedule?id=${id}`);
		return res;
	},
	async sendPushNotificationById(id) {
		const res = await request.post(`/admin/push-notifications/id/send?id=${id}`);
		return res;
	}
};
