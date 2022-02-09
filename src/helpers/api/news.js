import request from './request';
export default {
	async getNews(query) {
		const res = await request.get('/admin/news', query);
		return res;
	},
	async createNews(body) {
		const res = await request.post(`/admin/news`, body);
		return res;
	},
	async updateNews({ id, body}) {
		const res = await request.patch(`/admin/news/id?id=${id}`, body);
		return res;
	},
	async getNewsById(id) {
		const res = await request.get(`/admin/news/id?id=${id}`);
		return res;
	}
};
