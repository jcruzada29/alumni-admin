import { connect } from 'react-redux';

import UserBasicPage from './UserBasicPage';
import { getUserById } from '../../../actions/UsersPage/UserDetailPage';

const mapsStateToProps = state => ({
	DetailsUserPageReducer: state.DetailsUserPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getUserById: id => dispatch(getUserById(id))
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(UserBasicPage);

