import { connect } from 'react-redux';
import {
	getonboardingScreens,
	resetMeta, reset
} from '../../actions/OnboardingScreenPage/OnboardingScreenPage';

import OnboardingScreenPage from './OnboardingScreenPage';

const mapsStateToProps = state => ({
	onboardingScreenPageProps: state.onboardingScreenPage.onboardingScreenPageReducer,
	onboardingScreenDetailPageProps: state.onboardingScreenPage.onboardingScreenDetailPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getonboardingScreens(options) {
		dispatch(getonboardingScreens(options));
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
)(OnboardingScreenPage);

