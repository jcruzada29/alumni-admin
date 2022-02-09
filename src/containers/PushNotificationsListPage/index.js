import { connect } from 'react-redux';
import PushNotificationsListPage from './PushNotificationsListPage';
import { getPushNotifications, reset } from '../../actions/PushNotificationsListPage';

const mapsStateToProps = state => ({
	pushNotificationsPageReducer: state.pushNotificationsPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getPushNotifications: opts => dispatch(getPushNotifications(opts)),
	resetPage: () => dispatch(reset())
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(PushNotificationsListPage);

