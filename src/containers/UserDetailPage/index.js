import { connect } from 'react-redux';

import UserDetailPage from './UserDetailPage';
import { navigateToUsers } from '../../actions/UsersPage/UserDetailPage';

const mapsStateToProps = state => ({
	
});

const mapsDispatchToProps = dispatch => ({
	navigateToUsers: () => dispatch(navigateToUsers())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(UserDetailPage);

