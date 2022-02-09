import React, { Component } from 'react';
import { Icon, Divider, Breadcrumb } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import UrlParse from 'url-parse';
import Loading from '../../../components/loading';
import ParkingPrivilegeNotificationDetailForm from './components/ParkingPrivilegeNotificationDetailForm';

class ParkingPrivilegeNotificationDetailPage extends Component {
	componentDidMount() {
		const { query } = UrlParse(this.props.location.search, true);
		const { parking_notification_id } = query;
		if (parking_notification_id) {
			this.props.getParkingNotificationById(parking_notification_id);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta } = prevProps.parkingPrivilegeNotificationDetailPageProps;
		const { meta } = this.props.parkingPrivilegeNotificationDetailPageProps;

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
			parking_id: id
		});
	}

	onSend = data => {
		const { query } = UrlParse(this.props.location.search, true);
		const { parking_notification_id } = query;
		this.props.onSend(parking_notification_id);
	}

	onSchedule = data => {
		const { query } = UrlParse(this.props.location.search, true);
		const { parking_notification_id } = query;
		this.props.onSchedule(parking_notification_id);
	}

	render() {
		const { parkingPrivilegeNotificationDetailPageProps } = this.props;
		const { query } = UrlParse(this.props.location.search, true);
		const { id } = query;
		const { loading, loadingSubmit } = parkingPrivilegeNotificationDetailPageProps;
		const sections = [
			{ key: '/parking-privileges', content: 'Parking Privileges', link: true, onClick: () => this.props.history.push('/parking-privileges') },
			{ key: `/parking-privileges/id/notifications?id=${id}`, content: 'Detail', onClick: () => this.props.history.push(`/parking-privileges/id/notifications?id=${id}`) },
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
								onClick={() => this.props.history.push(`/parking-privileges/id/notifications?id=${id}`)}
							/>
							<Breadcrumb
								divider="/"
								sections={sections}
							/>
						</div>
					</div>
					<Divider />
				</React.Fragment>
				<ParkingPrivilegeNotificationDetailForm
					loadingSubmit={loadingSubmit}
					onSubmit={this.onSubmit}
					onSchedule={this.onSchedule}
					onSend={this.onSend}
				/>
			</div>
		);
	}
}

ParkingPrivilegeNotificationDetailPage.propTypes = {
	parkingPrivilegeNotificationDetailPageProps: PropTypes.object.isRequired,
	getParkingNotificationById: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onSchedule: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default compose(
	withAlert()
)(ParkingPrivilegeNotificationDetailPage);
