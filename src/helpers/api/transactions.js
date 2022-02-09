import request from './request';

export default {
	async updateTransactionById({ id, body }) {
		const res = await request.patch(`/admin/transactions/id?id=${id}`, body);
		return res;
	}
};
