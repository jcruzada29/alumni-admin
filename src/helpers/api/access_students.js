import request from './request';

export default {
	async getAccessStudents(query) {
		const res = await request.get('/admin/access-students', query);
		return res;
	},
	async updateAccessStudents(body) {
		const res = await request.patch('/admin/access-students', body);
		return res;
	}
};
