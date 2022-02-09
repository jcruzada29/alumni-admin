import { connect } from 'react-redux';

import UserEventsPage from './UserEventsPage';
import { getEventsByUser, reset } from '../../../actions/UsersPage/UserEventPage';

const mapsStateToProps = state => ({
	userEventPageReducer: state.userEventPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEventsByUser: id => dispatch(getEventsByUser(id)),
	reset: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(UserEventsPage);

