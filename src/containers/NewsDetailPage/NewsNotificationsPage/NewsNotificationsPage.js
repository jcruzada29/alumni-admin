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

class NewsNotificationsPage extends Component {
	componentDidMount() {
		this.getNewsNotifications();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta } = prevProps.newsNotificationsPageProps;
		const { meta } = this.props.newsNotificationsPageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};

			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}
	}

	getNewsNotifications = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit
		} = opts || {};
		this.props.getNewsNotifications({
			news_id: query.id,
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	onPageChange = (page, limit) => {
		return this.getNewsNotifications({ page, limit });
	};

	renderTableBody = news_notifications => {
		const { query } = UrlParse(this.props.location.search, true);
		const { id: news_id } = query;
		if (_.isEmpty(news_notifications)) {
			return (
				<Table.Row>
					<Table.Cell>No Notifications</Table.Cell>
				</Table.Row>
			);
		} else {
			return news_notifications.map(news_notification => {
				return (
					<Table.Row
						key={news_notification.id}
						onClick={() => this.props.history.push(`/news/id/notifications/detail?id=${news_id}&news_notification_id=${news_notification.id}`) }
					>
						<Table.Cell>{news_notification.name}</Table.Cell>
						<Table.Cell>{LabelHelper.notificationStatus(news_notification.status)}</Table.Cell>
						<Table.Cell>
							<Icon
								link
								name="pencil alternate"
								size="large"
								onClick={() => this.props.history.push(`/news/id/notifications/detail?id=${news_id}&news_notification_id=${news_notification.id}`) }
							/>
						</Table.Cell>
					</Table.Row>
				);
			});
		}
	};

	render() {
		const { newsNotificationsPageProps } = this.props;
		const {
			news_notifications,
			loading,
			total,
			page,
			limit
		} = newsNotificationsPageProps;
		const { query } = UrlParse(this.props.location.search, true);
		const { id } = query;

		return (
			<div className="bt-content-padded">
				<div style={{ display: 'flex', justifyContent: 'flex-end', fontWeight: 'bold' }}>
					<div className="component-buttons">
						<span onClick={() => this.props.history.push(`/news/id/notifications/create?id=${id}`)}>
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
							<Table.Body>{this.renderTableBody(news_notifications)}</Table.Body>
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

NewsNotificationsPage.propTypes = {
	newsNotificationsPageProps: PropTypes.object.isRequired,
	getNewsNotifications: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default withAlert()(NewsNotificationsPage);
