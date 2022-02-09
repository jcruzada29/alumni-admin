import React, { Component } from 'react';
import { Icon, Breadcrumb, Divider } from 'semantic-ui-react';
import UrlParse from 'url-parse';
import { withAlert } from 'react-alert';
import DetailMenu from '../../components/DetailMenu';
import BasicPage from './NewsBasicPage';
import NewsNotificationsPage from './NewsNotificationsPage';

class NewsDetailPage extends Component {
	getComponentToDisplay = () => {
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length - 1];
		switch (true) {
			case (pathname === 'basic'):
				return <BasicPage {...this.props} />;
			case (pathname === 'notifications'):
				return <NewsNotificationsPage {...this.props} />;
			default:
				// back to meetings list once routes not found
				return this.props.history.push('/news');
		}
	}
	render() {
		const { history, location } = this.props;
		// const { loadingSubmitMessage } = studentIndexPageProps;
		const { query } = UrlParse(this.props.location.search, true);
		const { id } = query;
		const sections = [
			{ key: '/news', content: 'News', link: true, onClick: () => history.push('/news') },
			{ key: 'Detail', content: 'Detail', active: true }
		];
		const tabs = [
			{ title: 'Basic', path: `/basic?id=${id}` },
			{ title: 'Notification', path: `/notifications?id=${id}` }
		];

		return (
			<div>
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
				<DetailMenu
					tabs={tabs}
					location={location}
					history={history}
				/>
				{this.getComponentToDisplay()}
			</div>
		);
	}
}

NewsDetailPage.propTypes = {
	// resetMeta: PropTypes.func.isRequired,
	// reset: PropTypes.func.isRequired
};

export default withAlert()(NewsDetailPage);
