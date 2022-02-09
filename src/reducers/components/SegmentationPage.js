import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	record: null,
	loadingRecord: false,
	hasLoadedRecord: false,

	access_groups: [],
	loadingAccessGroups: false,
	hasLoadedAccessGroups: false,

	access_students_include: [],
	loadingAccessStudentsInclude: false,
	hasLoadedAccessStudentsInclude: false,

	access_students_exclude: [],
	loadingAccessStudentsExclude: false,
	hasLoadedAccessStudentsExclude: false,

	search_students_include: [],
	loadingSearchStudentsInclude: false,

	search_students_exclude: [],
	loadingSearchStudentsExclude: false,

	academic_groups: [],
	loadingAcademicGroups: false,

	academic_plans: [],
	loadingAcademicPlans: false,

	loadingSubmit: false,
	loadingUpload: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_SEGMENTATION_RECORD_REQUEST:
		case ActionTypes.GET_SEGMENTATION_RECORD_SUCCESS:
		case ActionTypes.GET_SEGMENTATION_RECORD_ERROR:
		case ActionTypes.GET_SEGMENTATION_ACAD_GROUPS_REQUEST:
		case ActionTypes.GET_SEGMENTATION_ACAD_GROUPS_SUCCESS:
		case ActionTypes.GET_SEGMENTATION_ACAD_GROUPS_ERROR:
		case ActionTypes.GET_SEGMENTATION_ACAD_PLANS_REQUEST:
		case ActionTypes.GET_SEGMENTATION_ACAD_PLANS_SUCCESS:
		case ActionTypes.GET_SEGMENTATION_ACAD_PLANS_ERROR:
		case ActionTypes.GET_SEGMENTATION_ACCESS_GROUPS_REQUEST:
		case ActionTypes.GET_SEGMENTATION_ACCESS_GROUPS_SUCCESS:
		case ActionTypes.GET_SEGMENTATION_ACCESS_GROUPS_ERROR:
		case ActionTypes.GET_SEGMENTATION_ACCESS_STUDENTS_INCLUDE_REQUEST:
		case ActionTypes.GET_SEGMENTATION_ACCESS_STUDENTS_INCLUDE_SUCCESS:
		case ActionTypes.GET_SEGMENTATION_ACCESS_STUDENTS_INCLUDE_ERROR:
		case ActionTypes.GET_SEGMENTATION_ACCESS_STUDENTS_EXCLUDE_REQUEST:
		case ActionTypes.GET_SEGMENTATION_ACCESS_STUDENTS_EXCLUDE_SUCCESS:
		case ActionTypes.GET_SEGMENTATION_ACCESS_STUDENTS_EXCLUDE_ERROR:
		case ActionTypes.GET_SEGMENTATION_SEARCH_STUDENTS_INCLUDE_REQUEST:
		case ActionTypes.GET_SEGMENTATION_SEARCH_STUDENTS_INCLUDE_SUCCESS:
		case ActionTypes.GET_SEGMENTATION_SEARCH_STUDENTS_INCLUDE_ERROR:
		case ActionTypes.GET_SEGMENTATION_SEARCH_STUDENTS_EXCLUDE_REQUEST:
		case ActionTypes.GET_SEGMENTATION_SEARCH_STUDENTS_EXCLUDE_SUCCESS:
		case ActionTypes.GET_SEGMENTATION_SEARCH_STUDENTS_EXCLUDE_ERROR:
		case ActionTypes.SUBMIT_SEGMENTATION_REQUEST:
		case ActionTypes.SUBMIT_SEGMENTATION_SUCCESS:
		case ActionTypes.SUBMIT_SEGMENTATION_ERROR:
		case ActionTypes.UPLOAD_SEGMENTATION_REQUEST:
		case ActionTypes.UPLOAD_SEGMENTATION_SUCCESS:
		case ActionTypes.UPLOAD_SEGMENTATION_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_SEGMENTATION_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_SEGMENTATION_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
