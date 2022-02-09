import _ from 'lodash';
// import moment from 'moment';
// import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getEventFormFields({ event_id }) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_EVENT_FORM_FIELDS_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.event_form_fields.getEventFormFields({ event_id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_EVENT_FORM_FIELDS_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { event_form_fields } = response.data;
		const newEventFormFields = event_form_fields.map(o => ({
			...o,
			settings: o.settings ? JSON.parse(o.settings) : {},
			dropdown_values: o.dropdown_values ? JSON.parse(o.dropdown_values) : []
		}));

		dispatch({
			type: ActionTypes.GET_EVENT_FORM_FIELDS_SUCCESS,
			payload: {
				event_form_fields: newEventFormFields,
				loading: false
			}
		});
	};
}

export function getEventFormFieldById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_EVENT_FORM_FIELD_BY_ID_REQUEST,
			payload: {
				selected_event_form_field: null,
				loadingEventFormField: true,
				hasLoadedEventFormField: false
			}
		});

		const response = await API.event_form_fields.getEventFormFieldById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_EVENT_FORM_FIELD_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loadingEventFormField: false
				}
			});
		}

		const { event_form_field } = response.data;
		const newEventFormField = { ...event_form_field };
		newEventFormField.enabled = !!newEventFormField.enabled ? 'yes' : 'no';
		const settings = !_.isNil(newEventFormField.settings) ? JSON.parse(newEventFormField.settings) : {};
		newEventFormField.is_required = _.has(settings, 'is_required') && !!settings.is_required ? 'yes' : 'no';
		const dropdownValues = !_.isNil(newEventFormField.dropdown_values) ? JSON.parse(newEventFormField.dropdown_values) : [];
		newEventFormField.dropdown_values = dropdownValues.join('\n');

		dispatch({
			type: ActionTypes.GET_EVENT_FORM_FIELD_BY_ID_SUCCESS,
			payload: {
				selected_event_form_field: newEventFormField,
				loadingEventFormField: false,
				hasLoadedEventFormField: true
			}
		});
	};
}

export function onSubmit({ event_id, fields }) {
	return async (dispatch, getState) => {
		const { selected_event_form_field } = getState().eventDetailPage.eventParticipantFormPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_EVENT_FORM_FIELD_REQUEST,
			payload: {
				loadingSubmit: true,
				hasSubmitted: false
			}
		});

		const body = {
			event_form_field: {
				...fields,
				event_id,
				enabled: fields.enabled === 'yes' ? 1 : 0,
				settings: {
					is_required: fields.is_required === 'yes' ? 1 : 0
				},
				...(fields.type === 'dropdown' && { dropdown_values: _.compact(fields.dropdown_values.split('\n')) })
			}
		};

		let response;
		if (selected_event_form_field) {
			body.event_form_field.updated_at = selected_event_form_field.updated_at;
			response = await API.event_form_fields.updateEventFormFieldById(selected_event_form_field.id, body);
		} else {
			response = await API.event_form_fields.createEventFormField(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_EVENT_FORM_FIELD_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { event_form_field } = response.data;
		const newEventFormField = { ...event_form_field };
		newEventFormField.enabled = !!newEventFormField.enabled ? 'yes' : 'no';
		const settings = !_.isNil(newEventFormField.settings) ? JSON.parse(newEventFormField.settings) : {};
		newEventFormField.is_required = _.has(settings, 'is_required') && !!settings.is_required ? 'yes' : 'no';
		const dropdownValues = !_.isNil(newEventFormField.dropdown_values) ? JSON.parse(newEventFormField.dropdown_values) : [];
		newEventFormField.dropdown_values = dropdownValues.join('\n');

		dispatch({
			type: ActionTypes.SUBMIT_EVENT_FORM_FIELD_SUCCESS,
			payload: {
				meta: response.meta,
				selected_event_form_field: newEventFormField,
				loadingSubmit: false,
				hasSubmitted: true
			}
		});
	};
}

export function onDeleteEventFormFieldById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.DELETE_EVENT_FORM_FIELD_REQUEST,
			payload: {
				loadingDelete: true,
				hasDeleted: false
			}
		});

		const response = await API.event_form_fields.deleteEventFormFieldById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.DELETE_EVENT_FORM_FIELD_ERROR,
				payload: {
					meta: response.meta,
					loadingDelete: false
				}
			});
		}
		dispatch({
			type: ActionTypes.DELETE_EVENT_FORM_FIELD_SUCCESS,
			payload: {
				meta: response.meta,
				loadingDelete: false,
				hasDeleted: true
			}
		});
	};
}

export function setnNullSelectedEventFormField() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SET_NULL_EVENT_FORM_FIELD,
			payload: {
				selected_event_form_field: null
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EVENT_PARTICIPANT_FORM_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EVENT_PARTICIPANT_FORM_PAGE
		});
	};
}