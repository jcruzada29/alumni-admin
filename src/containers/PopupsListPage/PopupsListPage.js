import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Icon, Grid, Table, Divider, Input, Button } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import { Pagination } from '../../components/pagination';
import Loading from '../../components/loading';

const ENTRY_PER_PAGE = 10;
// const DEFAULT_OPTIONS = {
// 	limit: ENTRY_PER_PAGE,
// 	page: 1
// };

class PopupsListPage extends Component {

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
		this.props.getPopups({ page, limit, search });
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

	renderTableBody = popups => {
		const { history } = this.props;
		if (_.isEmpty(popups)) {
			return (
				<Table.Row>
					<Table.Cell colSpan={6}>No Popups found</Table.Cell>
				</Table.Row>
			);
		} else {
			return popups.map(popup => {
				const publish_date_range = `${moment(popup.publish_start_date).format('YYYY-MM-DD')} - ${moment(popup.publish_end_date).format('YYYY-MM-DD')}`;
				return (
					<Table.Row
						key={popup.id}
						onClick={() => history.push(`/popups/id/basic?id=${popup.id}`)}
					>
						<Table.Cell>{popup.title}</Table.Cell>
						<Table.Cell>{publish_date_range}</Table.Cell>
						<Table.Cell>{this.renderStatus(popup.is_published)}</Table.Cell>
						<Table.Cell>
							<center>
								<Icon
									link
									name="edit"
									size="large"
									onClick={() =>
										this.props.history.push(`/popups/id/basic?id=${popup.id}`)
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
		this.props.getPopups({ search: searchValue });
	}

	onPageChange = (page, limit) => {
		return this.props.getPopups({ page, limit });
	};

	render() {
		const { history } = this.props;
		const { popups, page, limit, total, loading } = this.props.popupsListPageReducer;
		const { searchValue } = this.state;

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>Popups</span>
					<div className="component-buttons">
						<span onClick={() => history.push('/popups/create')}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Add Popup
						</span>
					</div>
				</div>
				<Divider />
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px 20px 0px 20px' }}>
					<div style={{ flex: 1 }}>
						<Input
							fluid
							size="small"
							placeholder="Search name"
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
												<Table.HeaderCell>Publish Date Range</Table.HeaderCell>
												<Table.HeaderCell>Status</Table.HeaderCell>
												<Table.HeaderCell>Actions</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{this.renderTableBody(popups)}
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

export default withAlert()(PopupsListPage);
