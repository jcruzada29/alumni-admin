import _ from 'lodash';
import { push } from 'connected-react-router';
import moment from 'moment';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';
import FileHelper from '../../helpers/file';

export function getNewsById({ id }) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_NEWS_BY_ID_REQUEST,
			payload: {
				loading: true,
				loadedSuccess: false
			}
		});

		const response = await API.news.getNewsById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_NEWS_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		dispatch({
			type: ActionTypes.GET_NEWS_BY_ID_SUCCESS,
			payload: {
				news: response.data.news,
				loading: false,
				loadedSuccess: true
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

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { news } = getState().newsDetailPage.newsBasicPageReducer;
		dispatch({
			type: ActionTypes.CREATE_NEWS_REQUEST,
			payload: {
				loadingSubmit: true,
				submitSuccess: false
			}
		});

		// Add publish_start and publish_end
		const datesArr = _.compact(fields.date_range.split(' - '));
		fields.publish_start_date = datesArr[0];
		fields.publish_end_date = datesArr[1];


		const {
			display_date,
			// publish_start_date,
			// publish_end_date,
			file,
			file_name
		} = fields;

		let response;
		let fileExtension;
		let base64String;
		let asset;
		let body;
		if (file) {
			fileExtension = await FileHelper.getExtension(file_name);
			base64String = await FileHelper.fileToDataUrl(file);
			asset = {
				name: file_name,
				file_type: file.type.split('/')[0] || fileExtension,
				file_name: file_name,
				file_extension: fileExtension,
				file_content: base64String
			};
		}

		body = {
			news: {
				...fields,
				asset,
				schedule_delivery_date: moment(display_date).format('YYYY-MM-DD')
			}
		};

		if (news) {
			// updating
			body.news.updated_at = news.updated_at;
			response = await API.news.updateNews({ id: news.id, body });
		} else {
			// add new
			response = await API.news.createNews(body);
		}

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.CREATE_NEWS_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
		}

		dispatch({
			type: ActionTypes.CREATE_NEWS_SUCCESS,
			payload: {
				meta: response.meta,
				news: response.data.news,
				loadingSubmit: false,
				submitSuccess: true
			}
		});
		if (!news) {
			dispatch(push(`/news/id/basic?id=${response.data.news.id}`));
		}

	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_NEWS_DETAIL_PAGE_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_NEWS_DETAIL_PAGE
		});
	};
}