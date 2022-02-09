import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Table, Input, Button, Icon, Modal } from 'semantic-ui-react';
import UrlParse from 'url-parse';
import PropTypes from 'prop-types';
import Loading from '../../../components/loading';
import { Pagination } from '../../../components/pagination';
import { withAlert } from 'react-alert';

const ENTRY_PER_PAGE = 10;

class CouponCouponsPage extends Component {
	constructor() {
		super();
		this.state = {
			searchValue: '',
			openDelete: false,
			subscription: {}
		};
	}

	componentDidMount() {
		this.getCouponCoupons();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta,
			hasDeleted: prev_hasDeleted }
			= prevProps.couponCouponsPageProps;
		const { meta, hasDeleted } = this.props.couponCouponsPageProps;
		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};

			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}

		if (hasDeleted && hasDeleted !== prev_hasDeleted) {
			this.getCouponCoupons();
			this.onCloseDeleteModal();
		}
	}

	componentWillUnmount() {
		this.props.reset();
	}

	handleSearchValue = v => {
		this.setState({ searchValue: v.target.value });
	}

	handleClickFilter = () => {
		const { query } = UrlParse(this.props.location.search, true);
		const { searchValue } = this.state;
		this.props.getSearchResult({ coupon_id: query.id, search: searchValue });
	}

	getCouponCoupons = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit
		} = opts || {};
		this.props.getCouponCoupons({
			coupon_id: query.id,
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	onPageChange = (page, limit) => {
		return this.getCouponCoupons({ page, limit });
	};

	onDeleteConfirmation = () => {
		this.setState({ openDelete: true });
	}

	onCloseDeleteModal = () => {
		this.setState({ openDelete: false });
	}

	renderTableBody = coupon_coupons => {
		if (_.isEmpty(coupon_coupons)) {
			return (
				<Table.Row>
					<Table.Cell colSpan="4">No Subscriptions</Table.Cell>
				</Table.Row>
			);
		} else {
			return coupon_coupons.map(coupon_coupon => {
				return (
					<Table.Row
						key={coupon_coupon.id}
					>
						<Table.Cell>
							{
								_.get(coupon_coupon, 'user_details') ? 
									`${coupon_coupon.user_details.first_name} ${coupon_coupon.user_details.last_name} `
									: ''
							}
						</Table.Cell>
						<Table.Cell>{coupon_coupon.user_id}</Table.Cell>
						<Table.Cell>
							{
								_.get(coupon_coupon, 'user_details') ? 
									coupon_coupon.user_details.zr_email_srch.split('|')[0]
							 		: ''
							 }
						</Table.Cell>
						<Table.Cell>Used on {moment(coupon_coupon.used_at).format("DD MMM YYYY")}</Table.Cell>
						<Table.Cell>
							<center>
								<Icon
									link
									name="trash"
									size="large"
									onClick={() =>
										this.setState({
											openDelete: true,
											subscription: coupon_coupon
										})
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
		const { searchValue, openDelete, subscription } = this.state;
		const { couponCouponsPageProps } = this.props;
		const {
			coupon_coupons,
			loading,
			total,
			page,
			limit,
			loadingDelete
		} = couponCouponsPageProps;
		return (
			<div className="bt-content-padded">
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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
				
				<React.Fragment>
					{loading && <Loading />}
					{!loading && (<Table singleLine>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Name</Table.HeaderCell>
								<Table.HeaderCell>Student ID</Table.HeaderCell>
								<Table.HeaderCell>Email Address</Table.HeaderCell>
								<Table.HeaderCell>Status</Table.HeaderCell>
								<Table.HeaderCell><center>Actions</center></Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{this.renderTableBody(coupon_coupons)}
						</Table.Body>
					</Table>)}
					<Pagination
						page={page}
						limit={limit}
						total={total}
						options={[ENTRY_PER_PAGE]}
						onPageChange={this.onPageChange}
					/>

					<Modal
						open={openDelete}
						size="mini"
						onClose={() => this.onCloseDeleteModal()}
						closeIcon={{ name: 'close' }}
						closeOnDimmerClick={false}
					>
						<Modal.Header>Remove Subscription</Modal.Header>
						<Modal.Content>
							<p>Are you sure to remove {_.get(subscription, 'user_details') ? 
								`${subscription.user_details.first_name} ${subscription.user_details.last_name} `
								: ''} subscription?</p>
						</Modal.Content>
						<Modal.Actions>
							<Button
								default
								onClick={() => this.onCloseDeleteModal()}
							>
								No
							</Button>
							<Button
								primary
								disabled={loadingDelete}
								onClick={() => this.props.onDeleteCouponSubscriptionById(subscription.id)}
							>
								Yes
							</Button>
						</Modal.Actions>
					</Modal>
				</React.Fragment>
			</div>
		);
	}
}

CouponCouponsPage.propTypes = {
	couponCouponsPageProps: PropTypes.object.isRequired,
	getCouponCoupons: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default withAlert()(CouponCouponsPage);
