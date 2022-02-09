import request from '../request';

export default {
	async getAcademicPlans(query) {
		const res = await request.get('/admin/sis/academic-plans', query);
		return res;
	},
	async getAcademicPlanById(id) {
		const res = await request.get('/admin/sis/academic-plans/id', { id });
		return res;
	}
};
