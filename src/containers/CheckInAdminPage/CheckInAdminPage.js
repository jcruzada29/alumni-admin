import React, { Component } from 'react';

import { withAlert } from 'react-alert';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Divider, Grid, Icon, Table } from 'semantic-ui-react';

import _ from 'lodash';
import UrlParse from 'url-parse';
import PropTypes from 'prop-types';

import Loading from '../../components/loading';
import { Pagination } from '../../components/pagination';
import CheckInAdminModal from './components/CheckInAdminModal';

const ENTRY_PER_PAGE = 10;

class CheckInAdminPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openFormModal: false
		};
	}

	componentWillUnmount() {
		this.props.resetPage();
	}

	componentDidMount() {
		const { query } = UrlParse(this.props.location.search, true);
		const { page, limit } = query;
		this.getCheckInAdmins({ page, limit });
	}
	componentDidUpdate(prevProps, prevState) {
		const {
			meta: prevMeta,
			loadingSubmit: prevLoadingSubmit,
			form: prevForm
		} = prevProps.checkInAdminPageProps;
		const { meta, loadingSubmit, form } = this.props.checkInAdminPageProps;
		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			if (meta.code === 200) {
				this.toggleModal();
			}
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}
		if (loadingSubmit && loadingSubmit !== prevLoadingSubmit) {
			const { query } = UrlParse(this.props.location.search, true);
			const { page, limit } = query;
			setTimeout(() => this.getCheckInAdmins({ page, limit }), 100);
		}
		if (!_.isEqual(form, prevForm)) {
			this.props.updateForm();
		}
	}

	getCheckInAdmins = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit
		} = opts || {};

		this.props.getCheckInAdmins({
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	onPageChange = (page, limit) => {
		return this.getCheckInAdmins({ page, limit });
	};

	toggleModal = () => {
		this.setState({ openFormModal: !this.state.openFormModal });
	}

	handleClickAdd = () => {
		this.toggleModal();
		this.props.emptyForm();
	}

	handleToggleUpdate = (id) => {
		this.toggleModal();
		this.props.getCheckInAdminById({ id });
	}

	renderModal = () => {
		const { openFormModal } = this.state;
		const options = [
			{ key: 1, text: 'Yes', value: 1 },
			{ key: 2, text: 'No', value: 0 }
		];
		const { checkInAdminPageProps } = this.props;
		const { loadingSubmit } = checkInAdminPageProps;
		return (
			<div>
				<CheckInAdminModal
					{...this.props}
					options={options}
					loadingSubmit={loadingSubmit}
					openFormModal={openFormModal}
					toggleModal={this.toggleModal}
				/>
			</div>
		);
	}

	renderTableBody = checkins => {
		if (_.isEmpty(checkins)) {
			return (
				<Table.Row>
					<Table.Cell colSpan={4}>No Check-in Admins</Table.Cell>
				</Table.Row>
			);
		}
		return (
			checkins.map(row =>
				(
					<Table.Row
						key={row.id}
						onClick={() =>
							this.handleToggleUpdate(row.id)
						}
					>
						<Table.Cell>{row.name}</Table.Cell>
						<Table.Cell>{row.email}</Table.Cell>
						<Table.Cell>
							<Icon
								color={row.enabled ? "teal" : "red"}
								name="circle"
								size="small"
							/>{row.enabled ? "Enabled" : "Disabled"}</Table.Cell>
						<Table.Cell>
							<Icon
								link
								name="edit"
								size="large"
								onClick={() =>
									this.handleToggleUpdate(row.id)
								}
							/>
						</Table.Cell>
					</Table.Row>
				)
			)
		);
	};

	render() {
		const { checkInAdminPageProps } = this.props;
		const { loading, page, limit, total, checkInAdmins } = checkInAdminPageProps;
		return (
			<div>
				{this.renderModal()}
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>Check-in App Admin</span>
					<div className="component-buttons">
						<span onClick={this.handleClickAdd}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Create Admin
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
													<Table.HeaderCell>ITSC Email</Table.HeaderCell>
													<Table.HeaderCell>Status</Table.HeaderCell>
													<Table.HeaderCell>Actions</Table.HeaderCell>
												</Table.Row>
											</Table.Header>
											<Table.Body>
												{this.renderTableBody(checkInAdmins)}
											</Table.Body>
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



CheckInAdminPage.propTypes = {
	checkInAdminPageProps: PropTypes.object.isRequired,
	getCheckInAdmins: PropTypes.func.isRequired,
	getCheckInAdminById: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	resetPage: PropTypes.func.isRequired
};

CheckInAdminPage = connect(
	state => {
		return ({
			initialValues: state.checkInAdminPageReducer.form
		});
	}
)(CheckInAdminPage);

export default compose(
	withAlert(),
	reduxForm({
		form: 'CheckInAdminPage'
	})
)(CheckInAdminPage);
