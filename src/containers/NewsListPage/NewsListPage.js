import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Icon, Grid, Table, Divider, Form, Button } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import moment from 'moment';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { renderFormInput } from '../../helpers/redux_form';
import { Pagination } from '../../components/pagination';
import Loading from '../../components/loading';
const ENTRY_PER_PAGE = 10;

class NewsListPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDetailPage: false,
			openDetailPageData: null
		};
	}

	componentDidMount() {
		// this.getOnboardingScreens();
		const { query } = UrlParse(this.props.location.search, true);
		const {
			search
		} = query;

		if (search) {
			// Initialize redux-form fields
			this.props.initialize({ search });
		}
		this.getNews();
	}

	componentDidUpdate(prevProps, prevState) {
		// const { submitSuccess: prev_submitSuccess } = prevProps.onboardingScreenDetailPageProps;
		// const {  submitSuccess } = this.props.onboardingScreenDetailPageProps;

		// if (submitSuccess && prev_submitSuccess !== submitSuccess) {
		// 	// this.getOnboardingScreens();
		// }
	}

	componentWillUnmount() {
		this.props.resetPage();
	}

	onPageChange = (page, limit) => {
		return this.getNews({ page, limit });
	};


	getNews = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit,
			search
		} = opts || {};

		this.props.getNews({
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE,
			search: search || ''
		});
	};



	renderTableBody = items => {
		if (_.isEmpty(items)) {
			return (
				<Table.Row>
					<Table.Cell colSpan={4}>No News</Table.Cell>
				</Table.Row>
			);
		}
		return items.map((item => {
			const { title, publish_end_date, publish_start_date, is_published, id } = item;
			return (
				<Table.Row
					key={id}
					onClick={() =>
						this.props.history.push(`/news/id/basic?id=${id}`)
					}
				>
					<Table.Cell>{title}</Table.Cell>
					<Table.Cell>{`${moment(publish_start_date).format('YYYY-MM-DD')} - ${moment(publish_end_date).format('YYYY-MM-DD')}`}</Table.Cell>
					<Table.Cell>{is_published ? 'Published' : 'Unpublished'}</Table.Cell>
					<Table.Cell textAlign="center">
						<Icon
							link
							name="edit"
							size="large"
							onClick={() =>
								this.props.history.push(`/news/id/basic?id=${id}`)
							}
						/>
					</Table.Cell>
				</Table.Row>
			);
		}));
	};

	render() {
		const { newsListPageProps } = this.props;
		const { news, loading, page, limit, total } = newsListPageProps;
		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>News</span>
					<div className="component-buttons">
						<span onClick={() => this.props.history.push(`/news/create`)}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Add News
						</span>
					</div>
				</div>
				<Divider />
				<div className="bt-content-padded">
					<Form>
						<Form.Group>
							<Field
								width={15}
								component={renderFormInput}
								placeholder="Search with name"
								name="search"
								icon="search"
								iconPosition="left"
							/>
							<Button
								primary
								onClick={this.props.handleSubmit((data) => this.getNews({
									page: 1, search: data.search
								}))
								}
							>
								Filter
							</Button>
						</Form.Group>
					</Form>
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
													<Table.HeaderCell>Publish Date Range</Table.HeaderCell>
													<Table.HeaderCell>Status</Table.HeaderCell>
													<Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
												</Table.Row>
											</Table.Header>
											<Table.Body>
												{this.renderTableBody(news)}
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

NewsListPage.propTypes = {
	newsListPageProps: PropTypes.object.isRequired
};

export default compose(
	withAlert(),
	reduxForm({
		form: 'NewsListPage'
	})
)(NewsListPage);