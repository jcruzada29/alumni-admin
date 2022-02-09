import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Modal, Segment, Form, Button, Table, Input } from 'semantic-ui-react';
import LabelHelper from '../../../../helpers/Label';

class EventRegistrationDetail extends Component {
	state = {
		markId: null,
		markStatus: null,
		selected_event_registration: null
	};


	componentDidUpdate(prevProps, prevState) {
		const {
			isSuccess: prev_isSuccess,
			selected_event_registration: prev_selectedEventRegistration
		} = prevProps.pageProps;
		const {
			isSuccess, selected_event_registration
		} = this.props.pageProps;
		if (selected_event_registration && isSuccess && isSuccess !== prev_isSuccess) {
			this.props.getEventRegistrationById(selected_event_registration.id);
		}

		if (selected_event_registration && selected_event_registration !== prev_selectedEventRegistration) {
			this.setState({
				selected_event_registration
			});
		}
	}

	onClickMarkAsPaidOrRefunded = ({ id, status }) => {
		// status = ['paid', 'refunded']
		this.setState({
			markId: id,
			markStatus: status
		});
	}

	onCloseConfirmationModal = () => {
		this.setState({
			markStatus: null,
			markId: null
		});
	}

	onMarkSubmit= () => {
		const { markId, markStatus } = this.state;
		this.props.updateTransactionById({id: markId, status: markStatus });
		this.setState({
			markId: null,
			markStatus: null
		});
	}

	// Fix: not aligned column headers
	participantsFieldsHeader = (fields) => {
		const defaultFields = [];
		const additionalFields = [];
		fields.map(field => {
			if (field.name !== 'Student ID') {
				if(field.name === 'Family Name' || field.name === 'First Name' || field.name === 'Email' || field.name === 'Mobile No.') {
					defaultFields.push(
						<Table.Cell key={field.id}>
							{_.get(field, 'name', '')}
						</Table.Cell>
					);
				} else {
					additionalFields.push(
						<Table.Cell key={field.id}>
							{_.get(field, 'name', '')}
						</Table.Cell>
					);
				}
			}
		});
		return defaultFields.concat(additionalFields);
	}

	// Fix: not aligned column field values
	participantsFieldsValue = (participants) => {
		const defaultFieldsValues = [];
		const additionalFieldsValues = [];
		participants.map(participant => {
			if (participant.name !== 'Student ID') {
				if(participant.name === 'Family Name' || participant.name === 'First Name' || participant.name === 'Email' || participant.name === 'Mobile No.') {
					defaultFieldsValues.push(
						<Table.Cell key={participant.id}>
							{_.get(participant, 'value') || 'none'}
						</Table.Cell>
					);
				} else {
					additionalFieldsValues.push(
						<Table.Cell key={participant.id}>
							{_.get(participant, 'value') || 'none'}
						</Table.Cell>
					);
				}
			}
		});
		return defaultFieldsValues.concat(additionalFieldsValues);
	}

	onCloseModal = () => {
		this.setState({
			selected_event_registration: null
		});
		this.props.onCloseModal();
	}

	renderBasicInformation = () => {
		const { selected_event_registration } = this.state;
		const { status, total_price, payment_status, reg_date } = selected_event_registration || {};

		return (
			<Form>
				<Form.Group widths="equal">
					<Form.Field>
						<Input
							defaultValue={_.get(selected_event_registration, 'status') ? LabelHelper.eventStatus(status) : null}
							disabled
						/>
						<label>Status</label>
					</Form.Field>
					<Form.Field>
						<Input
							defaultValue={_.get(selected_event_registration, 'reg_date') ? moment(reg_date).format('YYYY-MM-DD') : null}
							disabled
						/>
						<label>Registration Date</label>
					</Form.Field>
				</Form.Group>
				<Form.Group widths="equal">
					<Form.Field>
						<Input
							defaultValue={_.get(selected_event_registration, 'payment_status') ? LabelHelper.paymentStatus(payment_status) : null}
							disabled
						/>
						<label>Payment Status</label>
					</Form.Field>
					<Form.Field>
						<Input
							defaultValue={_.get(selected_event_registration, 'total_price') ? total_price : null}
							disabled
						/>
						<label>Total Price</label>
					</Form.Field>
				</Form.Group>
			</Form>
		);
	}

	render() {
		const {
			openDetailModal,
			selected_event_registration,
			loadingDetailPage,
			loadingSubmit,
			loadingMarkAsPaid: loadingOnSubmitTransaction
		} = this.props;
		const { markStatus, selected_event_registration: stateSelectedEventRegistration } = this.state;

		const { status, total_price, participants, transactions, payment_status, reg_date, form_fields } = selected_event_registration;

		return (
			<React.Fragment>
				<Modal
					size="small"
					open={openDetailModal}
					onClose={() => this.onCloseModal()}
					closeIcon={{ name: 'close' }}
					closeOnDimmerClick={false}
				>
					<Modal.Header>Pricing Group</Modal.Header>
					<Modal.Content>
						<Segment loading={loadingDetailPage}>
							<h4>Basic Information</h4>
							{ this.renderBasicInformation() }
						</Segment>
						<Segment loading={loadingDetailPage}>
							<h4>Participants</h4>
							<Table 
								celled
								stackable
							>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>
											Type
										</Table.HeaderCell>
										<Table.HeaderCell>
											Student ID
										</Table.HeaderCell>
										{/* we will based on form fields value so even admin will edit form field, no effect */}
										{participants && participants.length > 0 && participants[0].form_field_values && participants[0].form_field_values.length > 0 && this.participantsFieldsHeader(participants[0].form_field_values)}
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{participants && participants.length > 0 && 
										participants.map((part, index) => {
											const idx = part.form_field_values.findIndex(obj => obj.name === 'Student ID');
											return (
												<Table.Row key={part.id}>
													<Table.Cell>
														{part.event_ut_name}
													</Table.Cell>
													<Table.Cell>
														{ idx ? _.get(part.form_field_values[idx], 'value') : '' }
													</Table.Cell>
													{part && part.form_field_values && this.participantsFieldsValue(part.form_field_values)}
												</Table.Row>
											);
										})}
								</Table.Body>
							</Table>
						</Segment>
						<Segment loading={loadingDetailPage}>
							<h4>Transactions (Payments)</h4>
							<Table celled>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>
											Invoice Number
										</Table.HeaderCell>
										<Table.HeaderCell>
											Status
										</Table.HeaderCell>
										<Table.HeaderCell>
											Method
										</Table.HeaderCell>
										<Table.HeaderCell>
											Amount
										</Table.HeaderCell>
										<Table.HeaderCell>
											Actions
										</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{transactions && transactions.length > 0 && transactions.map(txn => {
										const { invoice_number, id, status, payment_method, amount } = txn;
										return (
											<Table.Row key={id}>
												<Table.Cell>
													{invoice_number}
												</Table.Cell>
												<Table.Cell>
													{LabelHelper.paymentStatus(status)}
												</Table.Cell>
												<Table.Cell>
													{LabelHelper.paymentMethod(payment_method)}
												</Table.Cell>
												<Table.Cell>
													{amount}
												</Table.Cell>
												<Table.Cell>
													{status === 'pending' && 
													<Button
														color="red"
														disabled={loadingDetailPage || loadingSubmit}
														onClick={ () => this.onClickMarkAsPaidOrRefunded({ id, status: 'paid' })}
													>
														Mark as Paid
													</Button>}
													{status === 'paid' && 
													<Button
														primary
														disabled={loadingDetailPage || loadingSubmit}
														onClick={ () => this.onClickMarkAsPaidOrRefunded({ id, status: 'refunded'})}
													>
														Mark as Refunded
													</Button>}
												</Table.Cell>
											</Table.Row>
										);
									})}
								</Table.Body>
							</Table>
						</Segment>
					</Modal.Content>
					<Modal.Actions style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<Button
							primary
							disabled={loadingDetailPage || loadingOnSubmitTransaction}
							onClick={() => console.log('resend arf')}
							content="Resend Confirmation Email"
						/>
						<Button
							disabled={loadingDetailPage || loadingOnSubmitTransaction}
							onClick={() => this.onCloseModal()}
							content="Cancel"
						/>
					</Modal.Actions>
				</Modal>

				<Modal
					open={Boolean(markStatus)}
					size="mini"
					onClose={() => this.onCloseConfirmationModal()}
					closeIcon={{ name: 'close' }}
					closeOnDimmerClick={false}
				>
					<Modal.Header>Confirmation</Modal.Header>
					<Modal.Content>
						<p>{`Are you sure to manually mark this as ${markStatus === 'paid' ? 'paid' : 'refunded'}?`}</p>
					</Modal.Content>
					<Modal.Actions>
						<Button
							default
							onClick={() => this.onCloseConfirmationModal()}
						>
							No
						</Button>
						<Button
							primary
							disabled={loadingOnSubmitTransaction}
							onClick={() => this.onMarkSubmit()}
						>
							Yes
						</Button>
					</Modal.Actions>
				</Modal>
			</React.Fragment>
		);
	}
};


export default EventRegistrationDetail;
