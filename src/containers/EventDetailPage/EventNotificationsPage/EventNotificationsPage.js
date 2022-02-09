import React, { Component } from 'react';
import _ from 'lodash';
import { Icon, Table } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import UrlParse from 'url-parse';
import { Pagination } from '../../../components/pagination';
import Loading from '../../../components/loading';
import LabelHelper from '../../../helpers/Label';

const ENTRY_PER_PAGE = 10;

class EventNotificationsPage extends Component {
	componentDidMount() {
		this.getEventNotifications();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta } = prevProps.eventNotificationsPageProps;
		const { meta } = this.props.eventNotificationsPageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};

			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}
	}

	getEventNotifications = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit
		} = opts || {};
		this.props.getEventNotifications({
			event_id: query.id,
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	onPageChange = (page, limit) => {
		return this.getEventNotifications({ page, limit });
	};

	renderTableBody = event_notifications => {
		const { query } = UrlParse(this.props.location.search, true);
		const { id: event_id } = query;
		if (_.isEmpty(event_notifications)) {
			return (
				<Table.Row>
					<Table.Cell>No Notifications</Table.Cell>
				</Table.Row>
			);
		} else {
			return event_notifications.map(event_notification => {
				return (
					<Table.Row
						key={event_notification.id}
						onClick={() => this.props.history.push(`/events/id/notifications/detail?id=${event_id}&event_notification_id=${event_notification.id}`) }
					>
						<Table.Cell>{event_notification.name}</Table.Cell>
						<Table.Cell>{LabelHelper.notificationStatus(event_notification.status)}</Table.Cell>
						<Table.Cell>
							<Icon
								link
								name="pencil alternate"
								size="large"
								onClick={() => this.props.history.push(`/events/id/notifications/detail?id=${event_id}&event_notification_id=${event_notification.id}`) }
							/>
						</Table.Cell>
					</Table.Row>
				);
			});
		}
	};

	render() {
		const { eventNotificationsPageProps } = this.props;
		const {
			event_notifications,
			loading,
			total,
			page,
			limit
		} = eventNotificationsPageProps;
		const { query } = UrlParse(this.props.location.search, true);
		const { id } = query;

		return (
			<div className="bt-content-padded">
				<div style={{ display: 'flex', justifyContent: 'flex-end', fontWeight: 'bold' }}>
					<div className="component-buttons">
						<span onClick={() => this.props.history.push(`/events/id/notifications/create?id=${id}`)}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Create Notification
						</span>
					</div>
				</div>
				{loading && <Loading />}
				{!loading && (
					<React.Fragment>
						<Table striped>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell width={12}>Name</Table.HeaderCell>
									<Table.HeaderCell width={2}>Status</Table.HeaderCell>
									<Table.HeaderCell width={2}>Actions</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>{this.renderTableBody(event_notifications)}</Table.Body>
						</Table>
						<Pagination
							page={page}
							limit={limit}
							total={total}
							options={[ENTRY_PER_PAGE]}
							onPageChange={this.onPageChange}
						/>
					</React.Fragment>
				)}
			</div>
		);
	}
}

EventNotificationsPage.propTypes = {
	eventNotificationsPageProps: PropTypes.object.isRequired,
	getEventNotifications: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default withAlert()(EventNotificationsPage);
