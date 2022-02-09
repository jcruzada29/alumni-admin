import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
import UrlParse from 'url-parse';
import _ from 'lodash';
import Loading from '../../../components/loading';
import Pagination from '../../../components/pagination';

const ENTRY_PER_PAGE = 10;

class UserParkingPrivilegesPage extends React.Component {

	componentDidMount() {
		this.getParkPriviliges();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	getParkPriviliges = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit,
			id
		} = opts || {};
		this.props.getParkingPriviligesByUser({
			user_id: id || query.id,
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	onPageChange = (page, limit) => {
		const { query } = UrlParse(this.props.location.search, true);
		return this.getParkPriviliges({ user_id: query.id, page, limit });
	};

	renderTableBody = (parking_priviliges = []) => {
		if (_.isEmpty(parking_priviliges) || parking_priviliges === null) {
			return (
				<Table.Row>
					<Table.Cell colSpan={2}>No Parking Priviliges Found</Table.Cell>
				</Table.Row>
			);
		}
		return parking_priviliges.map((parking_privilige, index) => {
			return (
				<Table.Row
					key={index}
				>
					<Table.Cell>{parking_privilige.parking_priviliges.name}</Table.Cell>
					<Table.Cell>{parking_privilige.parking_privilige_user.status}</Table.Cell>
				</Table.Row>
			);
		});
	};


	render() {
		const { loading, parking_priviliges, page, total, limit } = this.props.userParkingPriviligePageReducer;

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
											<Table.HeaderCell>Parking Priviliges</Table.HeaderCell>
											<Table.HeaderCell>Status</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										{this.renderTableBody(parking_priviliges)}
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

export default UserParkingPrivilegesPage;