import React, { Component } from 'react';
import { Icon, Divider, Breadcrumb } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import UrlParse from 'url-parse';
import Loading from '../../../components/loading';
import NewsNotificationDetailForm from './components/NewsNotificationDetailForm';

class NewsNotificationDetailPage extends Component {
	componentDidMount() {
		const { query } = UrlParse(this.props.location.search, true);
		const { news_notification_id } = query;
		if (news_notification_id) {
			this.props.getNewsNotificationById(news_notification_id);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta } = prevProps.newsNotificationDetailPageProps;
		const { meta } = this.props.newsNotificationDetailPageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};

			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}
	}

	componentWillUnmount() {
		this.props.reset();
	}

	onSubmit = data => {
		const { query } = UrlParse(this.props.location.search, true);
		const { id } = query;
		this.props.onSubmit({
			...data,
			news_id: id
		});
	}

	onSend = data => {
		const { query } = UrlParse(this.props.location.search, true);
		const { news_notification_id } = query;
		this.props.onSend(news_notification_id);
	}

	onSchedule = data => {
		const { query } = UrlParse(this.props.location.search, true);
		const { news_notification_id } = query;
		this.props.onSchedule(news_notification_id);
	}

	render() {
		const { newsNotificationDetailPageProps } = this.props;
		const { query } = UrlParse(this.props.location.search, true);
		const { id } = query;
		const { loading, loadingSubmit } = newsNotificationDetailPageProps;
		const sections = [
			{ key: '/news', content: 'News', link: true, onClick: () => this.props.history.push('/news') },
			{ key: `/news/id/notifications?id=${id}`, content: 'Detail', onClick: () => this.props.history.push(`/news/id/notifications?id=${id}`) },
			{ key: '', content: 'Notification', active: true }
		];

		if (loading) {
			return (<Loading />);
		}

		return (
			<div>
				<React.Fragment>
					<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
						<div>
							<Icon
								className="icon-bold"
								name="arrow left"
								onClick={() => this.props.history.push(`/news/id/notifications?id=${id}`)}
							/>
							<Breadcrumb
								divider="/"
								sections={sections}
							/>
						</div>
					</div>
					<Divider />
				</React.Fragment>
				<NewsNotificationDetailForm
					loadingSubmit={loadingSubmit}
					onSubmit={this.onSubmit}
					onSchedule={this.onSchedule}
					onSend={this.onSend}
				/>
			</div>
		);
	}
}

NewsNotificationDetailPage.propTypes = {
	newsNotificationDetailPageProps: PropTypes.object.isRequired,
	getNewsNotificationById: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onSchedule: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default compose(
	withAlert()
)(NewsNotificationDetailPage);
