import request from './request';

export default {
	async getParkingUsage(query) {
		const res = await request.get(`/admin/parking-usage`, query);
		return res;
	}
};
