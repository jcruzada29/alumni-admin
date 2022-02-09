import request from './request';

export default {
	async getSettings(query) {
		const res = await request.get('/admin/settings', query);
		return res;
	},
	async updateSettings(body) {
		const res = await request.patch(`/admin/settings`, body);
		return res;
	}
};
