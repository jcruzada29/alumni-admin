import React, { Component } from 'react';
import _ from 'lodash';
import UrlParse from 'url-parse';
import { Icon, Grid, Table, Form, Button, Divider, Label } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import LabelHelper from '../../helpers/Label';
import { Pagination } from '../../components/pagination';
import Loading from '../../components/loading';
import OptionHelper from '../../helpers/Option';
import { renderDateRange, renderFormSelect } from '../../helpers/redux_form';
import ReportDetailPage from '../EventsPage/EventDetailPage';

const ENTRY_PER_PAGE = 10;

class EventsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openReportDetailModal: false
		};
	}

	componentWillUnmount() {
		// this.props.resetPage();
	}

	componentDidMount() {
		// const { query } = UrlParse(this.props.location.search, true);
		// const { inspector_user_id, restaurant_id, date_range, status, report_id } = query;

		// // check search query here if there is id query : /reports?report_id=xxxxx, so the modal/report detal page will show.
		// if (report_id) {
		// 	this.onReportModalHandle();
		// }

		// this.props.initialize({ inspector_user_id, restaurant_id, date_range, status });
		// this.getReports({ inspector_user_id, restaurant_id, date_range, status });
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta } = prevProps.reportsPageProps;
		const { meta } = this.props.reportsPageProps;
		const { query } = UrlParse(this.props.location.search, true);
		const { query: prev_query } = UrlParse(prevProps.location.search, true);
		if (query && query.report_id && query.report_id !== prev_query.report_id) {
			// this.setState({ openReportDetailModal: true })
			this.onReportModalHandle();
		}
		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}
	}

	onReportModalHandle = () => {
		this.setState({ openReportDetailModal: !this.state.openReportDetailModal });
		if (this.state.openReportDetailModal) {
			this.props.history.push(`reports`);
		}
	};


	onPageChange = (page, limit) => {
		return this.getReports({ page, limit });
	};

	renderTableBody = reports => {
		// if (_.isEmpty(reports)) {
		// 	return (
		// 		<Table.Row>
		// 			<Table.Cell>No Events</Table.Cell>
		// 		</Table.Row>
		// 	);
		// }
		return (
			<Table.Row
				onClick={() =>
					this.props.history.push(`/events/id/basic?id=12345`)
				}
			>
				<Table.Cell>Event F</Table.Cell>
				<Table.Cell>Internal</Table.Cell>
				<Table.Cell>01/09/2019</Table.Cell>
				<Table.Cell>30/11/2019</Table.Cell>
				<Table.Cell>Published</Table.Cell>
				<Table.Cell>
					<Icon
						link
						name="edit"
						size="large"
						onClick={() =>
							this.props.history.push(`/events/id/basic?id=12345`)
						}
					/>
				</Table.Cell>
			</Table.Row>
		)
	};

	getReports = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit,
			inspector_user_id,
			restaurant_id,
			date_range,
			status
		} = opts || {};

		this.props.getReports({
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE,
			inspector_user_id: inspector_user_id || '',
			restaurant_id: restaurant_id || '',
			date_range: date_range || '',
			status: status || ''
		});
	};

	render() {
		const { eventsPageProps } = this.props;
		const { loading, events } = eventsPageProps;
		return (
			<div>
				{this.state.openReportDetailModal
					&&
					<ReportDetailPage
						onReportModalHandle={this.onReportModalHandle}
						openReportDetailModal={this.state.openReportDetailModal}
						{...this.props}
					/>
				}
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>Events</span>
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
													<Table.HeaderCell>Actions</Table.HeaderCell>
												</Table.Row>
											</Table.Header>
											<Table.Body>
												{this.renderTableBody(events)}
											</Table.Body>
										</Table>
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

EventsPage.propTypes = {
	resetMeta: PropTypes.func.isRequired,
	resetPage: PropTypes.func.isRequired
};

export default compose(
	withAlert(),
	reduxForm({
		form: 'EventsPage'
	})
)(EventsPage);