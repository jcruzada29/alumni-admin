import React, { Component } from 'react';
import { Divider, Icon, Breadcrumb } from 'semantic-ui-react';
import DetailMenu from './../../components/DetailMenu';
import UrlParse from 'url-parse';
import PushNotificationBasicPage from './PushNotificationBasicPage';
import PushNotificationSegmentationPage from './PushNotificationSegmentationPage.js';


export class PushNotificationDetailPage extends Component {
	_getSpecificComponent = () => {
		const { history } = this.props;
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length - 1];
		switch (true) {
			case (pathname === 'basic'):
				return <PushNotificationBasicPage {...this.props} />;
			case (pathname === 'segmentation'):
				return <PushNotificationSegmentationPage {...this.props} />;
			default:
			// back to push-notifications list once routes not found				
				history.push('/push-notifications');
		}
	}

	render() {
		const { history, location } = this.props;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/push-notications', content: 'Push Notifications', link: true, onClick: () => history.push('/push-notifications') },
			{ key: 'Detail', content: 'Detail', active: true }
		];
		const tabs = [
			{ title: 'Basic', path: `/basic?id=${query.id}` },
			{ title: 'Segmentation', path: `/segmentation?id=${query.id}` }
		];

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>
						<Icon
							className="icon-bold"
							name="arrow left"
							onClick={() => history.push('/push-notifications')}
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

export default PushNotificationDetailPage;
