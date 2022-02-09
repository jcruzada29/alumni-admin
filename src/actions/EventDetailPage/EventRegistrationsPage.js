import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getEventRegistrations({ event_id, search, page, limit }) {
	return async dispatch => {

		const optionsQuery = [
			`id=${event_id}`,
			`page=${page}`,
			`limit=${limit}`
		];
		dispatch(push(`/events/id/registrations?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_EVENT_REGISTRATIONS_REQUEST,
			payload: {
				loading: true,
				hasLoaded: false
			}
		});


		const response = await API.event_registrations.getEventRegistrations({ event_id, search });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_EVENT_REGISTRATIONS_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { event_registrations } = response.data;

		dispatch({
			type: ActionTypes.GET_EVENT_REGISTRATIONS_SUCCESS,
			payload: {
				event_registrations,
				loading: false,
				hasLoaded: true
			}
		});
	};
}

export function updateTransactionById({ id, status }){
	return async dispatch => {
		// Update Path
		dispatch({
			type: ActionTypes.UPDATE_TRANSACTION_REQUEST,
			payload: {
				loadingSubmit: true,
				isSuccess: false
			}
		});

		const body = {
			transaction: {
				status
			}
		};

		const response = await API.transactions.updateTransactionById({ id, body });

		if (response.meta.code !== 200) {

			dispatch({
				type: ActionTypes.UPDATE_TRANSACTION_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
		}

		// const { transaction } = response.data;
		
		dispatch({
			type: ActionTypes.UPDATE_TRANSACTION_SUCCESS,
			payload: {
				// transactions,
				loadingSubmit: false,
				isSuccess: true,
				meta: response.meta
			}
		});
	};
}

export function getEventRegistrationById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_EVENT_REGISTRATION_DETAIL_REQUEST,
			payload: {
				loadingDetailPage: true
			}
		});

		const response = await API.event_registrations.getEventRegistrationById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_EVENT_REGISTRATION_DETAIL_ERROR,
				payload: {
					meta: response.meta,
					loadingDetailPage: false
				}
			});
		}

		const { event_registration } = response.data;

		dispatch({
			type: ActionTypes.GET_EVENT_REGISTRATION_DETAIL_SUCCESS,
			payload: {
				selected_event_registration: event_registration,
				loadingDetailPage: false
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EVENT_REGISTRATIONS_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EVENT_REGISTRATIONS_PAGE
		});
	};
}