import React, { Component } from 'react';
import { Divider, Icon, Breadcrumb } from 'semantic-ui-react';
import DetailMenu from './../../components/DetailMenu';
import UrlParse from 'url-parse';
import CouponBasicPage from './CouponBasicPage';
import CouponSegmentationPage from './CouponSegmentationPage';
import CouponNotificationsPage from './CouponNotificationsPage';
import CouponCouponsPage from './CouponCouponsPage';
import CouponReportsPage from './CouponReportsPage';


export class CouponDetailPage extends Component {
	_getSpecificComponent = () => {
		const { history } = this.props;
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length - 1];
		switch (true) {
			case (pathname === 'basic'):
				return <CouponBasicPage {...this.props} />;
			case (pathname === 'segmentation'):
				return <CouponSegmentationPage {...this.props} />;
			case (pathname === 'notifications'):
				return <CouponNotificationsPage {...this.props} />;
			case (pathname === 'coupons'):
				return <CouponCouponsPage {...this.props} />;
			case (pathname === 'reports'):
				return <CouponReportsPage {...this.props} />;
			default:
				// back to users list once routes not found				
				history.push('/coupons');
		}
	}

	render() {
		const { history, location } = this.props;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/coupons', content: 'Coupons', link: true, onClick: () => history.push('/coupons') },
			{ key: 'Detail', content: 'Detail', active: true }
		];
		const tabs = [
			{ title: 'Basic', path: `/basic?id=${query.id}` },
			{ title: 'Segmentation', path: `/segmentation?id=${query.id}` },
			{ title: 'Notifications', path: `/notifications?id=${query.id}` },
			{ title: 'Coupons', path: `/coupons?id=${query.id}` },
			{ title: 'Reports', path: `/reports?id=${query.id}` }
		];

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>
						<Icon
							className="icon-bold"
							name="arrow left"
							onClick={() => history.push('/coupons')}
						/>
						<Breadcrumb
							divider="/"
							sections={sections}
						/>
					</span>
				</div>
				<Divider />
				<DetailMenu
					tabs={tabs}
					location={location}
					history={history}
				/>
				{this._getSpecificComponent()}
			</div>
		);
	}
}

export default CouponDetailPage;
