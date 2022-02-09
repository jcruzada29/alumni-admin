import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function downloadReports({ event_id, type }) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.DOWNLOAD_EVENT_REPORTS_REQUEST,
			payload: {
				loading: true,
				hasDownloadSuccess: false
			}
		});

		const response = await API.events.downloadEventReports({
			event_id,
			type
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.DOWNLOAD_EVENT_REPORTS_ERROR,
				payload: {
					meta: response.meta,
					loading: false,
					hasDownloadSuccess: false
				}
			});
		}

		const { csv_string } = response.data;

		dispatch({
			type: ActionTypes.DOWNLOAD_EVENT_REPORTS_SUCCESS,
			payload: {
				csv_string,
				meta: response.meta,
				loadingDownloadSubmit: false,
				hasDownloadSuccess: true
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_DOWNLOAD_EVENT_REPORTS_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_DOWNLOAD_EVENT_REPORTS_PAGE
		});
	};
}