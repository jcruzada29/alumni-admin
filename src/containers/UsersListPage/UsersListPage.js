import React, { Component } from 'react';
import { Icon, Grid, Table, Divider, Input, Button } from 'semantic-ui-react';
import _ from 'lodash';
import UrlParse from 'url-parse';
import { Pagination } from '../../components/pagination';
import Loading from '../../components/loading';

const ENTRY_PER_PAGE = 10;

class UsersListPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchValue: ''
		};
	}

	componentDidMount() {
		const { query } = UrlParse(this.props.location.search, true);
		const { page, limit } = query;
		const search = '';
		this.getUsers({ page, limit, search });
	}

	componentWillUnmount() {
		this.props.resetPage();
	}

	handleSearchValue = v => {
		this.setState({ searchValue: v.target.value });
	}

	handleClickFilter = () => {
		const { searchValue } = this.state;
		this.getUsers({ search: searchValue });
	}

	getUsers = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const { page, limit, search } = opts || {};
		this.props.getUsers({
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE,
			search
		});
	};

	onPageChange = (page, limit) => {
		return this.getUsers({ page, limit });
	};
	
	renderTableBody = users => {
		if (_.isEmpty(users)) {
			return (
				<Table.Row>
					<Table.Cell>No User Found</Table.Cell>
					<Table.Cell></Table.Cell>
					<Table.Cell></Table.Cell>
					<Table.Cell></Table.Cell>
					<Table.Cell></Table.Cell>
				</Table.Row>
			);
		}
		return users.map((user, index) => {
			return (
				<Table.Row
					key={index}
					onClick={() =>
						this.props.history.push(`/users/id/basic?id=${user.emplid}`)
					}
				>
					<Table.Cell>{`${user.first_name} ${user.last_name}`}</Table.Cell>
					<Table.Cell>{user.zr_email_srch.split('|')[0]}</Table.Cell>
					<Table.Cell>{user.emplid}</Table.Cell>
					<Table.Cell>{user.zr_plan_descr}</Table.Cell>
					<Table.Cell>
						<Icon
							link
							name="edit"
							size="large"
							onClick={() =>
								this.props.history.push(`/users/id/basic?id=${user.id}`)
							}
						/>
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	render() {
		const { users, page, limit, total, loading } = this.props.UsersListPageReducer;
		const { searchValue } = this.state;

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>Alumni</span>
				</div>
				<Divider />
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px 20px 0px 20px' }}>
					<div style={{ flex: 1 }}>
						<Input
							fluid
							size="small"
							placeholder="Search with Alumni Student ID, Email and Name"
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
												<Table.HeaderCell>Name</Table.HeaderCell>
												<Table.HeaderCell>ITSC Email</Table.HeaderCell>
												<Table.HeaderCell>Student ID</Table.HeaderCell>
												<Table.HeaderCell>Degree</Table.HeaderCell>
												<Table.HeaderCell>Actions</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{this.renderTableBody(users)}
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

export default UsersListPage;