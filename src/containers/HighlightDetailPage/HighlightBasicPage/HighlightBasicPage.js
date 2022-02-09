import React, { Component } from 'react';

import { Icon, Divider, Breadcrumb } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import { compose } from 'redux';

import PropTypes from 'prop-types';
import UrlParse from 'url-parse';

import Loading from '../../../components/loading';
import HighlightBasicForm from './components/HighlightsBasicForm';

class HighlightBasicPage extends Component {
	componentDidMount() {
		this.getHighlightById();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, hasLoaded: prev_hasLoaded } = prevProps.pageProps;
		const { meta, hasLoaded, highlight } = this.props.pageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}

		if (hasLoaded && hasLoaded !== prev_hasLoaded && highlight.asset_id) {
			this.props.getAssetFileById({ asset_id: highlight.asset_id });
		}
	}

	getHighlightById() {
		const { query } = UrlParse(this.props.location.search, true);
		if (query.id) {
			this.props.getHighlightById(query.id);
		}
	}

	render() {
		const { pageProps, location } = this.props;
		const { loading, loadingSubmit, asset, loadingAsset } = pageProps;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/highlights', content: 'Highlights', link: true, onClick: () => this.props.navigateToHighlightListPage() },
			{ key: '', content: 'Create Highlights', active: true }
		];

		if (loading) {
			return <Loading />;
		}
		return (
			<React.Fragment>
				{!query.id && (
					<React.Fragment>
						<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
							<div>
								<Icon
									className="icon-bold"
									name="arrow left"
									onClick={() => this.props.navigateToHighlightListPage()}
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
					<HighlightBasicForm
						loadingSubmit={loadingSubmit}
						onSubmit={this.props.onSubmit}
						asset={asset}
						loadingAsset={loadingAsset}
					/>
				</div>
			</React.Fragment>
		);
	}
}

HighlightBasicPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getHighlightById: PropTypes.func.isRequired,
	getAssetFileById: PropTypes.func.isRequired,
	navigateToHighlightListPage: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default compose(
	withAlert()
)(HighlightBasicPage);