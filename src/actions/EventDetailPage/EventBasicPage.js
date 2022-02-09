import _ from 'lodash';
import moment from 'moment';
import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';
import FileHelper from '../../helpers/file';

export function getEventById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_EVENT_BASIC_REQUEST,
			payload: {
				loading: true,
				hasLoaded: false
			}
		});

		const response = await API.events.getEventById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_EVENT_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { event } = response.data;
		const newEvent = { ...event };
		newEvent.is_published = !!event.is_published ? 'published' : 'unpublished';
		newEvent.is_required = !!event.is_required ? 'required' : 'not_required';
		newEvent.is_visible_web = !!event.is_visible_web ? 'visible' : 'invisible';
		newEvent.is_visible_app = !!event.is_visible_app ? 'visible' : 'invisible';
		newEvent.publish_date_range = `${moment(event.publish_start_date).format('YYYY-MM-DD')} - ${moment(event.publish_end_date).format('YYYY-MM-DD')}`;
		// newEvent.publish_start_date = moment(event.publish_start_date).format('YYYY-MM-DD HH:mm');
		// newEvent.publish_end_date = moment(event.publish_end_date).format('YYYY-MM-DD HH:mm');
		newEvent.event_date_range = `${moment(event.event_start_date).format('YYYY-MM-DD')} - ${moment(event.event_end_date).format('YYYY-MM-DD')}`;
		// newEvent.event_start_date = moment(event.event_start_date).format('YYYY-MM-DD HH:mm');
		// newEvent.event_end_date = moment(event.event_end_date).format('YYYY-MM-DD HH:mm');
		newEvent.allow_waiting_list = !!event.allow_waiting_list ? 'allow' : 'disallow';
		newEvent.show_quota_left = !!event.show_quota_left ? 'show' : 'hide';
		newEvent.early_date_range = `${moment(event.early_start_date).format('YYYY-MM-DD')} - ${moment(event.early_end_date).format('YYYY-MM-DD')}`;
		// newEvent.early_start_date = moment(event.early_start_date).format('YYYY-MM-DD HH:mm');
		// newEvent.early_end_date = moment(event.early_end_date).format('YYYY-MM-DD HH:mm');
		newEvent.standard_date_range = `${moment(event.standard_start_date).format('YYYY-MM-DD')} - ${moment(event.standard_end_date).format('YYYY-MM-DD')}`;
		// newEvent.standard_start_date = moment(event.standard_start_date).format('YYYY-MM-DD HH:mm');
		// newEvent.standard_end_date = moment(event.standard_end_date).format('YYYY-MM-DD HH:mm');

		// delete asset_id if null
		if (_.isNil(newEvent.asset_id)) {
			delete newEvent.asset_id;
		}

		dispatch({
			type: ActionTypes.GET_EVENT_BASIC_SUCCESS,
			payload: {
				event: newEvent,
				loading: false,
				hasLoaded: true
			}
		});
	};
}

export function getAssetFileById({ asset_id }) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_EVENT_BASIC_ASSET_FILE_REQUEST,
			payload: {
				loadingAsset: true
			}
		});

		const response = await API.assets.getAssetFileById(asset_id);
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_EVENT_BASIC_ASSET_FILE_ERROR,
				payload: {
					loadingAsset: false,
					meta: response.meta
				}
			});
		}
		const { asset } = response.data;

		dispatch({
			type: ActionTypes.GET_EVENT_BASIC_ASSET_FILE_SUCCESS,
			payload: {
				asset,
				loadingAsset: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { event } = getState().eventDetailPage.eventBasicPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_EVENT_BASIC_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		// Add start and end of date ranges
		const publishDateArr = _.compact(fields.publish_date_range.split(' - '));
		fields.publish_start_date = moment(publishDateArr[0]).format('YYYY-MM-DD');
		fields.publish_end_date = moment(publishDateArr[1]).format('YYYY-MM-DD');

		const eventDateArr = _.compact(fields.event_date_range.split(' - '));
		fields.event_start_date = moment(eventDateArr[0]).format('YYYY-MM-DD');
		fields.event_end_date = moment(eventDateArr[1]).format('YYYY-MM-DD');

		const earlyDateArr = _.compact(fields.early_date_range.split(' - '));
		fields.early_start_date = moment(earlyDateArr[0]).format('YYYY-MM-DD');
		fields.early_end_date = moment(earlyDateArr[1]).format('YYYY-MM-DD');

		const standardDateArr = _.compact(fields.standard_date_range.split(' - '));
		fields.standard_start_date = moment(standardDateArr[0]).format('YYYY-MM-DD');
		fields.standard_end_date = moment(standardDateArr[1]).format('YYYY-MM-DD');

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
			event: {
				...fields,
				is_published: fields.is_published === 'published' ? 1 : 0,
				is_required: fields.is_required === 'required' ? 1 : 0,
				is_visible_web: fields.is_visible_web === 'visible' ? 1 : 0,
				is_visible_app: fields.is_visible_app === 'visible' ? 1 : 0,
				allow_waiting_list: fields.allow_waiting_list === 'allow' ? 1 : 0,
				show_quota_left: fields.show_quota_left === 'show' ? 1 : 0,
				...(newAsset && { asset: newAsset })
			}
		};

		let response;
		if (event) {
			body.event.updated_at = event.updated_at;
			response = await API.events.updateEventById(event.id, body);
		} else {
			response = await API.events.createEvent(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_EVENT_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { event: newEvent } = response.data;
		dispatch({
			type: ActionTypes.SUBMIT_EVENT_BASIC_SUCCESS,
			payload: {
				meta: response.meta,
				event: newEvent,
				loadingSubmit: false
			}
		});

		// Redirect to details basic page
		dispatch(push(`/events/id/basic?id=${newEvent.id}`));
	};
}

export function navigateToEventListPage() {
	return async dispatch => {
		dispatch(push(`/events`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EVENT_BASIC_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EVENT_BASIC_PAGE
		});
	};
}