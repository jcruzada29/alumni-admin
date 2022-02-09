import { connect } from 'react-redux';
import HighlightsListPage from './HighlightsListPage';
import { getHighlights, reset } from '../../actions/HighlightListPage';

const mapsStateToProps = state => ({
	highlightsPageReducer: state.highlightsPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getHighlights: query => dispatch(getHighlights(query)),
	resetPage: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(HighlightsListPage);

