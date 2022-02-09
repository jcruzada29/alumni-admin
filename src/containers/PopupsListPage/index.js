import { connect } from 'react-redux';
import PopupsListPage from './PopupsListPage';
import { getPopups, reset } from '../../actions/PopupsListPage';

const mapsStateToProps = state => ({
	popupsListPageReducer: state.popupsListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getPopups: opts => dispatch(getPopups(opts)),
	resetPage: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(PopupsListPage);

