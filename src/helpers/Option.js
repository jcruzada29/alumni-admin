import moment from 'moment';
import _ from 'lodash';
// import LabelHelper from './Label';

const OptionHelper = {
	graduationYears() {
		return [
			{ value: 'any', text: 'Any' },
			... _.reverse(_.range(1990, +(moment().format('YYYY')) + 1).map(year => ({
				value: '' + year,
				text: '' + year
			})))
		];
	},
	acadPlans(arr) {
		if (!arr) {
			return [];
		}
		return [
			{ value: 'any', text: 'Any' },
			...arr.map(ap => ({
				value: ap.id,
				text: ap.descr
			}))
		];
	},
	acadGroups(arr) {
		if (!arr) {
			return [];
		}
		return [
			{ value: 'any', text: 'Any' },
			...arr.map(ap => ({
				value: ap.id,
				text: ap.descr
			}))
		];
	},
	notificationTypes() {
		return [
			{ value: 'email', text: 'Email' },
			{ value: 'push', text: 'Push' }
		];
	},
	eventNotificationRecipients() {
		return [
			{ value: 'all_eligible_alumni', text: 'All eligible alumni' },
			{ value: 'alumni_who_have_registered', text: 'Alumni who have registered in this event' },
			{ value: 'alumni_who_have_not_registered', text: 'Alumni who have not registered in this event' }
		];
	},
	couponNotificationRecipients() {
		return [
			{ value: 'all_eligible_alumni', text: 'All eligible alumni' },
			{ value: 'alumni_who_have_used', text: 'Alumni who have used this coupon' },
			{ value: 'alumni_who_have_not_used', text: 'Alumni who have not used this coupon' }
		];
	},
	parkingNotificationRecipients() {
		return [
			{ value: 'all_eligible_alumni', text: 'All eligible alumni' },
			{ value: 'alumni_who_have_used', text: 'Alumni who have used this parking privilege' },
			{ value: 'alumni_who_have_not_used', text: 'Alumni who have not used this parking privilege' }
		];
	}
};

export default OptionHelper;
