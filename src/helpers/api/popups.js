import request from './request';

export default {
	async getPopups(query) {
		const res = await request.get(`/admin/popups`, query);
		return res;
	},
	async getPopupById(id){
		const res = await request.get(`/admin/popups/id?id=${id}`);
		return res;
	},
	async createPopup(body){
		const res = await request.post(`/admin/popups`, body);
		return res;
	},
	async updatePopupById(id, body){
		const res = await request.patch(`/admin/popups/id?id=${id}`, body);
		return res;
	}
};
