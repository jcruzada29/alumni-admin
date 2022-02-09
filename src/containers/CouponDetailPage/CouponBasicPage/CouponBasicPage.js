import React, { Component } from 'react';

import { Icon, Divider, Breadcrumb } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import { compose } from 'redux';

import PropTypes from 'prop-types';
import UrlParse from 'url-parse';

import CouponBasicForm from './components/CouponBasicForm';
import Loading from '../../../components/loading';

class CouponBasicPage extends Component {
	componentDidMount() {
		this.getCouponById();
		this.props.getMerchants();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, hasLoaded: prev_hasLoaded } = prevProps.pageProps;
		const { meta, hasLoaded, coupon } = this.props.pageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}

		if (hasLoaded && hasLoaded !== prev_hasLoaded && coupon.asset_id) {
			this.props.getAssetFileById({ asset_id: coupon.asset_id });
		}
	}

	getCouponById() {
		const { query } = UrlParse(this.props.location.search, true);
		if (query.id) {
			this.props.getCouponById(query.id);
		}
	}

	render() {
		const { pageProps, location } = this.props;
		const { merchants, loading, loadingSubmit, asset, loadingAsset } = pageProps;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/coupons', content: 'Coupons', link: true, onClick: () => this.props.navigateToCouponListPage() },
			{ key: '', content: 'Create Coupon', active: true }
		];
		const merchantOptions = [];

		if (merchants) {
			merchants.map((merchant, index) => merchantOptions.push({ key: index, text: merchant.name, value: merchant.id }));
		}

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
									onClick={() => this.props.navigateToCouponListPage()}
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
					<CouponBasicForm
						loadingSubmit={loadingSubmit}
						onSubmit={this.props.onSubmit}
						asset={asset}
						loadingAsset={loadingAsset}
						options={merchantOptions}
					/>
				</div>
			</React.Fragment>
		);
	}
}

CouponBasicPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getCouponById: PropTypes.func.isRequired,
	getAssetFileById: PropTypes.func.isRequired,
	navigateToCouponListPage: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default compose(
	withAlert()
)(CouponBasicPage);