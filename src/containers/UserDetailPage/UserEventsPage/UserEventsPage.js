import React from 'react';
import { Grid, Table, Icon } from 'semantic-ui-react';
import UrlParse from 'url-parse';
import _ from 'lodash';
import Loading from '../../../components/loading';
import Pagination from '../../../components/pagination';

const ENTRY_PER_PAGE = 10;

class UserEventsPage extends React.Component {
	componentDidMount() {
		this.getEvents();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	getEvents = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit,
			id
		} = opts || {};
		this.props.getEventsByUser({
			user_id: id || query.id,
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	onPageChange = (page, limit) => {
		const { query } = UrlParse(this.props.location.search, true);
		return this.getEvents({ user_id: query.id, page, limit });
	};

	renderTableBody = (events = []) => {
		if (_.isEmpty(events) || events === null) {
			return (
				<Table.Row>
					<Table.Cell colSpan={4}>No Events Found</Table.Cell>
				</Table.Row>
			);
		}
		return events.map((event, index) => {
			return (
				<Table.Row
					key={index}
				>
					<Table.Cell>{event.event.name}</Table.Cell>
					<Table.Cell>{event.eventRegistration.status}</Table.Cell>
					<Table.Cell>{event.eventRegistration.payment_status}</Table.Cell>
					<Table.Cell>
						<Icon
							link
							name="edit"
							size="large"
						/>
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	render() {

		const { loading, events, page, limit, total } = this.props.userEventPageReducer;

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
											<Table.HeaderCell>Events</Table.HeaderCell>
											<Table.HeaderCell>Status</Table.HeaderCell>
											<Table.HeaderCell>Payment Status</Table.HeaderCell>
											<Table.HeaderCell>Actions</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										{this.renderTableBody(events)}
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

export default UserEventsPage;