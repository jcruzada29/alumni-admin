import request from './request';

export default {
	async getCouponCoupons(query) {
		const res = await request.get(`/admin/coupon-subscriptions`, query);
		return res;
	},
	async deleteCouponSubscriptionById(id, body) {
		const res = await request.delete(`/admin/coupon-subscriptions/id?id=${id}`);
		return res;
	}
};
