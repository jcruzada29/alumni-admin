import request from './request';

export default {
	async getEventRegistrations(query) {
		const res = await request.get(`/admin/event-registrations`, query);
		return res;
	},
	async getEventRegistrationById(id) {
		const res = await request.get(`/admin/event-registrations/id?id=${id}`);
		return res;
	}
};
