import _ from 'lodash';
import moment from 'moment';
import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getParkingPrivilegeById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_PARKING_PRIVILEGE_BASIC_REQUEST,
			payload: {
				loading: true,
				hasLoaded: false
			}
		});

		const response = await API.parking_privileges.getParkingPrivilegeById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_PARKING_PRIVILEGE_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { parkingPrivilege } = response.data;
		const newParkingPrivilege = { ...parkingPrivilege };
		newParkingPrivilege.is_published = parkingPrivilege.is_published ? 'published' : 'unpublished';
		newParkingPrivilege.usage_date_range = `${moment(parkingPrivilege.use_start_date).format('YYYY-MM-DD')} - ${moment(parkingPrivilege.use_end_date).format('YYYY-MM-DD')}`;

		dispatch({
			type: ActionTypes.GET_PARKING_PRIVILEGE_BASIC_SUCCESS,
			payload: {
				parking_privilege: newParkingPrivilege,
				loading: false,
				hasLoaded: true
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { parking_privilege } = getState().parkingPrivilegeDetailPage.parkingPrivilegeBasicPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_PARKING_PRIVILEGE_BASIC_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const usageDateArr = _.compact(fields.usage_date_range.split(' - '));
		fields.use_start_date = moment(usageDateArr[0]).format('YYYY-MM-DD');
		fields.use_end_date = moment(usageDateArr[1]).format('YYYY-MM-DD');
		fields.num_usage = _.toInteger(fields.num_usage);

		const body = {
			parking_privilege: {
				...fields,
				is_published: fields.is_published === 'published' ? 1 : 0
			}
		};

		let response;
		if (parking_privilege) {
			body.parking_privilege.updated_at = parking_privilege.updated_at;
			response = await API.parking_privileges.updateParkingPrivilegeById(parking_privilege.id, body);
		} else {
			response = await API.parking_privileges.createParkingPrivilege(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_PARKING_PRIVILEGE_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { parking_privilege: newParkingPrivilege } = response.data;
		dispatch({
			type: ActionTypes.SUBMIT_PARKING_PRIVILEGE_BASIC_SUCCESS,
			payload: {
				meta: response.meta,
				parking_privilege: newParkingPrivilege,
				loadingSubmit: false
			}
		});

		// Redirect to details basic page
		dispatch(push(`/parking-privileges/id/basic?id=${newParkingPrivilege.id}`));
	};
}

export function navigateToParkingPrivilegeListPage() {
	return async dispatch => {
		dispatch(push(`/parking-privileges`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_PARKING_PRIVILEGE_BASIC_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_PARKING_PRIVILEGE_BASIC_PAGE
		});
	};
}