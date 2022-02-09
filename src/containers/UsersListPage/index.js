import { connect } from 'react-redux';

import UsersListPage from './UsersListPage';
import { getUsers, reset } from '../../actions/UsersPage/UsersListPage';

const mapsStateToProps = state => ({
	UsersListPageReducer: state.UsersListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getUsers: options => dispatch(getUsers(options)),
	resetPage: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(UsersListPage);

