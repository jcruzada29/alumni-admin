import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Icon, Grid, Table, Form, Input, Button } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import { compose } from 'redux';
import UrlParse from 'url-parse';
import { Pagination } from '../../../components/pagination';
import Loading from '../../../components/loading';
import LabelHelper from './../../../helpers/Label';
import EventRegistrationDetail from './components/EventRegistrationDetail';

const ENTRY_PER_PAGE = 10;
class EventRegistrationsPage extends Component {
	state = {
		openDetailModal: false,
		searchValue: ''
	};

	componentDidMount() {
		this.getEventRegistrations();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	componentDidUpdate(prevProps, prevState) {
		const {
			meta: prevMeta
		} = prevProps.pageProps;
		const {
			meta
		} = this.props.pageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}
	}

	handleClickFilter = (e) => {
		e.preventDefault();
		const { searchValue } = this.state;
		this.getEventRegistrations({ search: searchValue });
	}

	getEventRegistrations = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit,
			search
		} = opts || {};
		this.props.getEventRegistrations({
			event_id: query.id,
			page: page || query.page || 1,
			search,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	handleSearchValue = v => {
		this.setState({ searchValue: v.target.value });
	}

	onPageChange = (page, limit) => {
		return this.getEventRegistrations({ page, limit });
	};

	onClickAddButton = () => {
		return this.props.navigateToAddPage();
	};

	onOpenDetailPage = ({ registration_id }) => {

		this.props.getEventRegistrationById(registration_id);
		this.setState({
			openDetailModal: true
		});
	}

	renderTableBody = data => {
		if (_.isEmpty(data)) {
			return (
				<Table.Row>
					<Table.Cell colSpan={6}>No Registration</Table.Cell>
				</Table.Row>
			);
		} else {
			return data.map(item => {
				const { id, participants, status, payment_status, leader } = item;
				return (
					<Table.Row
						key={id}
						onClick={() => this.onOpenDetailPage({ registration_id: id })}
					>
						<Table.Cell>{`${_.get(leader, 'first_name', '')} ${_.get(leader, 'last_name')}`}</Table.Cell>
						<Table.Cell>{participants.length}</Table.Cell>
						<Table.Cell textAlign="right">{LabelHelper.eventStatus(status)}</Table.Cell>
						<Table.Cell textAlign="right">{LabelHelper.paymentStatus(payment_status)}</Table.Cell>
						<Table.Cell textAlign="right">
							<Icon
								link
								name="edit"
								size="large"
								onClick={() => this.onOpenDetailPage({ registration_id: id })}
							/>
						</Table.Cell>
					</Table.Row>
				);
			});
		}
	};

	render() {
		const { searchValue, openDetailModal } = this.state;
		const { pageProps } = this.props;
		const {
			event_registrations,
			loading,
			selected_event_registration,
			isSuccess,
			loadingSubmit,
			loadingDetailPage,
			total,
			page,
			limit
		} = pageProps;

		return (
			<div>
				<div className="bt-content-padded">
					<Form
						onSubmit={() => this.handleClickFilter}
					>
						<Form.Group>
							<Form.Input
								width={15}
								placeholder="Search with Alumni Student ID"
								value={searchValue}
								onChange={(v) => this.handleSearchValue(v)}
							/>
							<Button
								primary
								onClick={this.handleClickFilter}
							>
								Filter
							</Button>
						</Form.Group>
					</Form>
				</div>
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
													<Table.HeaderCell>Registrant (Group Leader)</Table.HeaderCell>
													<Table.HeaderCell>Registrants</Table.HeaderCell>
													<Table.HeaderCell textAlign="right">Status</Table.HeaderCell>
													<Table.HeaderCell textAlign="right">Payment Status</Table.HeaderCell>
													<Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
												</Table.Row>
											</Table.Header>
											<Table.Body>{this.renderTableBody(event_registrations)}</Table.Body>
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
				{/* Detail Page Modal */}
				{/* openFormModal,
				onCloseModal,
				loadingDetailPage,
				loadingMarkAsPaid */}
				<EventRegistrationDetail
					openDetailModal={openDetailModal}
					loadingDetailPage={loadingDetailPage}
					selected_event_registration={selected_event_registration}
					loadingSubmit={loadingSubmit}
					isSuccess={isSuccess}
					pageProps={pageProps}
					updateTransactionById={this.props.updateTransactionById}
					getEventRegistrationById={this.props.getEventRegistrationById}
					onCloseModal={ () => this.setState({ openDetailModal: false })}
				/>
			</div>
		);
	}
}

export default compose(
	withAlert(),
)(EventRegistrationsPage);