import React, { Component } from 'react';

import { withAlert } from 'react-alert';
import { Button, Divider, Input, Grid, Icon, Table } from 'semantic-ui-react';

import _ from 'lodash';
import moment from 'moment';
import UrlParse from 'url-parse';
import PropTypes from 'prop-types';

import Loading from '../../components/loading';
import { Pagination } from '../../components/pagination';

const ENTRY_PER_PAGE = 10;

class CouponsListPage extends Component {
	constructor() {
		super();
		this.state = {
			searchValue: '',
			loading: false // temporary
		};
	}

	componentDidMount() {
		this.getCoupons();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta } = prevProps.couponsListPageProps;
		const { meta } = this.props.couponsListPageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};

			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}
	}

	getCoupons = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit
		} = opts || {};
		this.props.getCoupons({
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	handleSearchValue = v => {
		this.setState({ searchValue: v.target.value });
	}

	handleClickFilter = () => {
		const { searchValue } = this.state;
		this.props.getSearchResult({ search: searchValue });
	}

	onClickAddButton = () => {
		return this.props.navigateToAddPage();
	};

	onPageChange = (page, limit) => {
		return this.getCoupons({ page, limit });
	};

	renderTableBody = coupons => {
		if (_.isEmpty(coupons)) {
			return (
				<Table.Row>
					<Table.Cell colSpan={6}>No Coupons</Table.Cell>
				</Table.Row>
			);
		} else {
			return coupons.map(coupon => {
				return (
					<Table.Row
						key={coupon.id}
						onClick={() => this.props.navigateToDetailPage({ coupon_id: coupon.id })}
					>
						<Table.Cell>{coupon.name}</Table.Cell>
						<Table.Cell>{coupon.merchant_name}</Table.Cell>
						<Table.Cell>{moment(coupon.publish_start_date).format("DD/MM/YYYY")}</Table.Cell>
						<Table.Cell>{moment(coupon.publish_end_date).format("DD/MM/YYYY")}</Table.Cell>
						<Table.Cell>
							<Icon
								color={!!coupon.is_published ? "teal" : "red"}
								name="circle"
								size="small"
							/>
							{!!coupon.is_published ? 'Published' : 'Unpublished'}
						</Table.Cell>
						<Table.Cell>
							<center>
								<Icon
									link
									name="edit"
									size="large"
									onClick={() =>
										this.props.navigateToDetailPage({ coupon_id: coupon.id })
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
		const { searchValue } = this.state;
		const { couponsListPageProps } = this.props;
		const {
			coupons,
			loading,
			total,
			page,
			limit
		} = couponsListPageProps;
		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0px 0px 20px' }}>
					<span>Coupons</span>
					<div className="component-buttons">
						<span onClick={() => this.onClickAddButton()}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Create Coupon
						</span>
					</div>
				</div>
				<Divider />
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px 20px 0px 20px' }}>
					<div style={{ flex: 1 }}>
						<Input
							fluid
							size="small"
							placeholder="Search with name"
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
												<Table.HeaderCell>Merchant</Table.HeaderCell>
												<Table.HeaderCell>Start At</Table.HeaderCell>
												<Table.HeaderCell>End At</Table.HeaderCell>
												<Table.HeaderCell>Status</Table.HeaderCell>
												<Table.HeaderCell><center>Actions</center></Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{this.renderTableBody(coupons)}
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

CouponsListPage.propTypes = {
	couponsListPageProps: PropTypes.object.isRequired,
	getCoupons: PropTypes.func.isRequired,
	navigateToAddPage: PropTypes.func.isRequired,
	navigateToDetailPage: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default withAlert()(CouponsListPage);
