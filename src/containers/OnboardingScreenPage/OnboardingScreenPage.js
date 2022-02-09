import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Icon, Grid, Table, Divider } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { Pagination } from '../../components/pagination';
import _ from 'lodash';
import Loading from '../../components/loading';
import OnboardingScreenDetailPage from './OnboardingScreenDetailPage';

const ENTRY_PER_PAGE = 10;

class OnboardingScreenPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDetailPage: false,
			openDetailPageData: null
		};
	}

	componentDidMount() {
		this.getOnboardingScreens();
	}

	componentDidUpdate(prevProps, prevState) {
		const { submitSuccess: prev_submitSuccess } = prevProps.onboardingScreenDetailPageProps;
		const { submitSuccess } = this.props.onboardingScreenDetailPageProps;

		if (submitSuccess && prev_submitSuccess !== submitSuccess) {
			this.getOnboardingScreens();
		}
	}

	componentWillUnmount() {
		this.props.resetPage();
	}

	onPageChange = (page, limit) => {
		return this.getOnboardingScreens({ page, limit });
	};


	getOnboardingScreens = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit
		} = opts || {};

		this.props.getonboardingScreens({
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};

	modalHandle = () => {
		const { openDetailPage, openDetailPageData } = this.state;
		this.setState({ openDetailPage: !openDetailPage });
		if (openDetailPageData) {
			this.setState({
				openDetailPageData: null
			});
		}
	};

	detailPageHandle = (data) => {
		this.setState({
			openDetailPageData: data,
			openDetailPage: data ? data : null
		});
	}


	renderTableBody = items => {
		if (_.isEmpty(items)) {
			return (
				<Table.Row>
					<Table.Cell colSpan={3}>No Onboarding Screen Page</Table.Cell>
				</Table.Row>
			);
		}
		return items.map((item => {
			const { name, sort } = item;
			return (
				<Table.Row
					key={item.id}
					onClick={() =>
						this.detailPageHandle(item)
					}
				>
					<Table.Cell>{name}</Table.Cell>
					<Table.Cell>{sort}</Table.Cell>
					<Table.Cell textAlign="right">
						<Icon
							link
							name="edit"
							size="large"
							onClick={() =>
								this.detailPageHandle(item)
							}
						/>
					</Table.Cell>
				</Table.Row>
			);
		}));
	};

	render() {
		const { onboardingScreenPageProps } = this.props;
		const { openDetailPage, openDetailPageData } = this.state;
		const { onboardingScreens, loading, page, limit, total } = onboardingScreenPageProps;
		return (
			<div>
				{openDetailPage
					&&
					<OnboardingScreenDetailPage
						modalHandle={this.modalHandle}
						openDetailPage={openDetailPage}
						openDetailPageData={openDetailPageData}
					/>
				}
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>Onboarding Screen</span>
					<div className="component-buttons">
						<span onClick={() => this.modalHandle()}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Add Onboarding Screen
						</span>
					</div>
				</div>
				<Divider />
				<div className="bt-content-padded">
					<Grid>
						<Grid.Row>
							<Grid.Column width={16}>
								{loading && <Loading />}
								{!loading && (
									<React.Fragment>
										<Table striped>
											<Table.Header>
												<Table.Row>
													<Table.HeaderCell>Name</Table.HeaderCell>
													<Table.HeaderCell>Order</Table.HeaderCell>
													<Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
												</Table.Row>
											</Table.Header>
											<Table.Body>
												{this.renderTableBody(onboardingScreens)}
											</Table.Body>
										</Table>
										<Pagination
											page={page}
											limit={limit}
											total={total}
											options={[ENTRY_PER_PAGE]}
											onPageChange={this.onPageChange}
										/>
									</React.Fragment>
								)}
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		);
	}
}

OnboardingScreenPage.propTypes = {
	onboardingScreenPageProps: PropTypes.object.isRequired
};

export default compose(
	withAlert(),
	reduxForm({
		form: 'OnboardingScreenPage'
	})
)(OnboardingScreenPage);