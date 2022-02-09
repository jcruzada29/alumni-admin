import request from '../request';

export default {
	async getAcademicGroups(query) {
		const res = await request.get('/admin/sis/academic-groups', query);
		return res;
	},
	async getAcademicGroupById(id) {
		const res = await request.get('/admin/sis/academic-groups/id', { id });
		return res;
	}
};
