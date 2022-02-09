import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getonboardingScreens({ page, limit, search }) {
	return async dispatch => {

		// Update Path
		const optionsQuery = [`page=${page}`, `limit=${limit}`];
		dispatch(push(`/onboarding-screens?${optionsQuery.join('&')}`));

		dispatch({
			type: ActionTypes.GET_ONBOARDINGSCREENS_PAGE_REQUEST,
			payload: {
				loading: true
			}
		});


		const response = await API.onboarding_screens.getOnboardingScreens({
			page,
			limit
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_ONBOARDINGSCREENS_PAGE_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_ONBOARDINGSCREENS_PAGE_SUCCESS,
			payload: {
				onboardingScreens: response.data.onboarding_screens,
				page: response.data.page,
				limit: response.data.limit,
				total: response.data.total,
				count: response.data.count,
				loading: false
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ONBOARDINGSCREENS_PAGE_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ONBOARDINGSCREENS_PAGE
		});
	};
}