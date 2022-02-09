import { connect } from 'react-redux';
import EventBasicPage from './EventBasicPage';
import {
	getEventById,
	getAssetFileById,
	onSubmit,
	navigateToEventListPage,
	resetMeta,
	reset
} from '../../../actions/EventDetailPage/EventBasicPage';

const mapsStateToProps = state => ({
	pageProps: state.eventDetailPage.eventBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEventById: id => dispatch(getEventById(id)),
	getAssetFileById: options => dispatch(getAssetFileById(options)),
	onSubmit: fields => dispatch(onSubmit(fields)),
	navigateToEventListPage: () => dispatch(navigateToEventListPage()),
	resetMeta: () => dispatch(resetMeta()),
	reset: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(EventBasicPage);

