import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Icon, Grid, Table, Divider, Input, Button } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import { Pagination } from '../../components/pagination';
import Loading from '../../components/loading';
import LabelHelper from '../../helpers/Label';

const ENTRY_PER_PAGE = 10;
// const DEFAULT_OPTIONS = {
// 	limit: ENTRY_PER_PAGE,
// 	page: 1
// };

class HighlightsListPage extends Component {

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
		this.props.getHighlights({ page, limit, search });
	}

	componentWillUnmount(){
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

	renderTableBody = highlights => {
		const { history } = this.props;
		if (_.isEmpty(highlights)) {
			return (
				<Table.Row>
					<Table.Cell colSpan={6}>No Highlights found</Table.Cell>
				</Table.Row>
			);
		} else {
			return highlights.map(highlight => {
				const publish_date_range = `${moment(highlight.publish_start_date).format('YYYY-MM-DD')} - ${moment(highlight.publish_end_date).format('YYYY-MM-DD')}`;
				return (
					<Table.Row
						key={highlight.id}
						onClick={() => history.push(`/highlights/id/basic?id=${highlight.id}`)}
					>
						<Table.Cell>{highlight.title}</Table.Cell>
						<Table.Cell>{LabelHelper.highlightsLocation(highlight.location)}</Table.Cell>
						<Table.Cell>{publish_date_range}</Table.Cell>
						<Table.Cell>{this.renderStatus(highlight.is_published)}</Table.Cell>
						<Table.Cell>
							<center>
								<Icon
									link
									name="edit"
									size="large"
									onClick={() =>
										this.props.history.push(`/highlights/id/basic?id=${highlight.id}`)
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
		this.props.getHighlights({ search: searchValue });
	}

	onPageChange = (page, limit) => {
		return this.props.getHighlights({ page, limit });
	};

	render() {
		const { history } = this.props;
		const { highlights, page, limit, total, loading } = this.props.highlightsPageReducer;
		const { searchValue } = this.state;

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>Highlights</span>
					<div className="component-buttons">
						<span onClick={() => history.push('/highlights/create')}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Add Highlight
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
												<Table.HeaderCell>Location</Table.HeaderCell>
												<Table.HeaderCell>Publish Date Range</Table.HeaderCell>
												<Table.HeaderCell>Status</Table.HeaderCell>
												<Table.HeaderCell>Actions</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{this.renderTableBody(highlights)}
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

export default withAlert()(HighlightsListPage);
