import _ from 'lodash';
import moment from 'moment';
import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';
import FileHelper from '../../helpers/file';

export function getPopupById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_POPUP_BY_ID_REQUEST,
			payload: {
				loading: true,
				hasLoaded: false
			}
		});

		const response = await API.popups.getPopupById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_POPUP_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { popup } = response.data;
		const newPopup = { ...popup };
		newPopup.is_published = !!popup.is_published ? 'published' : 'unpublished';
		newPopup.publish_date_range = `${moment(popup.publish_start_date).format('YYYY-MM-DD')} - ${moment(popup.publish_end_date).format('YYYY-MM-DD')}`;

		dispatch({
			type: ActionTypes.GET_POPUP_BY_ID_SUCCESS,
			payload: {
				popup: newPopup,
				loading: false,
				hasLoaded: true
			}
		});
	};
}

export function getAssetFileById({ asset_id }) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_POPUP_BASIC_ASSET_FILE_REQUEST,
			payload: {
				loadingAsset: true
			}
		});

		const response = await API.assets.getAssetFileById(asset_id);
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_POPUP_BASIC_ASSET_FILE_ERROR,
				payload: {
					loadingAsset: false,
					meta: response.meta
				}
			});
		}
		const { asset } = response.data;

		dispatch({
			type: ActionTypes.GET_POPUP_BASIC_ASSET_FILE_SUCCESS,
			payload: {
				asset,
				loadingAsset: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { popup } = getState().popupDetailPage.popupBasicPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_POPUP_BASIC_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const publishDateArr = _.compact(fields.publish_date_range.split(' - '));
		fields.publish_start_date = moment(publishDateArr[0]).format('YYYY-MM-DD');
		fields.publish_end_date = moment(publishDateArr[1]).format('YYYY-MM-DD');

		// Add asset
		let fileExtension;
		let base64String;
		let newAsset;
		if (fields.file_content) {
			fileExtension = await FileHelper.getExtension(fields.file_content_name);
			base64String = await FileHelper.fileToDataUrl(fields.file_content);
			newAsset = {
				name: fields.file_content_name,
				file_type: fields.file_content.type.split('/')[0] || fileExtension,
				file_name: fields.file_content_name,
				file_extension: fileExtension,
				file_content: base64String
			};
		}

		const body = {
			popup: {
				...fields,
				is_published: fields.is_published === 'published' ? 1 : 0,
				...(newAsset && { asset: newAsset })
			}
		};

		let response;
		if (popup) {
			body.popup.updated_at = popup.updated_at;
			response = await API.popups.updatePopupById(popup.id, body);
		} else {
			response = await API.popups.createPopup(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_POPUP_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { popup: newPopup } = response.data;
		dispatch({
			type: ActionTypes.SUBMIT_POPUP_BASIC_SUCCESS,
			payload: {
				meta: response.meta,
				popup: newPopup,
				loadingSubmit: false
			}
		});

		// Redirect to details basic page
		dispatch(push(`/popups/id/basic?id=${newPopup.id}`));
	};
}

export function navigateToPopupListPage() {
	return async dispatch => {
		dispatch(push(`/popups`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_POPUP_BASIC_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_POPUP_BASIC_PAGE
		});
	};
}