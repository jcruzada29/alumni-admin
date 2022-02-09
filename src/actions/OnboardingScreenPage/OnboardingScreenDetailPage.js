import _ from 'lodash';
import moment from 'moment';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';
import FileHelper from '../../helpers/file';

export function deleteOnboardingScreenById(id){
	return async dispatch => {

		dispatch({
			type: ActionTypes.DELETE_ONBOARD_SCREEN_REQUEST,
			payload: {
				loadingSubmit: true,
				submitSuccess: false
			}
		});

		const response = await API.onboarding_screens.deleteOnboardingScreenById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.DELETE_ONBOARD_SCREEN_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
		}

		dispatch({
			type: ActionTypes.DELETE_ONBOARD_SCREEN_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false,
				submitSuccess: true
			}
		});
	};
}


export function getOnboardingScreenById({ id }) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_ONBOARDINGSCREEN_BY_ID_PAGE_REQUEST,
			payload: {
				loading: true,
				loadedSuccess: false
			}
		});

		const response = await API.onboarding_screens.getOnboardingScreenById({
			id
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_ONBOARDINGSCREEN_BY_ID_PAGE_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_ONBOARDINGSCREEN_BY_ID_PAGE_SUCCESS,
			payload: {
				onboardingScreen: response.data.onboarding_screen,
				loading: false,
				loadedSuccess: true
			}
		});
	};
}


export function onSubmit(options) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SUBMIT_ADD_ONBOARD_SCREEN_REQUEST,
			payload: {
				loadingSubmit: true,
				submitSuccess: false
			}
		});
		const { openDetailPageData, sort, name, onboard_screen_file_content, onboard_screen_file_content_name } = options;

		let response;
		let fileExtension;
		let base64String;
		let asset;
		let body;
		if (onboard_screen_file_content) {
			fileExtension = await FileHelper.getExtension(onboard_screen_file_content_name);
			base64String = await FileHelper.fileToDataUrl(onboard_screen_file_content);
			asset = {
				name: onboard_screen_file_content_name,
				file_type: onboard_screen_file_content.type.split('/')[0] || fileExtension,
				file_name: onboard_screen_file_content_name,
				file_extension: fileExtension,
				file_content: base64String
			};
		}

		body = {
			onboarding_screen: {
				sort, name,
				asset
			}
		};

		if (!_.isNil(openDetailPageData)) {
			// updating
			body.onboarding_screen.updated_at = openDetailPageData.updated_at;
			response = await API.onboarding_screens.updateOnboardingScreenById({ id: openDetailPageData.id, body });
		} else {
			// add new
			response = await API.onboarding_screens.createOnboardingScreen(body);
		}



		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUBMIT_ADD_ONBOARD_SCREEN_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
		}

		dispatch({
			type: ActionTypes.SUBMIT_ADD_ONBOARD_SCREEN_SUCCESS,
			payload: {
				meta: response.meta,
				loadingSubmit: false,
				submitSuccess: true
			}
		});
	};
}

export function getAssetFileById({ asset_id }) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ASSET_FILE_REQUEST,
			payload: {
				loadingAsset: true
			}
		});
		const response = await API.assets.getAssetFileById(asset_id);
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_ASSET_FILE_ERROR,
				payload: {
					loadingAsset: false,
					meta: response.meta
				}
			});
		}
		const { asset } = response.data;

		dispatch({
			type: ActionTypes.GET_ASSET_FILE_SUCCESS,
			payload: {
				asset,
				loadingAsset: false
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ONBOARDINGSCREENS_DETAIL_PAGE_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ONBOARDINGSCREENS_DETAIL_PAGE
		});
	};
}