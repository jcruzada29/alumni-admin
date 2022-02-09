import request from './request';

export default {
	async getParkingPrivileges(query) {
		const res = await request.get(`/admin/parking-privileges`, query);
		return res;
	},
	async getParkingPrivilegeById(id) {
		const res = await request.get(`/admin/parking-privileges/id?id=${id}`);
		return res;
	},
	async createParkingPrivilege(body) {
		const res = await request.post(`/admin/parking-privileges`, body);
		return res;
	},
	async updateParkingPrivilegeById(id, body) {
		const res = await request.patch(`/admin/parking-privileges/id?id=${id}`, body);
		return res;
	},
	async downloadEventReports({ parking_id, type }){
		const res = await request.post(`/admin/parking-privileges/reports/id?id=${parking_id}&type=${type}`);
		return res;
	}
};
