import React, { Component } from 'react';
import { Icon, Divider, Breadcrumb } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import UrlParse from 'url-parse';
import Loading from '../../../components/loading';
import EventNotificationDetailForm from './components/EventNotificationDetailForm';

class EventNotificationDetailPage extends Component {
	componentDidMount() {
		const { query } = UrlParse(this.props.location.search, true);
		const { event_notification_id } = query;
		if (event_notification_id) {
			this.props.getEventNotificationById(event_notification_id);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta } = prevProps.eventNotificationDetailPageProps;
		const { meta } = this.props.eventNotificationDetailPageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};

			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}
	}

	componentWillUnmount() {
		this.props.reset();
	}

	onSubmit = data => {
		const { query } = UrlParse(this.props.location.search, true);
		const { id } = query;
		this.props.onSubmit({
			...data,
			event_id: id
		});
	}

	onSend = data => {
		const { query } = UrlParse(this.props.location.search, true);
		const { event_notification_id } = query;
		this.props.onSend(event_notification_id);
	}

	onSchedule = data => {
		const { query } = UrlParse(this.props.location.search, true);
		const { event_notification_id } = query;
		this.props.onSchedule(event_notification_id);
	}

	render() {
		const { eventNotificationDetailPageProps } = this.props;
		const { query } = UrlParse(this.props.location.search, true);
		const { id } = query;
		const { loading, loadingSubmit } = eventNotificationDetailPageProps;
		const sections = [
			{ key: '/events', content: 'Events', link: true, onClick: () => this.props.history.push('/events') },
			{ key: `/events/id/notifications?id=${id}`, content: 'Detail', onClick: () => this.props.history.push(`/events/id/notifications?id=${id}`) },
			{ key: '', content: 'Notification', active: true }
		];

		if (loading) {
			return (<Loading />);
		}

		return (
			<div>
				<React.Fragment>
					<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
						<div>
							<Icon
								className="icon-bold"
								name="arrow left"
								onClick={() => this.props.history.push(`/events/id/notifications?id=${id}`)}
							/>
							<Breadcrumb
								divider="/"
								sections={sections}
							/>
						</div>
					</div>
					<Divider />
				</React.Fragment>
				<EventNotificationDetailForm
					loadingSubmit={loadingSubmit}
					onSubmit={this.onSubmit}
					onSchedule={this.onSchedule}
					onSend={this.onSend}
				/>
			</div>
		);
	}
}

EventNotificationDetailPage.propTypes = {
	eventNotificationDetailPageProps: PropTypes.object.isRequired,
	getEventNotificationById: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onSchedule: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default compose(
	withAlert()
)(EventNotificationDetailPage);
