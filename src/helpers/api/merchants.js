import request from './request';

export default {
	async getMerchants(query) {
		const res = await request.get(`/admin/merchants`, query);
		return res;
	},
	async getMerchantById(query) {
		const res = await request.get(`/admin/merchants/id`, query);
		return res;
	},
	async createMerchant(body) {
		const res = await request.post(`/admin/merchants`, body);
		return res;
	},
	async updateMerchantById(id, body) {
		const res = await request.patch(`/admin/merchants/id?id=${id}`, body);
		return res;
	}
};
