import { connect } from 'react-redux';
import SegmentationPage from './SegmentationPage';
import {
	getRecordById,
	getAcademicGroups,
	getAcademicPlans,
	getAccessGroups,
	getAccessStudents,
	getStudents,
	onSubmit,
	onUpload,
	resetMeta,
	reset
} from '../../actions/components/SegmentationPage';

const mapsStateToProps = state => ({
	pageProps: state.components.segmentationPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getRecordById: options => dispatch(getRecordById(options)),
	getAcademicGroups: () => dispatch(getAcademicGroups()),
	getAcademicPlans: () => dispatch(getAcademicPlans()),
	getAccessGroups: options => dispatch(getAccessGroups(options)),
	getAccessStudents: options => dispatch(getAccessStudents(options)),
	getStudents: options => dispatch(getStudents(options)),
	onSubmit: options => dispatch(onSubmit(options)),
	onUpload: options => dispatch(onUpload(options)),
	resetMeta: () => dispatch(resetMeta()),
	resetPage: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(SegmentationPage);

