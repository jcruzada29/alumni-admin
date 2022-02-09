import request from './request';

export default {
	async getHighlights(query) {
		const res = await request.get(`/admin/highlights`, query);
		return res;
	},
	async getHighlightsById(id){
		const res = await request.get(`/admin/highlights/id?id=${id}`);
		return res;
	},
	async createHighlight(body){
		const res = await request.post(`/admin/highlights`, body);
		return res;
	},
	async updateHighlightById(id, body){
		const res = await request.patch(`/admin/highlights/id?id=${id}`, body);
		return res;
	}
};
