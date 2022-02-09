import request from './request';

export default {
	async getCouponNotifications(query) {
		const res = await request.get(`/admin/coupon-notifications`, query);
		return res;
	},
	async getCouponNotificationById(id) {
		const res = await request.get(`/admin/coupon-notifications/id?id=${id}`);
		return res;
	},
	async createCouponNotification(body) {
		const res = await request.post(`/admin/coupon-notifications`, body);
		return res;
	},
	async updateCouponNotificationById(id, body) {
		const res = await request.patch(`/admin/coupon-notifications/id?id=${id}`, body);
		return res;
	},
	async scheduleCouponNotificationById(id) {
		const res = await request.post(`/admin/coupon-notifications/id/schedule?id=${id}`);
		return res;
	},
	async sendCouponNotificationById(id) {
		const res = await request.post(`/admin/coupon-notifications/id/send?id=${id}`);
		return res;
	}
};
