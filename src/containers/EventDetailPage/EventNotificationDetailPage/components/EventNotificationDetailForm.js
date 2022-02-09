import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Button, Form } from 'semantic-ui-react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
	renderFormInput,
	renderFormTextArea,
	renderFormSelect,
	renderDateInput,
	validateRequired
} from '../../../../helpers/redux_form';
import renderEditor from '../../../../helpers/renderEditor';
import OptionHelper from '../../../../helpers/Option';
import LabelHelper from '../../../../helpers/Label';

let EventNotificationDetialForm = props => {
	const {
		loadingSubmit,
		onSubmit,
		onSchedule,
		onSend,
		eventNotification,
		handleSubmit,
		pristine,
		submitting,
		invalid,
		// current values
		selectedType
	} = props;

	const disabled = eventNotification && eventNotification.status !== 'pending';

	return (
		<div className="bt-content-padded">
			<Grid>
				<Grid.Row>
					<Grid.Column width={8}>
						<Segment>
							<h4>Settings</h4>
							<Form>
								{
									Boolean(eventNotification) &&
									<Form.Group widths="equal">
										<Form.Field>
											<Form.Input
												value={LabelHelper.notificationStatus(eventNotification.status)}
												disabled
											/>
											<label>Status</label>
										</Form.Field>
										<Form.Field />
									</Form.Group>
								}
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormInput}
											name="name"
											placeholder="Name of notification"
											validate={[validateRequired]}
											disabled={disabled}
										/>
										<label>Name of notification</label>
									</Form.Field>
									<Form.Field>
										<Field
											component={renderFormSelect}
											name="type"
											placeholder="Type"
											options={OptionHelper.notificationTypes()}
											validate={[validateRequired]}
											disabled={disabled || eventNotification}
										/>
										<label>Type</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderDateInput}
											name="delivery_date"
											placeholder="Date"
											clearable
											closable
											dateFormat="YYYY-MM-DD"
											animation="none"
											hideMobileKeyboard
											validate={[validateRequired]}
											disabled={disabled}
										/>
										<label>Schedule delivery date</label>
									</Form.Field>
									<Form.Field>
										<Field
											component={renderFormSelect}
											name="recipient"
											placeholder="Recipient"
											options={OptionHelper.eventNotificationRecipients()}
											validate={[validateRequired]}
											disabled={disabled}
										/>
										<label>Recipient</label>
									</Form.Field>
								</Form.Group>
							</Form>
						</Segment>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={8}>
						<Segment>
							<h4>Message Content</h4>
							<Form>
								<Form.Group widths="equal">
									<Field
										component={renderFormInput}
										name="subject"
										placeholder="Subject"
										validate={[validateRequired]}
										disabled={disabled}
									/>
								</Form.Group>
								<Form.Group style={{ display: 'block' }}>
									<Field
										component={selectedType === 'email' ? renderEditor : renderFormTextArea}
										name="content"
										placeholder="Body"
										validate={[validateRequired]}
										style={{ minHeight: 300 }}
										readOnly={disabled}
									/>
								</Form.Group>
							</Form>
						</Segment>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={8}>
						<Grid>
							<Grid.Column
								floated="left"
								width={8}
							>
								{(!eventNotification || (eventNotification && eventNotification.status === 'pending')) && (
									<Button
										content="Save"
										primary
										icon="save"
										disabled={submitting || invalid || loadingSubmit}
										onClick={handleSubmit((data) => onSubmit(data))}
									/>
								)}
							</Grid.Column>
							<Grid.Column
								floated="right"
								width={8}
							>
								{eventNotification && eventNotification.status === 'pending' && (
									<Button.Group>
										<Button
											content="Schedule Send"
											negative
											icon="clock"
											loading={loadingSubmit}
											disabled={!pristine || submitting || invalid || loadingSubmit}
											onClick={() => onSchedule()}
										/>
										<Button.Or />
										<Button
											content="Send Now"
											negative
											icon="send"
											loading={loadingSubmit}
											disabled={!pristine || submitting || invalid || loadingSubmit}
											onClick={handleSubmit((data) => onSend())}
										/>
									</Button.Group>

								)}
							</Grid.Column>
						</Grid>
					</Grid.Column>
				</Grid.Row>
			</Grid>



		</div>
	);
};

EventNotificationDetialForm = reduxForm({
	form: 'EventNotificationDetialForm',
	enableReinitialize: true
})(EventNotificationDetialForm);

const selector = formValueSelector('EventNotificationDetialForm');

EventNotificationDetialForm = connect(
	state => ({
		selectedType: selector(state, 'type'),
		eventNotification: state.eventDetailPage.eventNotificationDetailPageReducer.event_notification,
		initialValues: state.eventDetailPage.eventNotificationDetailPageReducer.event_notification
	})
)(EventNotificationDetialForm);

export default EventNotificationDetialForm;
