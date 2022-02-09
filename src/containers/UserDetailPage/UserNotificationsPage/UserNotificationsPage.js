import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
import UrlParse from 'url-parse';
import _ from 'lodash';
import Loading from '../../../components/loading';
import Pagination from '../../../components/pagination';

const ENTRY_PER_PAGE = 10;

class UserNotificationsPage extends React.Component {
	componentDidMount() {
		this.getNotificationsByUser();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	getNotificationsByUser = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit,
			id
		} = opts || {};
		this.props.getNotificationsByUser({
			user_id: id || query.id,
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	onPageChange = (page, limit) => {
		const { query } = UrlParse(this.props.location.search, true);
		return this.getNotificationsByUser({ user_id: query.id, page, limit });
	};

	renderTableBody = (notifications = []) => {
		if (_.isEmpty(notifications) || notifications === null) {
			return (
				<Table.Row>
					<Table.Cell colSpan={4}>No Notification Found</Table.Cell>
				</Table.Row>
			);
		}
		return notifications.map((notification, index) => {
			return (
				<Table.Row
					key={index}
				>
					<Table.Cell>{notification.name}</Table.Cell>
					<Table.Cell>{notification.type}</Table.Cell>
					<Table.Cell>{notification.status}</Table.Cell>
				</Table.Row>
			);
		});
	};

	render() {

		const { loading, notifications, page, limit, total } = this.props.userNotificationPageReducer;

		return (
			<div>
				<Grid>
					<Grid.Row>
						<Grid.Column width={16}>
							<React.Fragment>
								{loading && <Loading />}
								{!loading && (<Table singleLine>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Notification</Table.HeaderCell>
											<Table.HeaderCell>Type</Table.HeaderCell>
											<Table.HeaderCell>Status</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										{this.renderTableBody(notifications)}
									</Table.Body>
								</Table>)}
								<Pagination
									page={page}
									limit={limit}
									total={total}
									options={[ENTRY_PER_PAGE]}
									onPageChange={this.onPageChange}
								/>
							</React.Fragment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default UserNotificationsPage;