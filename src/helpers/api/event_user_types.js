import request from './request';

export default {
	async getEventUserTypes(query) {
		const res = await request.get(`/admin/event-user-types`, query);
		return res;
	}
};
