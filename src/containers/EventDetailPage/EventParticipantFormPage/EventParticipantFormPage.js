import React, { Component } from 'react';
import _ from 'lodash';
import { Icon, Grid, Table, Button, Segment } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import UrlParse from 'url-parse';

import Loading from './../../../components/loading';
import LabelHelper from './../../../helpers/Label';
import EventFormFieldForm from './components/EventFormFieldForm';

class EventParticipantFormPage extends Component {
	state = {
		openFormModal: false,
		openDelete: false
	};

	componentDidMount() {
		this.getEventFormFields();
	}

	componentWillUnmount() {
		this.props.reset();
	}

	componentDidUpdate(prevProps, prevState) {
		const {
			meta: prevMeta,
			hasSubmitted: prev_hasSubmitted,
			hasDeleted: prev_hasDeleted
		} = prevProps.pageProps;
		const {
			meta,
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

		if (hasSubmitted && hasSubmitted !== prev_hasSubmitted) {
			this.getEventFormFields();
			this.onCloseModal();
		}

		if (hasDeleted && hasDeleted !== prev_hasDeleted) {
			this.getEventFormFields();
			this.onCloseDeleteModal();
			this.onCloseModal();
		}
	}

	getEventFormFields = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		if (query.id) {
			this.props.getEventFormFields({ event_id: query.id });
		}
	};

	onAddEventFormField = () => {
		this.props.setnNullSelectedEventFormField();
		this.setState({ openFormModal: true });
	}

	onEditEventFormField = id => {
		this.props.getEventFormFieldById(id);
		this.setState({ openFormModal: true });
	}

	onCloseModal = () => {
		this.props.setnNullSelectedEventFormField();
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

	renderTableBody = event_form_fields => {
		if (_.isEmpty(event_form_fields)) {
			return (
				<Table.Row>
					<Table.Cell colSpan={6}>No Form Fields</Table.Cell>
				</Table.Row>
			);
		}
		const defaultFields = [];
		const userFields = [];
		event_form_fields.filter(f => {
			!f.is_default ? defaultFields.push(f) : userFields.push(f);
		});
		// show default fields first
		event_form_fields = userFields.concat(defaultFields);

		return event_form_fields.map(field => {
			return (
				<Table.Row
					key={field.id}
					onClick={() => !field.is_default && this.onEditEventFormField(field.id)}
				>
					<Table.Cell>{field.name}</Table.Cell>
					<Table.Cell>{LabelHelper.eventFormFieldType(field.type)}</Table.Cell>
					<Table.Cell>{_.has(field.settings, 'is_required') ? (field.settings.is_required ? 'Yes' : 'No') : 'No'}</Table.Cell>
					<Table.Cell colSpan={field.is_default && 2}>{!field.is_default && field.sort}</Table.Cell>
					{
						!field.is_default &&
							<Table.Cell>
								<center>
									<Icon
										link
										name="edit"
										size="large"
										onClick={() => this.onEditEventFormField(field.id)}
									/>
								</center>
							</Table.Cell>
					}
				</Table.Row>
			);
		});

	};

	render() {
		const { pageProps } = this.props;
		const {
			event_form_fields,
			loading,
			selected_event_form_field,
			loadingEventFormField,
			hasLoadedEventFormField,
			loadingSubmit,
			loadingDelete
		} = pageProps;
		const { openFormModal, openDelete } = this.state;

		return (
			<div className="bt-content-padded">
				<Grid>
					<Grid.Row>
						<Grid.Column width={8}>
							{loading && <Loading />}
							{!loading && (
								<Segment clearing>
									<h4 style={{ paddingBottom: 20 }}>Additional Fields</h4>
									<Button
										primary
										style={{ marginTop: -58, marginRight: 10 }}
										floated="right"
										onClick={() => this.onAddEventFormField()}
									>Add</Button>
									<Table striped>
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>Field Name</Table.HeaderCell>
												<Table.HeaderCell>Field Type</Table.HeaderCell>
												<Table.HeaderCell>Required?</Table.HeaderCell>
												<Table.HeaderCell>Order</Table.HeaderCell>
												<Table.HeaderCell><center>Actions</center></Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>{this.renderTableBody(event_form_fields)}</Table.Body>
									</Table>
								</Segment>
							)}
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<EventFormFieldForm
					openFormModal={openFormModal}
					selectedEventFormField={selected_event_form_field}
					loadingEventFormField={loadingEventFormField}
					hasLoadedEventFormField={hasLoadedEventFormField}
					loadingSubmit={loadingSubmit}
					onSubmit={this.onSubmit}
					onCloseModal={this.onCloseModal}

					openDelete={openDelete}
					onDeleteEventFormFieldById={this.props.onDeleteEventFormFieldById}
					loadingDelete={loadingDelete}
					onDeleteConfirmation={this.onDeleteConfirmation}
					onCloseDeleteModal={this.onCloseDeleteModal}
				/>
			</div>
		);
	}
}

EventParticipantFormPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getEventFormFields: PropTypes.func.isRequired,
	getEventFormFieldById: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onDeleteEventFormFieldById: PropTypes.func.isRequired,
	setnNullSelectedEventFormField: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default withAlert()(EventParticipantFormPage);
