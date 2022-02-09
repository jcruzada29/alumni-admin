import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getRecordById({ type, id }) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_SEGMENTATION_RECORD_REQUEST,
			payload: {
				loadingRecord: true,
				hasLoadedRecord: false
			}
		});

		let response;
		switch (type) {
			case 'event':
				response = await API.events.getEventById(id);
				break;
			case 'coupon':
				response = await API.coupons.getCouponById(id);
				break;
			case 'parking':
				response = await API.parking_privileges.getParkingPrivilegeById(id);
				break;
			case 'highlight':
				response = await API.highlights.getHighlightsById(id);
				break;
			case 'popup':
				response = await API.popups.getPopupById(id);
				break;
			case 'push':
				response = await API.push_notifications.getPushNotificationById(id);
				break;
			default:
				break;
		}

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_SEGMENTATION_RECORD_ERROR,
				payload: {
					meta: response.meta,
					loadingRecord: false
				}
			});
		}

		let record;
		switch (type) {
			case 'event':
				const { event } = response.data;
				record = event;
				break;
			case 'coupon':
				const { coupon } = response.data;
				record = coupon;
				break;
			case 'parking':
				const { parkingPrivilege } = response.data;
				record = parkingPrivilege;
				break;
			case 'highlight':
				const { highlight } = response.data;
				record = highlight;
				break;
			case 'popup':
				const { popup } = response.data;
				record = popup;
				break;
			case 'push':
				const { push_notification } = response.data;
				record = push_notification;
				break;
			default:
				break;
		}

		dispatch({
			type: ActionTypes.GET_SEGMENTATION_RECORD_SUCCESS,
			payload: {
				record,
				loadingRecord: false,
				hasLoadedRecord: true
			}
		});
	};
}

export function getAcademicGroups() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_SEGMENTATION_ACAD_GROUPS_REQUEST,
			payload: {
				loadingAcademicGroups: true
			}
		});

		const response = await API.sis.academic_groups.getAcademicGroups();

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_SEGMENTATION_ACAD_GROUPS_ERROR,
				payload: {
					meta: response.meta,
					loadingAcademicGroups: false
				}
			});
		}

		const { academic_groups } = response.data;

		dispatch({
			type: ActionTypes.GET_SEGMENTATION_ACAD_GROUPS_SUCCESS,
			payload: {
				academic_groups,
				loadingAcademicGroups: false
			}
		});
	};
}

export function getAcademicPlans() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_SEGMENTATION_ACAD_PLANS_REQUEST,
			payload: {
				loadingAcademicPlans: true
			}
		});

		const response = await API.sis.academic_plans.getAcademicPlans();

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_SEGMENTATION_ACAD_PLANS_ERROR,
				payload: {
					meta: response.meta,
					loadingAcademicPlans: false
				}
			});
		}

		const { academic_plans } = response.data;

		dispatch({
			type: ActionTypes.GET_SEGMENTATION_ACAD_PLANS_SUCCESS,
			payload: {
				academic_plans,
				loadingAcademicPlans: false
			}
		});
	};
}

export function getAccessGroups({
	type,
	event_id,
	coupon_id,
	parking_id,
	highlight_id,
	popup_id,
	push_id
}) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_SEGMENTATION_ACCESS_GROUPS_REQUEST,
			payload: {
				loadingAccessGroups: true,
				hasLoadedAccessGroups: false
			}
		});

		const response = await API.access_groups.getAccessGroups({
			...(event_id && { event_id }),
			...(coupon_id && { coupon_id }),
			...(parking_id && { parking_id }),
			...(highlight_id && { highlight_id }),
			...(popup_id && { popup_id }),
			...(push_id && { push_id }),
			type,
			access_type: 'include'
		});

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_SEGMENTATION_ACCESS_GROUPS_ERROR,
				payload: {
					meta: response.meta,
					loadingAccessGroups: false
				}
			});
		}

		const { access_groups } = response.data;

		dispatch({
			type: ActionTypes.GET_SEGMENTATION_ACCESS_GROUPS_SUCCESS,
			payload: {
				access_groups,
				loadingAccessGroups: false,
				hasLoadedAccessGroups: true
			}
		});
	};
}

export function getAccessStudents({
	access_type,
	type,
	event_id,
	coupon_id,
	parking_id,
	highlight_id,
	popup_id,
	push_id
}) {
	return async dispatch => {
		if (access_type === 'include') {
			dispatch({
				type: ActionTypes.GET_SEGMENTATION_ACCESS_STUDENTS_INCLUDE_REQUEST,
				payload: {
					loadingAccessStudentsInclude: true,
					hasLoadedAccessStudentsInclude: false
				}
			});

			const response = await API.access_students.getAccessStudents({
				...(event_id && { event_id }),
				...(coupon_id && { coupon_id }),
				...(parking_id && { parking_id }),
				...(highlight_id && { highlight_id }),
				...(popup_id && { popup_id }),
				...(push_id && { push_id }),
				type,
				access_type: 'include'
			});

			if (response.meta.code !== 200) {
				return dispatch({
					type: ActionTypes.GET_SEGMENTATION_ACCESS_STUDENTS_INCLUDE_ERROR,
					payload: {
						meta: response.meta,
						loadingAccessStudentsInclude: false
					}
				});
			}

			const { access_students } = response.data;

			dispatch({
				type: ActionTypes.GET_SEGMENTATION_ACCESS_STUDENTS_INCLUDE_SUCCESS,
				payload: {
					access_students_include: access_students.map(o => ({
						...o,
						...o.user
					})),
					loadingAccessStudentsInclude: false,
					hasLoadedAccessStudentsInclude: true
				}
			});
		} else if (access_type === 'exclude') {
			dispatch({
				type: ActionTypes.GET_SEGMENTATION_ACCESS_STUDENTS_EXCLUDE_REQUEST,
				payload: {
					loadingAccessStudentsExclude: true,
					hasLoadedAccessStudentsExclude: false
				}
			});

			const response = await API.access_students.getAccessStudents({
				...(event_id && { event_id }),
				...(coupon_id && { coupon_id }),
				...(parking_id && { parking_id }),
				...(highlight_id && { highlight_id }),
				...(popup_id && { popup_id }),
				...(push_id && { push_id }),
				type,
				access_type: 'exclude'
			});

			if (response.meta.code !== 200) {
				return dispatch({
					type: ActionTypes.GET_SEGMENTATION_ACCESS_STUDENTS_EXCLUDE_ERROR,
					payload: {
						meta: response.meta,
						loadingAccessStudentsExclude: false
					}
				});
			}

			const { access_students } = response.data;

			dispatch({
				type: ActionTypes.GET_SEGMENTATION_ACCESS_STUDENTS_EXCLUDE_SUCCESS,
				payload: {
					access_students_exclude: access_students.map(o => ({
						...o,
						...o.user
					})),
					loadingAccessStudentsExclude: false,
					hasLoadedAccessStudentsExclude: true
				}
			});
		}
	};
}

export function getStudents({ access_type, search }) {
	return async dispatch => {
		if (access_type === 'include') {
			dispatch({
				type: ActionTypes.GET_SEGMENTATION_SEARCH_STUDENTS_INCLUDE_REQUEST,
				payload: {
					search_students_include: [],
					loadingSearchStudentsInclude: true
				}
			});

			const response = await API.sis.users.getUsers({ search, page: 1, limit: 50 });

			if (response.meta.code !== 200) {
				return dispatch({
					type: ActionTypes.GET_SEGMENTATION_SEARCH_STUDENTS_INCLUDE_ERROR,
					payload: {
						meta: response.meta,
						loadingSearchStudentsInclude: false
					}
				});
			}

			const { users } = response.data;
			const newStudents = users.map((o, index) => ({
				...o,
				id: `${index}-${o.emplid}`,
				title: `${o.emplid} - ${o.last_name}, ${o.first_name}`
			}));

			dispatch({
				type: ActionTypes.GET_SEGMENTATION_SEARCH_STUDENTS_INCLUDE_SUCCESS,
				payload: {
					search_students_include: newStudents,
					loadingSearchStudentsInclude: false
				}
			});
		} else if (access_type === 'exclude') {
			dispatch({
				type: ActionTypes.GET_SEGMENTATION_SEARCH_STUDENTS_EXCLUDE_REQUEST,
				payload: {
					search_students_exclude: [],
					loadingSearchStudentsExclude: true
				}
			});

			const response = await API.sis.users.getUsers({ search, page: 1, limit: 50 });

			if (response.meta.code !== 200) {
				return dispatch({
					type: ActionTypes.GET_SEGMENTATION_SEARCH_STUDENTS_EXCLUDE_ERROR,
					payload: {
						meta: response.meta,
						loadingSearchStudentsExclude: false
					}
				});
			}

			const { users } = response.data;
			const newStudents = users.map((o, index) => ({
				...o,
				id: `${index}-${o.emplid}`,
				title: `${o.emplid} - ${o.last_name}, ${o.first_name}`
			}));

			dispatch({
				type: ActionTypes.GET_SEGMENTATION_SEARCH_STUDENTS_EXCLUDE_SUCCESS,
				payload: {
					search_students_exclude: newStudents,
					loadingSearchStudentsExclude: false
				}
			});
		}
	};
}

export function onUpload({
	type,
	event_id,
	coupon_id,
	parking_id,
	highlight_id,
	popup_id,
	push_id,
	access_students_include,
	access_students_exclude
}) {
	return async (dispatch, getState) => {
		const { uploadedStudent = [] } = getState().components.segmentationPageReducer;

		dispatch({
			type: ActionTypes.UPLOAD_SEGMENTATION_REQUEST,
			payload: {
				loadingUpload: true
			}
		});

		const include_students = [];
		const exclude_students = [];
		
		// Check Students IDs
		if (access_students_include && access_students_include.length > 0) {
			const responseCheckIncludeStudentId = await API.sis.users.getUserById(access_students_include.slice(-1)[0].emplid);
			if (responseCheckIncludeStudentId.meta.code !== 200) {

				uploadedStudent.push({
					emplid: access_students_include.slice(-1)[0].emplid,
					isFound: false
				});

				dispatch({
					type: ActionTypes.UPLOAD_SEGMENTATION_ERROR,
					payload: {
						// meta: responseCheckIncludeStudentId.meta,
						uploadedStudent,
						loadingUpload: false
					}
				});
				return;
			}	else {
				uploadedStudent.push({
					emplid: access_students_include.slice(-1)[0].emplid,
					isFound: true
				});
				dispatch({
					type: ActionTypes.UPLOAD_SEGMENTATION_SUCCESS,
					payload: {
						uploadedStudent
					}
				});
			}

			await Promise.all(access_students_include.map(async include => {
				const response = await API.sis.users.getUserById(include.emplid);
				if (response.meta.code === 200) {
					include_students.push(include);
				}
			}));
		}

		if (access_students_exclude && access_students_exclude.length > 0) {
			const responseCheckExcludeStudentId = await API.sis.users.getUserById(access_students_exclude.slice(-1)[0].emplid);
			if (responseCheckExcludeStudentId.meta.code !== 200) {
				uploadedStudent.push({
					emplid: access_students_exclude.slice(-1)[0].emplid,
					isFound: false
				});

				dispatch({
					type: ActionTypes.UPLOAD_SEGMENTATION_ERROR,
					payload: {
						// meta: responseCheckExcludeStudentId.meta,
						uploadedStudent,
						loadingUpload: false
					}
				});
				return;
			} else {
				uploadedStudent.push({
					emplid: access_students_exclude.slice(-1)[0].emplid,
					isFound: true
				});
				dispatch({
					type: ActionTypes.UPLOAD_SEGMENTATION_SUCCESS,
					payload: {
						uploadedStudent
					}
				});
			}

			await Promise.all(access_students_exclude && access_students_exclude.map(async exclude => {
				const response = await API.sis.users.getUserById(exclude.emplid);
				if (response.meta.code === 200) {
					exclude_students.push(exclude);
				}
			}));
		}

		// Save access_students include
		const accessStudentsIncludeBody = {
			access_students: {
				...(event_id && { event_id }),
				...(coupon_id && { coupon_id }),
				...(parking_id && { parking_id }),
				...(highlight_id && { highlight_id }),
				...(popup_id && { popup_id }),
				...(push_id && { push_id }),
				access_type: 'include',
				type,
				students: include_students ? include_students.map(o => ({
					student_id: o.emplid
				})) : []
			}
		};

		const responseAccessStudentsInclude = await API.access_students.updateAccessStudents(accessStudentsIncludeBody);
		if (responseAccessStudentsInclude.meta.code !== 200) {
			dispatch({
				type: ActionTypes.UPLOAD_SEGMENTATION_ERROR,
				payload: {
					// meta: responseAccessStudentsInclude.meta,
					loadingUpload: false
				}
			});
			return;
		}
		
		// Save access_students exclude
		const accessStudentsExcludeBody = {
			access_students: {
				...(event_id && { event_id }),
				...(coupon_id && { coupon_id }),
				...(parking_id && { parking_id }),
				...(highlight_id && { highlight_id }),
				...(popup_id && { popup_id }),
				...(push_id && { push_id }),
				access_type: 'exclude',
				type,
				students: exclude_students ? exclude_students.map(o => ({
					student_id: o.emplid
				})) : []
			}
		};

		const responseAccessStudentsExclude = await API.access_students.updateAccessStudents(accessStudentsExcludeBody);
		if (responseAccessStudentsExclude.meta.code !== 200) {
			dispatch({
				type: ActionTypes.UPLOAD_SEGMENTATION_ERROR,
				payload: {
					// meta: responseAccessStudentsExclude.meta,
					loadingUpload: false
				}
			});
			return;
		}

		dispatch({
			type: ActionTypes.UPLOAD_SEGMENTATION_SUCCESS,
			payload: {
				// meta: include_students ? responseAccessStudentsInclude.meta : responseAccessStudentsExclude.meta,
				loadingUpload: false
			}
		});
		
	};
}

export function onSubmit({
	type,
	event_id,
	coupon_id,
	parking_id,
	highlight_id,
	popup_id,
	push_id,
	is_visible_all,
	access_groups,
	access_students_include,
	access_students_exclude
}) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SUBMIT_SEGMENTATION_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		// Save access groups
		const accessGroupsbody = {
			access_groups: {
				...(event_id && { event_id }),
				...(coupon_id && { coupon_id }),
				...(parking_id && { parking_id }),
				...(highlight_id && { highlight_id }),
				...(popup_id && { popup_id }),
				...(push_id && { push_id }),
				is_visible_all,
				access_type: 'include',
				type,
				groups: access_groups ? access_groups.map(o => ({
					grad_year: o.grad_year,
					acad_group: o.acad_group.id,
					acad_plan: o.acad_plan.id
				})) : []
			}
		};

		const responseAccessGroups = await API.access_groups.updateAccessGroups(accessGroupsbody);
		if (responseAccessGroups.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_SEGMENTATION_ERROR,
				payload: {
					meta: responseAccessGroups.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		// Save access_students include
		const accessStudentsIncludeBody = {
			access_students: {
				...(event_id && { event_id }),
				...(coupon_id && { coupon_id }),
				...(parking_id && { parking_id }),
				...(highlight_id && { highlight_id }),
				...(popup_id && { popup_id }),
				...(push_id && { push_id }),
				access_type: 'include',
				type,
				students: access_students_include.map(o => ({
					student_id: o.emplid
				}))
			}
		};
			
		const responseAccessStudentsInclude = await API.access_students.updateAccessStudents(accessStudentsIncludeBody);
		if (responseAccessStudentsInclude.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_SEGMENTATION_ERROR,
				payload: {
					meta: responseAccessStudentsInclude.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		// Save access_students exclude
		const accessStudentsExcludeBody = {
			access_students: {
				...(event_id && { event_id }),
				...(coupon_id && { coupon_id }),
				...(parking_id && { parking_id }),
				...(highlight_id && { highlight_id }),
				...(popup_id && { popup_id }),
				...(push_id && { push_id }),
				access_type: 'exclude',
				type,
				students: access_students_exclude.map(o => ({
					student_id: o.emplid
				}))
			}
		};
	
		const responseAccessStudentsExclude = await API.access_students.updateAccessStudents(accessStudentsExcludeBody);
		if (responseAccessStudentsExclude.meta.code !== 200) {
			dispatch({
				type: ActionTypes.SUBMIT_SEGMENTATION_ERROR,
				payload: {
					meta: responseAccessStudentsExclude.meta,
					loadingSubmit: false
				}
			});
			return;
		}

		dispatch({
			type: ActionTypes.SUBMIT_SEGMENTATION_SUCCESS,
			payload: {
				meta: responseAccessGroups.meta,
				loadingSubmit: false
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_SEGMENTATION_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_SEGMENTATION_PAGE
		});
	};
}