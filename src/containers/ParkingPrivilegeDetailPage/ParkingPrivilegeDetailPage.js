import React, { Component } from 'react';
import { Divider, Icon, Breadcrumb } from 'semantic-ui-react';
import DetailMenu from './../../components/DetailMenu';
import UrlParse from 'url-parse';
import ParkingPrivilegeBasicPage from './ParkingPrivilegeBasicPage';
import ParkingPrivilegeSegmentationPage from './ParkingPrivilegeSegmentationPage';
import ParkingPrivilegeNotificationsPage from './ParkingPrivilegeNotificationsPage';
import ParkingPrivilegeUsagePage from './ParkingPrivilegeUsagePage';
import ParkingPrivilegeReportsPage from './ParkingPrivilegeReportsPage';


export class ParkingPrivilegeDetailPage extends Component {
	_getSpecificComponent = () => {
		const { history } = this.props;
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length - 1];
		switch (true) {
			case (pathname === 'basic'):
				return <ParkingPrivilegeBasicPage {...this.props} />;
			case (pathname === 'segmentation'):
				return <ParkingPrivilegeSegmentationPage {...this.props} />;
			case (pathname === 'notifications'):
				return <ParkingPrivilegeNotificationsPage {...this.props} />;
			case (pathname === 'usage'):
				return <ParkingPrivilegeUsagePage {...this.props} />;
			case (pathname === 'reports'):
				return <ParkingPrivilegeReportsPage {...this.props} />;
			default:
				// back to parking-privileges once routes not found				
				history.push('/parking-privileges');
		}
	}

	render() {
		const { history, location } = this.props;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/parking-privileges', content: 'Parking Privileges', link: true, onClick: () => history.push('/parking-privileges') },
			{ key: 'Detail', content: 'Detail', active: true }
		];
		const tabs = [
			{ title: 'Basic', path: `/basic?id=${query.id}` },
			{ title: 'Segmentation', path: `/segmentation?id=${query.id}` },
			{ title: 'Notifications', path: `/notifications?id=${query.id}` },
			{ title: 'Usage', path: `/usage?id=${query.id}` },
			{ title: 'Reports', path: `/reports?id=${query.id}` }
		];

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>
						<Icon
							className="icon-bold"
							name="arrow left"
							onClick={() => history.push('/parking-privileges')}
						/>
						<Breadcrumb
							divider="/"
							sections={sections}
						/>
					</span>
				</div>
				<Divider />
				<DetailMenu
					tabs={tabs}
					location={location}
					history={history}
				/>
				{this._getSpecificComponent()}
			</div>
		);
	}
}

export default ParkingPrivilegeDetailPage;
