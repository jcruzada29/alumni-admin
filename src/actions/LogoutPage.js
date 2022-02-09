import API from '../helpers/api';

export function logout() {
	return async dispatch => {
		const res = await API.auth.logout();
		console.log('res', res);
		if (res.meta.code !== 200) {
			console.log('error', res);
			return;
		}
		localStorage.removeItem('wan_admin');
		window.location.href = res.data.logout_url;
	};
}
