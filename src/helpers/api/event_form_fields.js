import request from './request';

export default {
	async getEventFormFields(query) {
		const res = await request.get(`/admin/event-form-fields`, query);
		return res;
	},
	async getEventFormFieldById(id) {
		const res = await request.get(`/admin/event-form-fields/id?id=${id}`);
		return res;
	},
	async createEventFormField(body) {
		const res = await request.post(`/admin/event-form-fields`, body);
		return res;
	},
	async updateEventFormFieldById(id, body) {
		const res = await request.patch(`/admin/event-form-fields/id?id=${id}`, body);
		return res;
	},
	async deleteEventFormFieldById(id, body) {
		const res = await request.delete(`/admin/event-form-fields/id?id=${id}`);
		return res;
	}
};
