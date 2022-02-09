import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Icon, Grid, Table, Divider } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import UrlParse from 'url-parse';
import { Pagination } from '../../components/pagination';
import Loading from '../../components/loading';
import LabelHelper from '../../helpers/Label';

const ENTRY_PER_PAGE = 10;
// const DEFAULT_OPTIONS = {
// 	limit: ENTRY_PER_PAGE,
// 	page: 1
// };

class MeetingsListPage extends Component {
	componentDidMount() {
		this.getEvents();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta } = prevProps.eventsListPageProps;
		const { meta } = this.props.eventsListPageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};

			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}
	}

	getEvents = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit
		} = opts || {};
		this.props.getEvents({
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	// onSearch = () => {
	// 	this.getBookings({
	// 		page: DEFAULT_OPTIONS.page,
	// 		limit: DEFAULT_OPTIONS.limit,
	// 		type: this.state.type,
	// 		room_id: this.state.room_id,
	// 		search_email: this.state.search_email,
	// 		search_date_range: this.state.search_date_range,
	// 		music_performance_type_id: this.state.music_performance_type_id,
	// 		search_music_performer: this.state.search_music_performer
	// 	});
	// };

	onPageChange = (page, limit) => {
		return this.getEvents({ page, limit });
	};

	onClickItem = ({ bookingFormId, bookingId }) => {
		return this.props.navigateToDetailsPage({ bookingFormId, bookingId });
	};

	onClickAddButton = () => {
		return this.props.navigateToAddPage();
	};

	renderTableBody = events => {
		if (_.isEmpty(events)) {
			return (
				<Table.Row>
					<Table.Cell colSpan={6}>No Events</Table.Cell>
				</Table.Row>
			);
		} else {
			return events.map(event => {
				return (
					<Table.Row
						key={event.id}
						onClick={() => this.props.navigateToDetailPage({ event_id: event.id })}
					>
						<Table.Cell>{event.name}</Table.Cell>
						<Table.Cell>{LabelHelper.eventType(event.type)}</Table.Cell>
						<Table.Cell>{moment(event.publish_start_date).format('LLLL')}</Table.Cell>
						<Table.Cell>{moment(event.publish_end_date).format('LLLL')}</Table.Cell>
						<Table.Cell>
							<Icon
								color={!!event.is_published ? "teal" : "red"}
								name="circle"
								size="small"
							/>
							{LabelHelper.eventPublishStatus(!!event.is_published ? 'published' : 'unpublished')}
						</Table.Cell>
						<Table.Cell>
							<center>
								<Icon
									link
									name="edit"
									size="large"
									onClick={() =>
										this.props.navigateToDetailPage({ event_id: event.id })
									}
								/>
							</center>
						</Table.Cell>
					</Table.Row>
				);
			});
		}
	};

	render() {
		const { eventsListPageProps } = this.props;
		const {
			events,
			loading,
			total,
			page,
			limit
		} = eventsListPageProps;

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>Events</span>
					<div className="component-buttons">
						<span onClick={() => this.onClickAddButton()}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Create Event
						</span>
					</div>
				</div>
				<Divider />
				<div className="bt-content-padded">
					<Grid>
						<Grid.Row>
							<Grid.Column width={16}>
								{loading && <Loading />}
								{!loading && (
									<React.Fragment>
										<Table striped>
											<Table.Header>
												<Table.Row>
													<Table.HeaderCell>Name</Table.HeaderCell>
													<Table.HeaderCell>Type</Table.HeaderCell>
													<Table.HeaderCell>Start At</Table.HeaderCell>
													<Table.HeaderCell>End At</Table.HeaderCell>
													<Table.HeaderCell>Status</Table.HeaderCell>
													<Table.HeaderCell><center>Actions</center></Table.HeaderCell>
												</Table.Row>
											</Table.Header>
											<Table.Body>{this.renderTableBody(events)}</Table.Body>
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
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		);
	}
}

MeetingsListPage.propTypes = {
	eventsListPageProps: PropTypes.object.isRequired,
	getEvents: PropTypes.func.isRequired,
	navigateToAddPage: PropTypes.func.isRequired,
	navigateToDetailPage: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default withAlert()(MeetingsListPage);
