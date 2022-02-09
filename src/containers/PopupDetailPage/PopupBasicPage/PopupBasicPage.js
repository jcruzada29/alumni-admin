import React, { Component } from 'react';

import { Icon, Divider, Breadcrumb } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import { compose } from 'redux';

import PropTypes from 'prop-types';
import UrlParse from 'url-parse';

import Loading from '../../../components/loading';
import PopupBasicForm from './components/PopupBasicForm';

class PopupBasicPage extends Component {
	componentDidMount() {
		this.getPopupById();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, hasLoaded: prev_hasLoaded } = prevProps.pageProps;
		const { meta, hasLoaded, popup } = this.props.pageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}

		if (hasLoaded && hasLoaded !== prev_hasLoaded && popup.asset_id) {
			this.props.getAssetFileById({ asset_id: popup.asset_id });
		}
	}

	getPopupById() {
		const { query } = UrlParse(this.props.location.search, true);
		if (query.id) {
			this.props.getPopupById(query.id);
		}
	}

	render() {
		const { pageProps, location } = this.props;
		const { loading, loadingSubmit, asset, loadingAsset } = pageProps;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/popups', content: 'Popups', link: true, onClick: () => this.props.navigateToPopupListPage() },
			{ key: '', content: 'Create Popups', active: true }
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
									onClick={() => this.props.navigateToPopupListPage()}
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
					<PopupBasicForm
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

PopupBasicPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getPopupById: PropTypes.func.isRequired,
	getAssetFileById: PropTypes.func.isRequired,
	navigateToPopupListPage: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default compose(
	withAlert()
)(PopupBasicPage);