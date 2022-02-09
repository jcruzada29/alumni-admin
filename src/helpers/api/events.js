import request from './request';

export default {
	async getEvents(query) {
		const res = await request.get(`/admin/events`, query);
		return res;
	},
	async getEventById(id) {
		const res = await request.get(`/admin/events/id?id=${id}`);
		return res;
	},
	async createEvent(body) {
		const res = await request.post(`/admin/events`, body);
		return res;
	},
	async updateEventById(id, body) {
		const res = await request.patch(`/admin/events/id?id=${id}`, body);
		return res;
	},
	async downloadEventReports({ event_id, type }){
		const res = await request.post(`/admin/events/reports/id?id=${event_id}&type=${type}`);
		return res;
	}
};
