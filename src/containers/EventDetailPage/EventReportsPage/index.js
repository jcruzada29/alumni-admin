import { connect } from 'react-redux';
import EventReportsPage from './EventReportsPage';
import { downloadReports, reset, resetMeta } from '../../../actions/EventDetailPage/EventReportsPage';

const mapsStateToProps = state => ({
	pageProps: state.eventDetailPage.eventReportsPageReducer
});

const mapsDispatchToProps = dispatch => ({
	downloadReports: query => dispatch(downloadReports(query)),
	reset: () => dispatch(reset()),
	resetMeta: () => dispatch(resetMeta())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(EventReportsPage);

