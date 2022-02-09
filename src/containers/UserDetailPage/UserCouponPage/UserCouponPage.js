import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
import UrlParse from 'url-parse';
import Loading from '../../../components/loading';
import _ from 'lodash';
import Pagination from '../../../components/pagination';

const ENTRY_PER_PAGE = 10;

class UserCouponPage extends React.Component {

	componentDidMount() {
		this.getCoupons();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	getCoupons = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit,
			id
		} = opts || {};
		this.props.getCouponsByUser({
			user_id: id || query.id,
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	onPageChange = (page, limit) => {
		const { query } = UrlParse(this.props.location.search, true);
		return this.getCoupons({ user_id: query.id, page, limit });
	};

	renderTableBody = (coupons = []) => {
		if (_.isEmpty(coupons) || coupons === null) {
			return (
				<Table.Row>
					<Table.Cell colSpan={2}>No Coupons Found</Table.Cell>
				</Table.Row>
			);
		}
		return coupons.map((coupon, index) => {
			return (
				<Table.Row
					key={index}
				>
					<Table.Cell>{coupon.coupons.name}</Table.Cell>
					<Table.Cell>{coupon.coupons_user.status}</Table.Cell>
				</Table.Row>
			);
		});
	};

	render() {

		const { loading, coupons, total, limit, page } = this.props.userCouponPageReducer;

		return (
			<div>
				<Grid>
					<Grid.Row>
						<Grid.Column width={16}>
							<React.Fragment>
								{loading && <Loading />}
								{!loading && (<Table singleLine>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Coupons</Table.HeaderCell>
											<Table.HeaderCell>Status</Table.HeaderCell>
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
		);
	}
}

export default UserCouponPage;