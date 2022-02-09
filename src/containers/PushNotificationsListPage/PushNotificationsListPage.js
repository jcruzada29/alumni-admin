import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Icon, Grid, Table, Divider } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import { Pagination } from '../../components/pagination';
import Loading from '../../components/loading';

const ENTRY_PER_PAGE = 10;
// const DEFAULT_OPTIONS = {
// 	limit: ENTRY_PER_PAGE,
// 	page: 1
// };

class PushNotificationsListPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchValue: ''
		};
	}

	componentDidMount() {
		const page = 1;
		const limit = 10;
		const search = '';
		this.props.getPushNotifications({ page, limit, search });
	}

	componentWillUnmount() {
		this.props.resetPage();
	}

	renderStatus = status => {
		const published = <div style={{ display: 'flex', alignItems: 'center' }}>
			<div style={{ height: 7, width: 7, borderRadius: 7 / 2, backgroundColor: 'green', marginRight: 10 }} ></div>
			<div> Published</div>
		</div>;
		const unpublished = <div style={{ display: 'flex', alignItems: 'center' }}>
			<div style={{ height: 7, width: 7, borderRadius: 7 / 2, backgroundColor: 'red', marginRight: 10 }} ></div>
			<div> Unpublished</div>
		</div>;
		switch (status) {
			case 1:
				return published;
			case 0:
				return unpublished;
			default:
				break;
		}
	}

	renderTableBody = push_notifications => {
		const { history } = this.props;
		if (_.isEmpty(push_notifications)) {
			return (
				<Table.Row>
					<Table.Cell colSpan={6}>No Push Notifications found</Table.Cell>
				</Table.Row>
			);
		} else {
			return push_notifications.map(push_notification => {
				return (
					<Table.Row
						key={push_notification.id}
						onClick={() => history.push(`/push-notifications/id/basic?id=${push_notification.id}`)}
					>
						<Table.Cell>{push_notification.name}</Table.Cell>
						<Table.Cell>{push_notification.type}</Table.Cell>
						<Table.Cell>{moment(push_notification.delivery_date).format('YYYY-MM-DD')}</Table.Cell>
						<Table.Cell>{push_notification.status}</Table.Cell>
						<Table.Cell>
							<center>
								<Icon
									link
									name="edit"
									size="large"
									onClick={() =>
										this.props.history.push(`/push_notifications/id/basic?id=${push_notification.id}`)
									}
								/>
							</center>
						</Table.Cell>
					</Table.Row>
				);
			});
		}
	};

	handleSearchValue = v => this.setState({ searchValue: v.target.value });

	handleClickFilter = () => {
		const { searchValue } = this.state;
		this.props.getPushNotifications({ search: searchValue });
	}

	onPageChange = (page, limit) => {
		return this.props.getPushNotifications({ page, limit });
	};

	render() {
		const { history } = this.props;
		const { push_notifications, page, limit, total, loading } = this.props.pushNotificationsPageReducer;

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>Push Notifications</span>
					<div className="component-buttons">
						<span onClick={() => history.push('/push-notifications/create')}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Add Push Notification
						</span>
					</div>
				</div>
				<Divider />
				<div className="bt-content-padded">
					<Grid>
						<Grid.Row>
							<Grid.Column width={16}>
								<React.Fragment>
									{loading && <Loading />}
									{!loading && (<Table singleLine>
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>Name</Table.HeaderCell>
												<Table.HeaderCell>Type</Table.HeaderCell>
												<Table.HeaderCell>Scheduled Delivery Date</Table.HeaderCell>
												<Table.HeaderCell>Status</Table.HeaderCell>
												<Table.HeaderCell>Actions</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{this.renderTableBody(push_notifications)}
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
			</div>
		);
	}
}

export default withAlert()(PushNotificationsListPage);
