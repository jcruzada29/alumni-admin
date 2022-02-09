import React, { Component } from 'react';
import { Divider, Icon, Breadcrumb } from 'semantic-ui-react';
import DetailMenu from './../../components/DetailMenu';
import UrlParse from 'url-parse';
import HighlightBasicPage from './HighlightBasicPage';
import HighlightNotificationsPage from './HighlightNotificationsPage';
import HighlightSegmentationPage from './HighlightSegmentationPage';


export class HighlightDetailPage extends Component {
	_getSpecificComponent = () => {
		const { history } = this.props;
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length - 1];
		switch (true) {
			case (pathname === 'basic'):
				return <HighlightBasicPage {...this.props} />;
			case (pathname === 'segmentation'):
				return <HighlightSegmentationPage {...this.props} />;
			case (pathname === 'notifications'):
				return <HighlightNotificationsPage {...this.props} />;
			default:
			// back to highlights list once routes not found
				history.push('/highlights');
		}
	}

	render() {
		const { history, location } = this.props;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/highlights', content: 'Highlights', link: true, onClick: () => history.push('/highlights') },
			{ key: 'Detail', content: 'Detail', active: true }
		];
		const tabs = [
			{ title: 'Basic', path: `/basic?id=${query.id}` },
			{ title: 'Segmentation', path: `/segmentation?id=${query.id}` },
			{ title: 'Notifications', path: `/notifications?id=${query.id}` }
		];

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>
						<Icon
							className="icon-bold"
							name="arrow left"
							onClick={() => history.push('/highlights')}
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

export default HighlightDetailPage;
