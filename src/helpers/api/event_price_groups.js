import request from './request';

export default {
	async getEventPriceGroups(query) {
		const res = await request.get(`/admin/event-price-groups`, query);
		return res;
	},
	async getEventPriceGroupById(id) {
		const res = await request.get(`/admin/event-price-groups/id?id=${id}`);
		return res;
	},
	async createEventPriceGroup(body) {
		const res = await request.post(`/admin/event-price-groups`, body);
		return res;
	},
	async updateEventPriceGroupById(id, body) {
		const res = await request.patch(`/admin/event-price-groups/id?id=${id}`, body);
		return res;
	},
	async deleteEventPriceGroupById(id, body) {
		const res = await request.delete(`/admin/event-price-groups/id?id=${id}`);
		return res;
	}
};
