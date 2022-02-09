import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AuthHelper from './helpers/auth';

/* layouts */
import BasicLayout from './layouts/basic-layout';
import NavigationLayout from './layouts/navigation-layout';

/* containers */
import LoginPage from './containers/LoginPage';
import CallbackCasPage from './containers/CallbackCasPage';
import LogoutPage from './containers/LogoutPage';
import UnauthorizedPage from './containers/UnauthorizedPage';

import EventsListPage from './containers/EventsListPage';
import EventDetailPage from './containers/EventDetailPage';
import EventBasicPage from './containers/EventDetailPage/EventBasicPage';
import EventNotificationDetailPage from './containers/EventDetailPage/EventNotificationDetailPage';

import CheckInAdminPage from './containers/CheckInAdminPage/';

// OnboardingScreens
import OnboardingScreenPage from './containers/OnboardingScreenPage';

// News
import NewsListPage from './containers/NewsListPage';
import NewsDetailPage from './containers/NewsDetailPage';
import NewsBasicPage from './containers/NewsDetailPage/NewsBasicPage';
import NewsNotificationDetailPage from './containers/NewsDetailPage/NewsNotificationDetailPage';

// Users
import UsersListPage from './containers/UsersListPage';
import UserDetailPage from './containers/UserDetailPage';
import AdminsListPage from './containers/AdminsListPage';
import AdminDetailPage from './containers/AdminDetailPage';

import MerchantPage from './containers/MerchantPage';

import GeneralSettingsPage from './containers/GeneralSettingsPage';

import ParkingPrivilegeListPage from './containers/ParkingPrivilegeListPage';
import ParkingPrivilegeDetailPage from './containers/ParkingPrivilegeDetailPage';
import ParkingPrivilegeBasicPage from './containers/ParkingPrivilegeDetailPage/ParkingPrivilegeBasicPage';
import ParkingPrivilegeNotificationDetailPage from './containers/ParkingPrivilegeDetailPage/ParkingPrivilegeNotificationDetailPage';
import ParkingAdminPage from './containers/ParkingAdminPage';

import CouponsListPage from './containers/CouponsListPage';
import CouponDetailPage from './containers/CouponDetailPage';
import CouponBasicPage from './containers/CouponDetailPage/CouponBasicPage';
import CouponNotificationDetailPage from './containers/CouponDetailPage/CouponNotificationDetailPage';

import HighlightsListPage from './containers/HighlightsListPage';
import HighlightDetailPage from './containers/HighlightDetailPage';
import HighlightBasicPage from './containers/HighlightDetailPage/HighlightBasicPage';
import HighlightNotificationDetailPage from './containers/HighlightDetailPage/HighlightNotificationDetailPage';

import PopupsListPage from './containers/PopupsListPage';
import PopupDetailPage from './containers/PopupDetailPage';
import PopupBasicPage from './containers/PopupDetailPage/PopupBasicPage';

import PushNotificationsListPage from './containers/PushNotificationsListPage';
import PushNotificationBasicPage from './containers/PushNotificationDetailPage/PushNotificationBasicPage';
import PushNotificationDetailPage from './containers/PushNotificationDetailPage';

const routes = [
	{ path: '/unauthorized', exact: true, isPrivate: false, Layout: BasicLayout, layoutClass: 'narrow', Component: UnauthorizedPage },
	{ path: '/login', exact: true, isPrivate: false, Layout: BasicLayout, layoutClass: 'narrow', Component: LoginPage },
	{ path: '/callback/cas', exact: true, isPrivate: false, Layout: BasicLayout, layoutClass: 'narrow', Component: CallbackCasPage },
	{ path: '/logout', exact: true, isPrivate: false, Layout: BasicLayout, layoutClass: 'narrow', Component: LogoutPage },

	// Events
	{ path: '/', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: EventsListPage },
	{ path: '/events', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: EventsListPage },
	{ path: '/events/create', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: EventBasicPage },
	{ path: '/events/id/basic', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: EventDetailPage },
	{ path: '/events/id/participant-form', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: EventDetailPage },
	{ path: '/events/id/pricing', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: EventDetailPage },
	{ path: '/events/id/segmentation', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: EventDetailPage },
	{ path: '/events/id/notifications', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: EventDetailPage },
	{ path: '/events/id/notifications/create', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: EventNotificationDetailPage },
	{ path: '/events/id/notifications/detail', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: EventNotificationDetailPage },
	{ path: '/events/id/registrations', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: EventDetailPage },
	{ path: '/events/id/reports', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: EventDetailPage },

	// Check-in App Admin
	{ path: '/check-in', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: CheckInAdminPage },

	// OnboardScreens]
	{ path: '/onboarding-screens', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: OnboardingScreenPage },

	// News
	{ path: '/news', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: NewsListPage },
	{ path: '/news/create', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: NewsBasicPage },
	{ path: '/news/id/basic', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: NewsDetailPage },
	{ path: '/news/id/notifications', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: NewsDetailPage },
	{ path: '/news/id/notifications/create', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: NewsNotificationDetailPage },
	{ path: '/news/id/notifications/detail', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: NewsNotificationDetailPage },

	// Users
	{ path: '/users', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: UsersListPage },
	{ path: '/users/id/basic', exact: false, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: UserDetailPage },
	{ path: '/users/id/events', exact: false, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: UserDetailPage },
	{ path: '/users/id/coupons', exact: false, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: UserDetailPage },
	{ path: '/users/id/parking-privileges', exact: false, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: UserDetailPage },
	{ path: '/users/id/notifications', exact: false, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: UserDetailPage },

	// Admins
	{ path: '/admins', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: AdminsListPage},
	{ path: '/admins/create', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: AdminDetailPage },
	{ path: '/admins/id', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: AdminDetailPage },

	// Merchants
	{ path: '/merchants', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: MerchantPage },

	// Settings
	{ path: '/settings', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: GeneralSettingsPage },

	// Parking Privilege
	{ path: '/parking-privileges', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: ParkingPrivilegeListPage },
	{ path: '/parking-privileges/create', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: ParkingPrivilegeBasicPage },
	{ path: '/parking-privileges/id/basic', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: ParkingPrivilegeDetailPage },
	{ path: '/parking-privileges/id/segmentation', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: ParkingPrivilegeDetailPage },
	{ path: '/parking-privileges/id/notifications', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: ParkingPrivilegeDetailPage },
	{ path: '/parking-privileges/id/notifications/create', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: ParkingPrivilegeNotificationDetailPage },
	{ path: '/parking-privileges/id/notifications/detail', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: ParkingPrivilegeNotificationDetailPage },
	{ path: '/parking-privileges/id/usage', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: ParkingPrivilegeDetailPage },
	{ path: '/parking-privileges/id/reports', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: ParkingPrivilegeDetailPage },

	// Parking Admins
	{ path: '/parking-admins', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: ParkingAdminPage },

	// Coupons
	{ path: '/coupons', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: CouponsListPage },
	{ path: '/coupons/create', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: CouponBasicPage },
	{ path: '/coupons/id/basic', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: CouponDetailPage },
	{ path: '/coupons/id/segmentation', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: CouponDetailPage },
	{ path: '/coupons/id/notifications', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: CouponDetailPage },
	{ path: '/coupons/id/notifications/create', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: CouponNotificationDetailPage },
	{ path: '/coupons/id/notifications/detail', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: CouponNotificationDetailPage },
	{ path: '/coupons/id/coupons', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: CouponDetailPage },
	{ path: '/coupons/id/reports', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: CouponDetailPage },

	// Highlights
	{ path: '/highlights', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: HighlightsListPage },
	{ path: '/highlights/create', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: HighlightBasicPage },
	{ path: '/highlights/id/basic', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: HighlightDetailPage },
	{ path: '/highlights/id/segmentation', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: HighlightDetailPage },
	{ path: '/highlights/id/notifications', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: HighlightDetailPage },
	{ path: '/highlights/id/notifications/create', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: HighlightNotificationDetailPage },
	{ path: '/highlights/id/notifications/detail', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: HighlightNotificationDetailPage },

	// Popups
	{ path: '/popups', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: PopupsListPage },
	{ path: '/popups/create', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: PopupBasicPage },
	{ path: '/popups/id/basic', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: PopupDetailPage },
	{ path: '/popups/id/segmentation', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: PopupDetailPage },

	// Push Notifications
	{ path: '/push-notifications', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: PushNotificationsListPage },
	{ path: '/push-notifications/create', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: PushNotificationBasicPage },
	{ path: '/push-notifications/id/basic', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: PushNotificationDetailPage },
	{ path: '/push-notifications/id/segmentation', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: PushNotificationDetailPage }
];

function getRedirectedPath(location) {
	if (
		location.pathname.split('?')[0] === '/login'
		&& location.pathname.split('?').length > 1
	) {
		return location.pathname + location.search + location.hash;
	}

	// skip the redirection from these routes
	if (
		[
			'/login',
			'/callback/cas',
			'/logout'
		].indexOf(location.pathname.split('?')[0]) !== -1) {
		return '/login';
	}
	return `/login?path=${location.pathname + location.search + location.hash}`;
}


const PrivateRoute = ({ layout: Layout, layoutClass, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			if (AuthHelper.isAuthenticated()) {
				return (
					<Layout containerClass={layoutClass}>
						<Component {...props} />
					</Layout>
				);
			} else {
				return (
					<Redirect
						to={{
							pathname: getRedirectedPath(props.location),
							state: { from: props.location }
						}}
					/>
				);
			}
		}}
	/>
);

export class Routes extends Component {
	render() {
		const { location } = this.props;
		return (
			<Switch location={location}>
				{routes.map(({ path, exact, isPrivate, Layout, layoutClass, Component }) => {
					if (isPrivate) {
						return (
							<PrivateRoute
								key={0}
								path={path}
								exact={exact}
								layout={Layout}
								layoutClass={layoutClass}
								component={Component}
							/>
						);
					} else {
						return (
							<Route
								key={0}
								path={path}
								exact={exact}
								render={props => (
									<Layout
										containerClass={layoutClass}
										location={location}
									>
										<Component {...props} />
									</Layout>
								)}
							/>
						);
					}
				})}
				<Route render={props => (AuthHelper.isAuthenticated() ? <Redirect to={'/events'} /> : <Redirect to={getRedirectedPath(props.location)} />)} />
			</Switch>
		);
	}
}

export default withRouter(Routes);
