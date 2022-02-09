import React, { Component } from 'react';
import { Divider, Icon, Breadcrumb } from 'semantic-ui-react';
import DetailMenu from '../../components/DetailMenu';
import UrlParse from 'url-parse';
import UserBasicPage from './UserBasicPage';
import UserCouponPage from './UserCouponPage';
import UserEventsPage from './UserEventsPage';
import UserParkingPrivilegesPage from './UserParkingPrivilegesPage';
import UserNotificationsPage from './UserNotificationsPage';

class UserDetailPage extends Component {

	_getSpecificComponent = () => {
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length - 1];
		switch (true) {
			case (pathname === 'basic'):
				return <UserBasicPage {...this.props} />;
			case (pathname === 'events'):
				return <UserEventsPage {...this.props} />;
			case (pathname === 'coupons'):
				return <UserCouponPage {...this.props} />;
			case (pathname === 'parking-privileges'):
				return <UserParkingPrivilegesPage {...this.props} />;
			case (pathname === 'notifications'):
				return <UserNotificationsPage {...this.props} />;
			default:
				// back to users list once routes not found				
				this.props.navigateToUsers();
		}
	}

	render() {

		const { history, location } = this.props;
		const { query } = UrlParse(location.search, true);

		const sections = [
			{ key: '/users', content: 'Users', link: true, onClick: () => this.props.navigateToUsers() },
			{ key: 'Detail', content: 'Detail', active: true }
		];

		const user_detail_tabs = [
			{ title: 'Basic', path: `/basic?id=${query.id}` },
			{ title: 'Events', path: `/events?id=${query.id}` },
			{ title: 'Coupons', path: `/coupons?id=${query.id}` },
			{ title: 'Parking Privileges', path: `/parking-privileges?id=${query.id}` },
			{ title: 'Notifications', path: `/notifications?id=${query.id}` }
		];

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>
						<Icon
							className="icon-bold"
							name="arrow left"
							onClick={() => this.props.navigateToUsers()}
						/>
						<Breadcrumb
							divider="/"
							sections={sections}
						/>
					</span>
				</div>
				<Divider />
				<DetailMenu
					tabs={user_detail_tabs}
					location={location}
					history={history}
				/>
				<div
					className="bt-content-padded"
					id="cust-main-container"
				>
					{this._getSpecificComponent()}
				</div>
			</div>
		);
	}
}

export default UserDetailPage;