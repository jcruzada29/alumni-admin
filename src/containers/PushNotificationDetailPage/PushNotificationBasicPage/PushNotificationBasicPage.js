import React, { Component } from 'react';

import { Icon, Divider, Breadcrumb } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import { compose } from 'redux';

import PropTypes from 'prop-types';
import UrlParse from 'url-parse';

import Loading from '../../../components/loading';
import PushNotificationBasicForm from './components/PushNotificationBasicForm';

class PushNotificationBasicPage extends Component {
	componentDidMount() {
		this.getPushNotificationById();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta } = prevProps.pageProps;
		const { meta } = this.props.pageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}
	}

	getPushNotificationById() {
		const { query } = UrlParse(this.props.location.search, true);
		if (query.id) {
			this.props.getPushNotificationById(query.id);
		}
	}

	onSend = data => {
		const { query } = UrlParse(this.props.location.search, true);
		const { id } = query;
		this.props.onSend(id);
	}

	onSchedule = data => {
		const { query } = UrlParse(this.props.location.search, true);
		const { id } = query;
		this.props.onSchedule(id);
	}

	render() {
		const { pageProps, location } = this.props;
		const { loading, loadingSubmit, asset, loadingAsset } = pageProps;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/push-notifications', content: 'Push Notifications', link: true, onClick: () => this.props.navigateToPushNotificationListPage() },
			{ key: '', content: 'Create Push Notifications', active: true }
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
									onClick={() => this.props.navigateToPushNotificationListPage()}
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
					<PushNotificationBasicForm
						loadingSubmit={loadingSubmit}
						onSubmit={this.props.onSubmit}
						onSchedule={this.onSchedule}
						onSend={this.onSend}
						asset={asset}
						loadingAsset={loadingAsset}
					/>
				</div>
			</React.Fragment>
		);
	}
}

PushNotificationBasicPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getPushNotificationById: PropTypes.func.isRequired,
	navigateToPushNotificationListPage: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default compose(
	withAlert()
)(PushNotificationBasicPage);