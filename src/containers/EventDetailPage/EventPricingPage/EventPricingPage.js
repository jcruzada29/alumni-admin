import React, { Component } from 'react';
import _ from 'lodash';
import { Icon, Table } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import UrlParse from 'url-parse';

import Loading from './../../../components/loading';
import LabelHelper from './../../../helpers/Label';
import EventPriceGroupForm from './components/EventPriceGroupForm';

class EventPricingPage extends Component {
	state = {
		openFormModal: false,
		openDelete: false
	};

	componentDidMount() {
		this.getEventPriceGroups();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	componentDidUpdate(prevProps, prevState) {
		const {
			meta: prevMeta,
			hasLoaded: prev_hasLoaded,
			hasSubmitted: prev_hasSubmitted,
			hasDeleted: prev_hasDeleted
		} = prevProps.pageProps;
		const {
			meta,
			hasLoaded,
			hasSubmitted,
			hasDeleted
		} = this.props.pageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};

			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}

		if (hasLoaded && hasLoaded !== prev_hasLoaded) {
			const { query } = UrlParse(this.props.location.search, true);
			if (query.id) {
				this.props.getEventUserTypes({ event_id: query.id });
			}
		}

		if (hasSubmitted && hasSubmitted !== prev_hasSubmitted) {
			this.getEventPriceGroups();
			this.onCloseModal();
		}

		if (hasDeleted && hasDeleted !== prev_hasDeleted) {
			this.getEventPriceGroups();
			this.onCloseDeleteModal();
			this.onCloseModal();
		}
	}

	getEventPriceGroups = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		if (query.id) {
			this.props.getEventPriceGroups({ event_id: query.id });
		}
	};

	onAddEventPriceGroup = () => {
		this.props.setnNullSelectedEventPriceGroup();
		this.setState({ openFormModal: true });
	}

	onEditEventPriceGroup = id => {
		this.props.getEventPriceGroupById(id);
		this.setState({ openFormModal: true });
	}

	onCloseModal = () => {
		this.props.setnNullSelectedEventPriceGroup();
		this.setState({ openFormModal: false });
	}

	onSubmit = fields => {
		const { query } = UrlParse(this.props.location.search, true);
		if (query.id) {
			this.props.onSubmit({
				event_id: query.id,
				fields
			});
		}
	}

	onDeleteConfirmation = () => {
		this.setState({ openDelete: true });
	}

	onCloseDeleteModal = () => {
		this.setState({ openDelete: false });
	}

	renderTableBody = event_price_groups => {
		if (_.isEmpty(event_price_groups)) {
			return (
				<Table.Row>
					<Table.Cell colSpan={4}>No Price Groups</Table.Cell>
				</Table.Row>
			);
		} else {
			return event_price_groups.map(field => {
				return (
					<Table.Row
						key={field.id}
						onClick={() => this.onEditEventPriceGroup(field.id)}
					>
						<Table.Cell>{field.name}</Table.Cell>
						<Table.Cell>{LabelHelper.eventPriceGroupType(field.type)}</Table.Cell>
						<Table.Cell>{field.min_person}</Table.Cell>
						<Table.Cell>
							<center>
								<Icon
									link
									name="edit"
									size="large"
									onClick={() => this.onEditEventPriceGroup(field.id)}
								/>
							</center>
						</Table.Cell>
					</Table.Row>
				);
			});
		}
	};

	render() {
		const { pageProps } = this.props;
		const {
			event_price_groups,
			loading,
			selected_event_price_group,
			loadingEventPriceGroup,
			hasLoadedEventPriceGroup,
			event_user_types,
			loadingEventUserTypes,
			loadingSubmit,
			loadingDelete
		} = pageProps;
		const { openFormModal, openDelete } = this.state;

		return (
			<div className="bt-content-padded">
				{(loading || loadingEventUserTypes) && <Loading />}
				{!loading && !loadingEventUserTypes && (
					<React.Fragment>
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<div className="component-buttons">
								<span onClick={() => this.onAddEventPriceGroup()}>
									<Icon
										name="plus square"
										className="icon-bold"
									/>
									Create Pricing Group
								</span>
							</div>
						</div>
						<Table striped>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Name</Table.HeaderCell>
									<Table.HeaderCell>Type</Table.HeaderCell>
									<Table.HeaderCell>Min Person</Table.HeaderCell>
									<Table.HeaderCell><center>Actions</center></Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>{this.renderTableBody(event_price_groups)}</Table.Body>
						</Table>
						<EventPriceGroupForm
							openFormModal={openFormModal}
							selectedEventPriceGroup={selected_event_price_group}
							loadingEventPriceGroup={loadingEventPriceGroup}
							hasLoadedEventPriceGroup={hasLoadedEventPriceGroup}
							loadingSubmit={loadingSubmit}
							onSubmit={this.onSubmit}
							onCloseModal={this.onCloseModal}

							eventUserTypes={event_user_types}
							loadingEventUserTypes={loadingEventUserTypes}

							openDelete={openDelete}
							onDeleteEventPriceGroupById={this.props.onDeleteEventPriceGroupById}
							loadingDelete={loadingDelete}
							onDeleteConfirmation={this.onDeleteConfirmation}
							onCloseDeleteModal={this.onCloseDeleteModal}
						/>
					</React.Fragment>
				)}
			</div>
		);
	}
}

EventPricingPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getEventPriceGroups: PropTypes.func.isRequired,
	getEventPriceGroupById: PropTypes.func.isRequired,
	getEventUserTypes: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onDeleteEventPriceGroupById: PropTypes.func.isRequired,
	setnNullSelectedEventPriceGroup: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default withAlert()(EventPricingPage);
