import React, { Component } from 'react';
import { Icon, Grid, Table, Divider, Input, Button } from 'semantic-ui-react';
import _ from 'lodash';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';

import { Pagination } from '../../components/pagination';
import Loading from '../../components/loading';

const ENTRY_PER_PAGE = 10;

class AdminsListPage extends Component {
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
		this.props.getAdmins({ page, limit, search });
	}

	componentWillUnmount() {
		this.props.reset();
	}

	handleSearchValue = v => this.setState({ searchValue: v.target.value });

	handleClickFilter = () => {
		const { searchValue } = this.state;
		this.props.getAdmins({ page: 1, limit: 10, search: searchValue });
	}

	onPageChange = (page, limit) => {
		return this.props.getAdmins({ page, limit });
	};

	renderTableBody = admins => {
		if (_.isEmpty(admins)) {
			return (
				<Table.Row>
					<Table.Cell colSpan={3}>No Admins found</Table.Cell>
				</Table.Row>
			);
		} else {
			return admins.map((admin, index) => {
				return (
					<Table.Row
						key={index}
						onClick={() => this.props.navigateToDetailPage({ admin_id: admin.id })}
					>
						<Table.Cell>{admin.id}</Table.Cell>
						<Table.Cell>{admin.email}</Table.Cell>
						<Table.Cell >
							<Icon
								link
								name="edit"
								size="large"
								onClick={() =>
									() => this.props.navigateToDetailPage({ admin_id: admin.id })
								}
							/>
						</Table.Cell>
					</Table.Row>
				);
			});
		}
	};

	render() {
		const { history } = this.props;
		const { admins, page, limit, total, loading } = this.props.adminListPageProps;
		const { searchValue } = this.state;

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>Admins</span>
					<div className="component-buttons">
						<span onClick={() => history.push('/admins/create')}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Add Admin
						</span>
					</div>
				</div>
				<Divider />
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px 20px 0px 20px' }}>
					<div style={{ flex: 1 }}>
						<Input
							fluid
							size="small"
							placeholder="Search with email, ITSC username"
							value={searchValue}
							onChange={(v) => this.handleSearchValue(v)}
						/>
					</div>
					<div style={{ marginLeft: '15px' }}>
						<Button
							primary
							onClick={this.handleClickFilter}
						>Filter</Button>
					</div>
				</div>
				<div className="bt-content-padded">
					<Grid>
						<Grid.Row>
							<Grid.Column width={16}>
								<React.Fragment>
									{loading && <Loading />}
									{!loading && (<Table singleLine>
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>ITSC Username</Table.HeaderCell>
												<Table.HeaderCell>Email</Table.HeaderCell>
												<Table.HeaderCell>Actions</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{this.renderTableBody(admins)}
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

AdminsListPage.propTypes = {
	adminListPageProps: PropTypes.object.isRequired,
	getAdmins: PropTypes.func.isRequired,
	navigateToDetailPage: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default withAlert()(AdminsListPage);