import request from './request';

export default {
	async getCoupons(query) {
		const res = await request.get(`/admin/coupons`, query);
		return res;
	},
	async getCouponById(id) {
		const res = await request.get(`/admin/coupons/id?id=${id}`);
		return res;
	},
	async createCoupon(body) {
		const res = await request.post(`/admin/coupons`, body);
		return res;
	},
	async updateCouponById(id, body) {
		const res = await request.patch(`/admin/coupons/id?id=${id}`, body);
		return res;
	},
	async downloadEventReports({ coupon_id, type }){
		const res = await request.post(`/admin/coupons/reports/id?id=${coupon_id}&type=${type}`);
		return res;
	}
};
