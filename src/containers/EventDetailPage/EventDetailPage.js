import React, { Component } from 'react';
import { Divider, Icon, Breadcrumb } from 'semantic-ui-react';
import DetailMenu from './../../components/DetailMenu';
import UrlParse from 'url-parse';
import EventBasicPage from './EventBasicPage';
import EventParticipantFormPage from './EventParticipantFormPage';
import EventPricingPage from './EventPricingPage';
import EventSegmentationPage from './EventSegmentationPage';
import EventNotificationsPage from './EventNotificationsPage';
import EventRegistrationsPage from './EventRegistrationsPage';
import EventReportsPage from './EventReportsPage';

class EventDetailPage extends Component {

	_getSpecificComponent = () => {
		const { history } = this.props;
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length - 1];
		switch (true) {
			case (pathname === 'basic'):
				return <EventBasicPage {...this.props} />;
			case (pathname === 'participant-form'):
				return <EventParticipantFormPage {...this.props} />;
			case (pathname === 'pricing'):
				return <EventPricingPage {...this.props} />;
			case (pathname === 'segmentation'):
				return <EventSegmentationPage {...this.props} />;
			case (pathname === 'notifications'):
				return <EventNotificationsPage {...this.props} />;
			case (pathname === 'registrations'):
				return <EventRegistrationsPage {...this.props} />;
			case (pathname === 'reports'):
				return <EventReportsPage {...this.props} />;
			default:
				// back to users list once routes not found				
				history.push('/events');
		}
	}

	render() {
		const { history, location } = this.props;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/events', content: 'Events', link: true, onClick: () => history.push('/events') },
			{ key: 'Detail', content: 'Detail', active: true }
		];
		const tabs = [
			{ title: 'Basic', path: `/basic?id=${query.id}` },
			{ title: 'Participant Form', path: `/participant-form?id=${query.id}` },
			{ title: 'Pricing', path: `/pricing?id=${query.id}` },
			{ title: 'Segmentation', path: `/segmentation?id=${query.id}` },
			{ title: 'Notifications', path: `/notifications?id=${query.id}` },
			{ title: 'Registrations', path: `/registrations?id=${query.id}` },
			{ title: 'Reports', path: `/reports?id=${query.id}` }
		];

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>
						<Icon
							className="icon-bold"
							name="arrow left"
							onClick={() => history.push('/events')}
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

export default EventDetailPage;