import React, { Component } from 'react';

import { Icon, Divider, Breadcrumb } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import { compose } from 'redux';

import PropTypes from 'prop-types';
import UrlParse from 'url-parse';

import ParkingPrivilegeBasicForm from './components/ParkingPrivilegeBasicForm';
import Loading from '../../../components/loading';

class ParkingPrivilegeBasicPage extends Component {
	componentDidMount() {
		this.getParkingPrivilegeById();
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

	getParkingPrivilegeById() {
		const { query } = UrlParse(this.props.location.search, true);
		if (query.id) {
			this.props.getParkingPrivilegeById(query.id);
		}
	}

	render() {
		const { pageProps, location } = this.props;
		const { loading, loadingSubmit } = pageProps;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/parking-privileges', content: 'Parking Privileges', link: true, onClick: () => this.props.navigateToParkingPrivilegeListPage() },
			{ key: '', content: 'Create Privilege', active: true }
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
									onClick={() => this.props.navigateToParkingPrivilegeListPage()}
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
					<ParkingPrivilegeBasicForm
						loadingSubmit={loadingSubmit}
						onSubmit={this.props.onSubmit}
					/>
				</div>
			</React.Fragment>
		);
	}
}

ParkingPrivilegeBasicPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getParkingPrivilegeById: PropTypes.func.isRequired,
	navigateToParkingPrivilegeListPage: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default compose(
	withAlert()
)(ParkingPrivilegeBasicPage);