import React, { Component } from 'react';
import {
	Breadcrumb, Icon, Divider
} from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import UrlParse from 'url-parse';
import { compose } from 'redux';
import Loading from '../../../components/loading';
import NewsBasicForm from './components/NewsBasicForm';

class NewsBasicPage extends Component {
	constructor() {
		super();
		this.state = { isSisTest: false };
	}

	componentDidMount() {
		this.getNewsById();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, loadedSuccess: prev_loadedSuccess } = prevProps.newsBasicPageProps;
		const { meta, loadedSuccess, news } = this.props.newsBasicPageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};

			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}

		if (loadedSuccess && loadedSuccess !== prev_loadedSuccess) {
			this.props.getAssetFileById({ asset_id: news.asset_id });
		}
	}

	componentWillUnmount() {
		this.props.resetPage(); // renamed to resetPage to not conflict redux-form's reset prop
	}

	getNewsById() {
		const { query } = UrlParse(this.props.location.search, true);
		const { id } = query;
		if (id) {
			this.props.getNewsById({ id: query.id });
		}
	}

	render() {
		const { newsBasicPageProps, location, history } = this.props;
		if (newsBasicPageProps && newsBasicPageProps.loading) {
			return (<Loading />);
		}

		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/news', content: 'News', link: true, onClick: () => history.push('/news') },
			{ key: '', content: 'Create News', active: true }
		];

		return (
			<React.Fragment>
				{!query.id && (
					<React.Fragment>
						<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
							<div>
								<Icon
									className="icon-bold"
									name="arrow left"
									onClick={() => history.push('/news')}
								/>
								<Breadcrumb
									divider="/"
									sections={sections}
								/>
							</div>
						</div>
						<Divider />
					</React.Fragment>
				)}
				<div className="bt-content-padded">
					<NewsBasicForm
						onSubmit={this.props.onSubmit}
						{...newsBasicPageProps}
					/>
				</div>
			</React.Fragment>
		);
	}
}

NewsBasicPage.propTypes = {
	newsBasicPageProps: PropTypes.object.isRequired,
	resetMeta: PropTypes.func.isRequired,
	resetPage: PropTypes.func.isRequired
};

export default compose(
	withAlert()
)(NewsBasicPage);
