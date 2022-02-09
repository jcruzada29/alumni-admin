import request from './request';

export default {
	async getAccessGroups(query) {
		const res = await request.get('/admin/access-groups', query);
		return res;
	},
	async updateAccessGroups(body) {
		const res = await request.patch('/admin/access-groups', body);
		return res;
	}
};
