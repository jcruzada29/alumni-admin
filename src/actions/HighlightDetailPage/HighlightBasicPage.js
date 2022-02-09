import _ from 'lodash';
import moment from 'moment';
import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';
import FileHelper from '../../helpers/file';

export function getHighlightById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_HIGHLIGHT_BY_ID_REQUEST,
			payload: {
				loading: true,
				hasLoaded: false
			}
		});

		const response = await API.highlights.getHighlightsById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_HIGHLIGHT_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { highlight } = response.data;
		const newHighlight = { ...highlight };
		newHighlight.is_published = !!highlight.is_published ? 'published' : 'unpublished';
		newHighlight.publish_date_range = `${moment(highlight.publish_start_date).format('YYYY-MM-DD')} - ${moment(highlight.publish_end_date).format('YYYY-MM-DD')}`;
		newHighlight.display_date = moment(highlight.display_date).format('YYYY-MM-DD');

		dispatch({
			type: ActionTypes.GET_HIGHLIGHT_BY_ID_SUCCESS,
			payload: {
				highlight: newHighlight,
				loading: false,
				hasLoaded: true
			}
		});
	};
}

export function getAssetFileById({ asset_id }) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_HIGHLIGHT_BASIC_ASSET_FILE_REQUEST,
			payload: {
				loadingAsset: true
			}
		});

		const response = await API.assets.getAssetFileById(asset_id);
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_HIGHLIGHT_BASIC_ASSET_FILE_ERROR,
				payload: {
					loadingAsset: false,
					meta: response.meta
				}
			});
		}
		const { asset } = response.data;

		dispatch({
			type: ActionTypes.GET_HIGHLIGHT_BASIC_ASSET_FILE_SUCCESS,
			payload: {
				asset,
				loadingAsset: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { highlight } = getState().highlightDetailPage.highlightBasicPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_HIGHLIGHT_BASIC_REQUEST,
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
			highlight: {
				...fields,
				is_published: fields.is_published === 'published' ? 1 : 0,
				...(newAsset && { asset: newAsset })
			}
		};

		let response;
		if (highlight) {
			body.highlight.updated_at = highlight.updated_at;
			response = await API.highlights.updateHighlightById(highlight.id, body);
		} else {
			response = await API.highlights.createHighlight(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_HIGHLIGHT_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { highlight: newHighlight } = response.data;
		dispatch({
			type: ActionTypes.SUBMIT_HIGHLIGHT_BASIC_SUCCESS,
			payload: {
				meta: response.meta,
				highlight: newHighlight,
				loadingSubmit: false
			}
		});

		// Redirect to details basic page
		dispatch(push(`/highlights/id/basic?id=${newHighlight.id}`));
	};
}

export function navigateToHighlightListPage() {
	return async dispatch => {
		dispatch(push(`/highlights`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_HIGHLIGHT_BASIC_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_HIGHLIGHT_BASIC_PAGE
		});
	};
}