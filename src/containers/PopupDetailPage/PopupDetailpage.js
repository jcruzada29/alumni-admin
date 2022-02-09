import React, { Component } from 'react';
import { Divider, Icon, Breadcrumb } from 'semantic-ui-react';
import DetailMenu from './../../components/DetailMenu';
import UrlParse from 'url-parse';
import PopupBasicPage from './PopupBasicPage';
import PopupSegmentationPage from './PopupSegmentationPage';


export class PopupDetailPage extends Component {
	_getSpecificComponent = () => {
		const { history } = this.props;
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length - 1];
		switch (true) {
			case (pathname === 'basic'):
				return <PopupBasicPage {...this.props} />;
			case (pathname === 'segmentation'):
				return <PopupSegmentationPage {...this.props} />;
			default:
			// back to popups list once routes not found				
				history.push('/popups');
		}
	}

	render() {
		const { history, location } = this.props;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/popups', content: 'Popups', link: true, onClick: () => history.push('/popups') },
			{ key: 'Detail', content: 'Detail', active: true }
		];
		const tabs = [
			{ title: 'Basic', path: `/basic?id=${query.id}` },
			{ title: 'Segmentation', path: `/segmentation?id=${query.id}` }
		];

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>
						<Icon
							className="icon-bold"
							name="arrow left"
							onClick={() => history.push('/popups')}
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

export default PopupDetailPage;
