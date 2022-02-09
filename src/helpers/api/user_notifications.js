import request from './request';

export default {
	async getNotificationsByUser(query) {
		const res = await request.get(`/admin/notifications`, query);
		return res;
	}
};
