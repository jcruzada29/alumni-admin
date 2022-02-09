import React, { Component } from 'react';
import { Icon, Divider, Breadcrumb } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import UrlParse from 'url-parse';

import Loading from '../../../components/loading';
import EventBasicForm from './components/EventBasicForm';

class EventBasicPage extends Component {
	componentDidMount() {
		this.getEventById();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, hasLoaded: prev_hasLoaded } = prevProps.pageProps;
		const { meta, hasLoaded, event } = this.props.pageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}

		if (hasLoaded && hasLoaded !== prev_hasLoaded && event.asset_id) {
			this.props.getAssetFileById({ asset_id: event.asset_id });
		}
	}

	componentWillUnmount() {
		this.props.reset();
	}

	getEventById() {
		const { query } = UrlParse(this.props.location.search, true);
		if (query.id) {
			this.props.getEventById(query.id);
		}
	}

	render() {
		const { pageProps, location } = this.props;
		const { loading, loadingSubmit, asset, loadingAsset } = pageProps;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/meetings', content: 'Events', link: true, onClick: () => this.props.navigateToEventListPage() },
			{ key: '', content: 'Create Event', active: true }
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
									onClick={() => this.props.navigateToEventListPage()}
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
					<EventBasicForm
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

EventBasicPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getEventById: PropTypes.func.isRequired,
	getAssetFileById: PropTypes.func.isRequired,
	navigateToEventListPage: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default compose(
	withAlert()
)(EventBasicPage);
