import { connect } from 'react-redux';
import {
	getSettings,
	onSubmit,
	resetMeta,
	reset
} from '../../actions/GeneralSettingsPage';
import GeneralSettingsPage from './GeneralSettingsPage';

const mapsStateToProps = state => ({
	generalSettingsPageProps: state.generalSettingsPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getSettings() {
		dispatch(getSettings());
	},
	onSubmit(options) {
		dispatch(onSubmit(options));
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	resetPage() {
		dispatch(reset());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(GeneralSettingsPage);
