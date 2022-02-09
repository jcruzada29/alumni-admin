import request from './request';
export default {
	async createOnboardingScreen(body) {
		const res = await request.post(`/admin/onboarding-screens`, body);
		return res;
	},
	async getOnboardingScreens(query) {
		const res = await request.get(`/admin/onboarding-screens`, query);
		return res;
	},
	async getOnboardingScreenById(query) {
		const res = await request.get(`/admin/onboarding-screens/id`, query);
		return res;
	},
	async updateOnboardingScreenById({ id, body }) {
		const res = await request.patch(`/admin/onboarding-screens/id?id=${id}`, body);
		return res;
	},
	async deleteOnboardingScreenById(id) {
		const res = await request.delete(`/admin/onboarding-screens/id?id=${id}`);
		return res;
	}
};
