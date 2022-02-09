import { connect } from 'react-redux';

import UserNotificationsPage from './UserNotificationsPage';
import { getNotificationsByUser, reset } from '../../../actions/UsersPage/UserNotificationPage';

const mapsStateToProps = state => ({
	userNotificationPageReducer: state.userNotificationPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getNotificationsByUser: id => dispatch(getNotificationsByUser(id)),
	reset: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(UserNotificationsPage);

