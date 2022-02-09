import { connect } from 'react-redux';
import {
	onSubmit, getAssetFileById, deleteOnboardingScreenById,
	getOnboardingScreenById,
	resetMeta, reset
} from '../../../actions/OnboardingScreenPage/OnboardingScreenDetailPage';

import OnboardingScreenDetailPage from './OnboardingScreenDetailPage';

const mapsStateToProps = state => ({
	onboardingScreenDetailPageProps: state.onboardingScreenPage.onboardingScreenDetailPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getOnboardingScreenById(options){
		dispatch(getOnboardingScreenById(options));
	},
	onSubmit(options){
		dispatch(onSubmit(options));
	},
	deleteOnboardingScreenById(id){
		dispatch(deleteOnboardingScreenById(id));
	},
	getAssetFileById(options){
		dispatch(getAssetFileById(options));
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
)(OnboardingScreenDetailPage);

