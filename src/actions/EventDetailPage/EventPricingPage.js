import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getEventPriceGroups({ event_id }) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_EVENT_PRICE_GROUPS_REQUEST,
			payload: {
				loading: true,
				hasLoaded: false
			}
		});

		const response = await API.event_price_groups.getEventPriceGroups({ event_id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_EVENT_PRICE_GROUPS_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { event_price_groups } = response.data;

		dispatch({
			type: ActionTypes.GET_EVENT_PRICE_GROUPS_SUCCESS,
			payload: {
				event_price_groups,
				loading: false,
				hasLoaded: true
			}
		});
	};
}

export function getEventPriceGroupById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_EVENT_PRICE_GROUP_BY_ID_REQUEST,
			payload: {
				selected_event_price_group: null,
				loadingEventPriceGroup: true,
				hasLoadedEventPriceGroup: false
			}
		});

		const response = await API.event_price_groups.getEventPriceGroupById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_EVENT_PRICE_GROUP_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loadingEventPriceGroup: false
				}
			});
		}

		const { event_price_group } = response.data;

		dispatch({
			type: ActionTypes.GET_EVENT_PRICE_GROUP_BY_ID_SUCCESS,
			payload: {
				selected_event_price_group: event_price_group,
				loadingEventPriceGroup: false,
				hasLoadedEventPriceGroup: true
			}
		});
	};
}

export function getEventUserTypes({ event_id }) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_EVENT_PRICING_USER_TYPES_REQUEST,
			payload: {
				loadingEventUserTypes: true
			}
		});

		const response = await API.event_user_types.getEventUserTypes({ event_id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_EVENT_PRICING_USER_TYPES_ERROR,
				payload: {
					meta: response.meta,
					loadingEventUserTypes: false
				}
			});
		}

		const { event_user_types } = response.data;

		dispatch({
			type: ActionTypes.GET_EVENT_PRICING_USER_TYPES_SUCCESS,
			payload: {
				event_user_types,
				loadingEventUserTypes: false
			}
		});
	};
}

export function onSubmit({ event_id, fields }) {
	return async (dispatch, getState) => {
		const { selected_event_price_group } = getState().eventDetailPage.eventPricingPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_EVENT_PRICE_GROUP_REQUEST,
			payload: {
				loadingSubmit: true,
				hasSubmitted: false
			}
		});

		const body = {
			event_price_group: {
				...fields,
				event_id,
				prices: fields.prices.map(o => ({
					...o,
					price: +o.price
				}))
			}
		};

		let response;
		if (selected_event_price_group) {
			body.event_price_group.updated_at = selected_event_price_group.updated_at;
			response = await API.event_price_groups.updateEventPriceGroupById(selected_event_price_group.id, body);
		} else {
			response = await API.event_price_groups.createEventPriceGroup(body);
		}

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_EVENT_PRICE_GROUP_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		const { event_price_group } = response.data;

		dispatch({
			type: ActionTypes.SUBMIT_EVENT_PRICE_GROUP_SUCCESS,
			payload: {
				meta: response.meta,
				selected_event_price_group: event_price_group,
				loadingSubmit: false,
				hasSubmitted: true
			}
		});
	};
}

export function onDeleteEventPriceGroupById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.DELETE_EVENT_PRICE_GROUP_REQUEST,
			payload: {
				loadingDelete: true,
				hasDeleted: false
			}
		});

		const response = await API.event_price_groups.deleteEventPriceGroupById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.DELETE_EVENT_PRICE_GROUP_ERROR,
				payload: {
					meta: response.meta,
					loadingDelete: false
				}
			});
		}
		dispatch({
			type: ActionTypes.DELETE_EVENT_PRICE_GROUP_SUCCESS,
			payload: {
				meta: response.meta,
				loadingDelete: false,
				hasDeleted: true
			}
		});
	};
}

export function setnNullSelectedEventPriceGroup() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SET_NULL_EVENT_PRICE_GROUP,
			payload: {
				selected_event_price_group: null
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EVENT_PRICING_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EVENT_PRICING_PAGE
		});
	};
}