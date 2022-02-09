import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Table, Input, Button } from 'semantic-ui-react';
import UrlParse from 'url-parse';
import PropTypes from 'prop-types';
import Loading from '../../../components/loading';
import { Pagination } from '../../../components/pagination';

const ENTRY_PER_PAGE = 10;

class ParkingPrivilegeUsagePage extends Component {
	constructor() {
		super();
		this.state = {
			searchValue: ''
		};
	}

	componentDidMount() {
		this.getParkingUsage();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta }
			= prevProps.parkingPrivilegeUsagePageProps;
		const { meta } = this.props.parkingPrivilegeUsagePageProps;
		if (meta && meta.code !== 200 || meta !== prevMeta) {
			this.props.reset();
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
		this.props.getSearchResult({ parking_id: query.id, search: searchValue });
	}

	getParkingUsage = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit
		} = opts || {};
		this.props.getParkingUsage({
			parking_id: query.id,
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	onPageChange = (page, limit) => {
		return this.getParkingUsage({ page, limit });
	};

	renderTableBody = parking_usage => {
		if (_.isEmpty(parking_usage)) {
			return (
				<Table.Row>
					<Table.Cell colSpan="4">No Parking Usage</Table.Cell>
				</Table.Row>
			);
		} else {
			return parking_usage.map(usage => {
				return (
					<Table.Row
						key={usage.id}
					>
						<Table.Cell> 
							{ 
								_.get(usage, 'user_details') ? 
									`${usage.user_details.first_name} ${usage.user_details.last_name}` 
									: ''
							}
						</Table.Cell>
						<Table.Cell>{usage.user_id}</Table.Cell>
						<Table.Cell>
							{ 
								_.get(usage, 'user_details') ? 
									usage.user_details.zr_email_srch.split('|')[0]
									: ''
							}
						</Table.Cell>
						<Table.Cell>Used on {moment(usage.used_at).format("DD MMM YYYY")}</Table.Cell>
					</Table.Row>
				);
			});
		}
	};
	
	render() {
		const { searchValue } = this.state;
		const { parkingPrivilegeUsagePageProps } = this.props;
		const {
			parking_usage,
			loading,
			total,
			page,
			limit
		} = parkingPrivilegeUsagePageProps;
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
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{this.renderTableBody(parking_usage)}
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
			</div>
		);
	}
}

ParkingPrivilegeUsagePage.propTypes = {
	parkingPrivilegeUsagePageProps: PropTypes.object.isRequired,
	getParkingUsage: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default ParkingPrivilegeUsagePage;
