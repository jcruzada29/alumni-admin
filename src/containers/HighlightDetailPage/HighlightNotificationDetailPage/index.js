import { connect } from 'react-redux';
import HighlightNotificationDetailPage from './HighlightNotificationDetailPage';
import {
	getHighlightNotificationById,
	onSubmit,
	onSchedule,
	onSend,
	resetMeta,
	reset
} from '../../../actions/HighlightDetailPage/HighlightNotificationDetailPage';

const mapsStateToProps = state => ({
	highlightNotificationDetailPageProps: state.highlightDetailPage.highlightNotificationDetailPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getHighlightNotificationById(id) {
		dispatch(getHighlightNotificationById(id));
	},
	onSubmit(options) {
		dispatch(onSubmit(options));
	},
	onSchedule(options) {
		dispatch(onSchedule(options));
	},
	onSend(options) {
		dispatch(onSend(options));
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	reset() {
		dispatch(reset());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(HighlightNotificationDetailPage);

