import _ from 'lodash';
import moment from 'moment';
import { push } from 'connected-react-router';
import API from '../helpers/api';

export function authorizeWithTicket({ query }) {
	return async dispatch => {
		if (!query || !query.ticket) {
			dispatch(push(`/login?path=${_.get(query, 'path') || ''}`));
			return;
		}
		const res = await API.auth.casAuth({ ticket: query.ticket, path: query.path });

		if (res.meta.code !== 200) {
			dispatch(push('/unauthorized'));
			return;
		}

		// store response
		localStorage.setItem('wan_admin', JSON.stringify({
			token: res.data.auth.token,
			admin: res.data.admin,
			last_login: moment()
		}));

		// Navigate to specified page
		if (query.path && query.path !== '/' && query.path !== '') {
			dispatch(push(query.path));
			return;
		}

		// Navigate to next page
		dispatch(push('/meetings'));
	};
}
