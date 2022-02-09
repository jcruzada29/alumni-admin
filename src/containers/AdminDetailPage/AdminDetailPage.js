import React, { Component } from 'react';
import { Icon, Divider, Breadcrumb } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import UrlParse from 'url-parse';

import AdminsDetailForm from './components/AdminsDetailForm';
import Loading from '../../components/loading';

class AdminDetailPage extends Component {

	constructor() {
		super();
		this.state = {
			openDelete: false
		};
	}

	componentDidMount() {
		this.getAdminById();
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

	getAdminById() {
		const { query } = UrlParse(this.props.location.search, true);
		if (query.id) {
			this.props.getAdminById(query.id);
		}
	}

	onCloseModal = () => {
		this.setState({ openFormModal: false });
	}

	onDeleteConfirmation = () => {
		this.setState({ openDelete: true });
	}

	onCloseDeleteModal = () => {
		this.setState({ openDelete: false });
	}

	render() {
		const { pageProps, location } = this.props;
		const { loading, loadingSubmit } = pageProps;
		const { query } = UrlParse(location.search, true);
		let sections = [
			{ key: '/admins', content: 'Admins', link: true, onClick: () => this.props.navigateToAdminListPage() }
		];

		if(!query.id) {
			sections.push({ key: '', content: 'Create Admin', active: true });
		} else {
			sections.push({ key: '', content: 'Details', active: true });
		}

		if (loading) {
			return <Loading />;
		}

		return (
			<React.Fragment>
				<React.Fragment>
					<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
						<div>
							<Icon
								className="icon-bold"
								name="arrow left"
								onClick={() => this.props.navigateToAdminListPage()}
							/>
							<Breadcrumb
								divider="/"
								sections={sections}
							/>
						</div>
					</div>
					<Divider />
				</React.Fragment>
				<div className="bt-content-padded">
					<AdminsDetailForm
						loadingSubmit={loadingSubmit}
						onSubmit={this.props.onSubmit}
						openDelete={this.state.openDelete}
						onDeleteConfirmation={this.onDeleteConfirmation}
						onCloseDeleteModal={this.onCloseDeleteModal}
						onDeleteAdminById={this.props.deleteAdminById}
						location={location.search}
					/>
				</div>
			</React.Fragment>
		);
	}
}

AdminDetailPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getAdminById: PropTypes.func.isRequired,
	navigateToAdminListPage: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default withAlert()(AdminDetailPage);
