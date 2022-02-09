import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import LoginPage from './LoginPage';

import eventsListPageReducer from './EventsListPage';
import eventBasicPageReducer from './EventDetailPage/EventBasicPage';
import eventParticipantFormPageReducer from './EventDetailPage/EventParticipantFormPage';
import eventPricingPageReducer from './EventDetailPage/EventPricingPage';
import eventNotificationsPageReducer from './EventDetailPage/EventNotificationsPage';
import eventNotificationDetailPageReducer from './EventDetailPage/EventNotificationDetailPage';
import eventRegistrationsPageReducer from './EventDetailPage/EventRegistrationsPage';
import eventReportsPageReducer from './EventDetailPage/EventReportsPage';

import checkInAdminPageReducer from './CheckInAdminPage';
import adminsListPageReducer from './AdminsListPage';
import adminDetailPageReducer from './AdminDetailPage';
import UsersListPageReducer from './UsersListPage';
import DetailsUserPageReducer from './UserDetailPage';
import userEventPageReducer from './UserEventPage';
import userCouponPageReducer from './UserCouponPage';
import userParkingPriviligePageReducer from './UserParkingPriviligePage';
import userNotificationPageReducer from './UserNotificationPage';
import onboardingScreenPageReducer from './OnboardingScreenPage/OnboardingScreenPage';
import onboardingScreenDetailPageReducer from './OnboardingScreenPage/OnboardingScreenDetailPage';
import merchantPageReducer from './MerchantPage';

import newsListPageReducer from './NewsListPage';
import newsBasicPageReducer from './NewsDetailPage/NewsBasicPage';
import newsNotificationsPageReducer from './NewsDetailPage/NewsNotificationPage';
import newsNotificationDetailPageReducer from './NewsDetailPage/NewsNotificationDetailPage';

import generalSettingsPageReducer from './GeneralSettingsPage';
import eventsPageReducer from './EventsPage/EventsPage';


import parkingPrivilegesListPageReducer from './ParkingPrivilegeListPage';
import parkingPrivilegeBasicPageReducer from './ParkingPrivilegeDetailPage/ParkingPrivilegeBasicPage';
import parkingPrivilegeSegmentationPageReducer from './ParkingPrivilegeDetailPage/ParkingPrivilegeSegmentationPage';
import parkingPrivilegeNotificationsPageReducer from './ParkingPrivilegeDetailPage/ParkingPrivilegeNotificationsPage';
import parkingPrivilegeNotificationDetailPageReducer from './ParkingPrivilegeDetailPage/ParkingPrivilegeNotificationDetailPage';
import parkingPrivilegeUsagePageReducer from './ParkingPrivilegeDetailPage/ParkingPrivilegeUsagePage';
import parkingPrivilegeReportsPageReducer from './ParkingPrivilegeDetailPage/ParkingPrivilegeReportsPage';

import parkingAdminPageReducer from './ParkingAdminPage';

import couponsListPageReducer from './CouponsListPage';
import couponBasicPageReducer from './CouponDetailPage/CouponBasicPage';
import couponSegmentationPageReducer from './CouponDetailPage/CouponSegmentationPage';
import couponNotificationsPageReducer from './CouponDetailPage/CouponNotificationsPage';
import couponNotificationDetailPageReducer from './CouponDetailPage/CouponNotificationDetailPage';
import couponCouponsPageReducer from './CouponDetailPage/CouponCouponsPage';
import couponReportsPageReducer from './CouponDetailPage/CouponReportsPage';

import highlightsPageReducer from './HighlightsPage';
import highlightBasicPageReducer from './HighlightDetailPage/HighlightBasicPage';
import highlightNotificationsPageReducer from './HighlightDetailPage/HighlightNotificationsPage';
import highlightNotificationDetailPageReducer from './HighlightDetailPage/HighlightNotificationDetailPage';

import popupsListPageReducer from './PopupListPage';
import popupBasicPageReducer from './PopupDetailPage/PopupBasicPage';

import pushNotificationsPageReducer from './PushNotificationsListPage';
import pushNotificationBasicPageReducer from './PushNotificationDetailPage/PushNotificationBasicPage';

import segmentationPageReducer from './components/SegmentationPage';

export default history =>
	combineReducers({
		form: formReducer,
		router: connectRouter(history),
		loginPageReducer: LoginPage,
		eventsListPageReducer,
		eventDetailPage: combineReducers({
			eventBasicPageReducer,
			eventParticipantFormPageReducer,
			eventPricingPageReducer,
			eventNotificationsPageReducer,
			eventNotificationDetailPageReducer,
			eventRegistrationsPageReducer,
			eventReportsPageReducer
		}),
		checkInAdminPageReducer,
		adminsListPageReducer,
		adminDetailPageReducer,
		UsersListPageReducer,
		DetailsUserPageReducer,
		userEventPageReducer,
		userCouponPageReducer,
		userParkingPriviligePageReducer,
		userNotificationPageReducer,
		onboardingScreenPage: combineReducers({
			onboardingScreenPageReducer,
			onboardingScreenDetailPageReducer
		}),
		merchantPageReducer,
		newsListPageReducer,
		newsDetailPage: combineReducers({
			newsBasicPageReducer,
			newsNotificationsPageReducer,
			newsNotificationDetailPageReducer
		}),
		eventsPage: combineReducers({
			eventsPageReducer
		}),
		generalSettingsPageReducer,
		parkingPrivilegesListPageReducer,
		parkingPrivilegeDetailPage: combineReducers({
			parkingPrivilegeBasicPageReducer,
			parkingPrivilegeSegmentationPageReducer,
			parkingPrivilegeNotificationsPageReducer,
			parkingPrivilegeNotificationDetailPageReducer,
			parkingPrivilegeUsagePageReducer,
			parkingPrivilegeReportsPageReducer
		}),
		parkingAdminPageReducer,
		couponsListPageReducer,
		couponDetailPage: combineReducers({
			couponBasicPageReducer,
			couponSegmentationPageReducer,
			couponNotificationsPageReducer,
			couponNotificationDetailPageReducer,
			couponCouponsPageReducer,
			couponReportsPageReducer
		}),
		highlightsPageReducer,
		highlightDetailPage: combineReducers({
			highlightBasicPageReducer,
			highlightNotificationsPageReducer,
			highlightNotificationDetailPageReducer
		}),
		popupsListPageReducer,
		popupDetailPage: combineReducers({
			popupBasicPageReducer
		}),
		pushNotificationsPageReducer,
		pushNotificationDetailPage: combineReducers({
			pushNotificationBasicPageReducer
		}),
		components: combineReducers({
			segmentationPageReducer
		})
	});