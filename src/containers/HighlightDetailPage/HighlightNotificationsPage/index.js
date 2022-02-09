import { connect } from 'react-redux';
import HighlightNotificationsPage from './HighlightNotificationsPage';
import {
	getHighlightNotifications,
	resetMeta,
	reset
} from '../../../actions/HighlightDetailPage/HighlightNotificationsPage';

const mapsStateToProps = state => ({
	highlightNotificationsPageProps: state.highlightDetailPage.highlightNotificationsPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getHighlightNotifications(options) {
		dispatch(getHighlightNotifications(options));
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
)(HighlightNotificationsPage);

