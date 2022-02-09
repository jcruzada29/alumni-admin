import React, { Component } from 'react';

import { withAlert } from 'react-alert';
import { Divider, Grid, Icon, Table } from 'semantic-ui-react';

import _ from 'lodash';
import moment from 'moment';
import UrlParse from 'url-parse';
import PropTypes from 'prop-types';

import Loading from '../../components/loading';
import { Pagination } from '../../components/pagination';

const ENTRY_PER_PAGE = 10;

class ParkingPrivilegeListPage extends Component {

	componentDidMount() {
		this.getParkingPrivileges();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta } = prevProps.parkingPrivilegesListPageProps;
		const { meta } = this.props.parkingPrivilegesListPageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};

			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}
	}

	getParkingPrivileges = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit
		} = opts || {};
		this.props.getParkingPrivileges({
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	onClickAddButton = () => {
		return this.props.navigateToAddPage();
	}
	onPageChange = (page, limit) => {
		return this.getParkingPrivileges({ page, limit });
	};

	renderTableBody = privileges => {
		if (_.isEmpty(privileges)) {
			return (
				<Table.Row>
					<Table.Cell colSpan={4}>No Parking Privileges</Table.Cell>
				</Table.Row>
			);
		} else {
			return privileges.map(privilege => {
				return (
					<Table.Row
						key={privilege.id}
						onClick={() => this.props.navigateToDetailPage({ privilege_id: privilege.id })}
					>
						<Table.Cell>{privilege.name}</Table.Cell>
						<Table.Cell>{
							`${moment(privilege.use_start_date).format("YYYY-MM-DD")} ~ 
							${moment(privilege.use_end_date).format("YYYY-MM-DD")}`}
						</Table.Cell>
						<Table.Cell>
							{privilege.num_usage}
						</Table.Cell>
						<Table.Cell>
							<center>
								<Icon
									link
									name="edit"
									size="large"
									onClick={() =>
										this.props.navigateToDetailPage({ privilege_id: privilege.id })
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
		const { parkingPrivilegesListPageProps } = this.props;
		const {
			parking_privileges,
			loading,
			total,
			page,
			limit
		} = parkingPrivilegesListPageProps;
		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0px 0px 20px' }}>
					<span>Privileges</span>
					<div className="component-buttons">
						<span onClick={() => this.onClickAddButton()}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Add Privilege
						</span>
					</div>
				</div>
				<Divider />
				<div className="bt-content-padded">
					<Grid>
						<Grid.Row>
							<Grid.Column>
								<React.Fragment>
									{loading && <Loading />}
									{!loading && (<Table singleLine>
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>Name</Table.HeaderCell>
												<Table.HeaderCell>Date Range</Table.HeaderCell>
												<Table.HeaderCell>Usage</Table.HeaderCell>
												<Table.HeaderCell><center>Actions</center></Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{this.renderTableBody(parking_privileges)}
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

ParkingPrivilegeListPage.propTypes = {
	parkingPrivilegesListPageProps: PropTypes.object.isRequired,
	getParkingPrivileges: PropTypes.func.isRequired,
	navigateToAddPage: PropTypes.func.isRequired,
	navigateToDetailPage: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default withAlert()(ParkingPrivilegeListPage);
