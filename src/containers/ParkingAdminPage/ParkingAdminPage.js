import React, { Component } from 'react';

import { withAlert } from 'react-alert';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Divider, Grid, Icon, Table } from 'semantic-ui-react';

import _ from 'lodash';
import UrlParse from 'url-parse';

import Loading from '../../components/loading';
import { Pagination } from '../../components/pagination';
import ParkingAdminModal from './components/ParkingAdminModal';

const ENTRY_PER_PAGE = 10;

class ParkingAdminPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openFormModal: false
		};
	}

	componentDidMount() {
		const { query } = UrlParse(this.props.location.search, true);
		const { page, limit } = query;
		this.getParkingAdmins({ page, limit });
	}

	componentDidUpdate(prevProps, prevState) {
		const {
			meta: prevMeta,
			loadingSubmit: prevLoadingSubmit,
			form: prevForm
		} = prevProps.parkingAdminPageProps;
		const {
			meta, loadingSubmit, form
		} = this.props.parkingAdminPageProps;

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
			setTimeout(() => this.getParkingAdmins({ page, limit }), 100);
		}

		if (!_.isEqual(form, prevForm)) {
			this.props.updateForm();
		}
	}

	getParkingAdmins = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit
		} = opts || {};

		this.props.getParkingAdmins({
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	onPageChange = (page, limit) => {
		return this.getParkingAdmins({ page, limit });
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
		this.props.getParkingAdminById({ id });
	}

	renderModal = () => {
		const { openFormModal } = this.state;
		const options = [
			{ key: 1, text: 'Yes', value: 1 },
			{ key: 2, text: 'No', value: 0 }
		];
		const { parkingAdminPageProps } = this.props;
		const { loadingSubmit } = parkingAdminPageProps;
		return (
			<div>
				<ParkingAdminModal
					{...this.props}
					options={options}
					loadingSubmit={loadingSubmit}
					openFormModal={openFormModal}
					toggleModal={this.toggleModal}
				/>
			</div>
		);
	}

	renderTableBody = parking_admins => {
		if (_.isEmpty(parking_admins)) {
			return (
				<Table.Row>
					<Table.Cell colSpan={4}>No Parking Admins</Table.Cell>
				</Table.Row>
			);
		}
		return (
			parking_admins.map(row =>
				(
					<Table.Row
						key={row.id}
						onClick={() =>
							this.handleToggleUpdate(row.id)
						}
					>
						<Table.Cell>{row.name}</Table.Cell>
						<Table.Cell>{row.username}</Table.Cell>
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
		const { parkingAdminPageProps } = this.props;
		const { loading, page, limit, total, parkingAdmins } = parkingAdminPageProps;
		return (
			<div>
				{this.renderModal()}
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>Parking App Admins</span>
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
													<Table.HeaderCell>Username</Table.HeaderCell>
													<Table.HeaderCell>Status</Table.HeaderCell>
													<Table.HeaderCell>Actions</Table.HeaderCell>
												</Table.Row>
											</Table.Header>
											<Table.Body>
												{this.renderTableBody(parkingAdmins)}
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

ParkingAdminPage = connect(
	state => {
		return ({
			initialValues: state.parkingAdminPageReducer.form
		});
	}
)(ParkingAdminPage);

export default compose(
	withAlert(),
	reduxForm({
		form: 'ParkingAdminPage'
	})
)(ParkingAdminPage);
