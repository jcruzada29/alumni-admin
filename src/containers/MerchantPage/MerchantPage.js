import React, { Component } from 'react';

import { withAlert } from 'react-alert';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Button, Divider, Input, Grid, Icon, Table } from 'semantic-ui-react';

import _ from 'lodash';
import UrlParse from 'url-parse';
import PropTypes from 'prop-types';

import Loading from '../../components/loading';
import { Pagination } from '../../components/pagination';
import MerchantModal from './components/MerchantModal';

const ENTRY_PER_PAGE = 10;

class MerchantPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openFormModal: false,
			searchValue: ''
		};
	}

	componentWillUnmount() {
		this.props.resetPage();
	}

	componentDidMount() {
		const { query } = UrlParse(this.props.location.search, true);
		const { page, limit } = query;
		this.getMerchants({ page, limit });
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, loadingSubmit: prevLoadingSubmit, form: prevForm }
			= prevProps.merchantPageProps;
		const { meta, loadingSubmit, form } = this.props.merchantPageProps;
		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			if (meta.code === 200) { this.toggleModal(); }
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}
		if (loadingSubmit && loadingSubmit !== prevLoadingSubmit) {
			const { query } = UrlParse(this.props.location.search, true);
			const { page, limit } = query;
			setTimeout(() => {
				this.getMerchants({ page, limit });
				this.setState({ searchValue: '' });
			}, 100);
		}
		if (!_.isEqual(form, prevForm)) {
			this.props.updateForm();
		}
	}

	onPageChange = (page, limit) => {
		return this.getMerchants({ page, limit });
	};

	toggleModal = () => {
		this.setState({ openFormModal: !this.state.openFormModal });
	}

	handleSearchValue = v => {
		this.setState({ searchValue: v.target.value });
	}

	handleClickFilter = () => {
		const { searchValue } = this.state;
		this.props.getSearchResult({ search: searchValue });
	}

	handleClickAdd = () => {
		this.toggleModal();
		this.props.emptyForm();
	}

	handleToggleUpdate = (id) => {
		this.toggleModal();
		this.props.getMerchantById({ id });
	}

	getMerchants = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const { page, limit } = opts || {};
		this.props.getMerchants({
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	renderModal = (props) => {
		const { openFormModal } = this.state;
		const { loadingSubmit } = props;
		return (
			<div>
				<MerchantModal
					{...this.props}
					loadingSubmit={loadingSubmit}
					openFormModal={openFormModal}
					toggleModal={this.toggleModal}
				/>
			</div>
		);
	}

	renderTableBody = merchants => {
		if (_.isEmpty(merchants)) {
			return (
				<Table.Row>
					<Table.Cell
						textAlign="center"
						colSpan="2"
					>No Merchants</Table.Cell>
				</Table.Row>
			);
		}
		return merchants.map(row => {
			return (
				<Table.Row
					key={row.id}
					onClick={() =>
						this.handleToggleUpdate(row.id)
					}
				>
					<Table.Cell>{row.name}</Table.Cell>
					<Table.Cell
						collapsing
						textAlign="center"
						colSpan="1"
					>
						<Icon
							link
							name="edit"
							size="large"
							onClick={() => this.handleToggleUpdate(row.id)}
						/>
					</Table.Cell>
				</Table.Row>);
		}
		);
	};

	render() {
		const { searchValue } = this.state;
		const { merchantPageProps } = this.props;
		const { loading, page, limit, total, merchants } = merchantPageProps;
		return (
			<div>
				{this.renderModal(merchantPageProps)}
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0px 0px 20px' }}>
					<span>Merchants</span>
					<div className="component-buttons">
						<span onClick={this.handleClickAdd}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Create Merchant
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
												<Table.HeaderCell>Actions</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{this.renderTableBody(merchants)}
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

MerchantPage.propTypes = {
	merchantPageProps: PropTypes.object.isRequired,
	getMerchants: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	resetPage: PropTypes.func.isRequired
};

MerchantPage = connect(
	state => {
		return ({
			initialValues: state.merchantPageReducer.form
		});
	}
)(MerchantPage);

export default compose(
	withAlert(),
	reduxForm({
		form: 'MerchantPage'
	})
)(MerchantPage);
