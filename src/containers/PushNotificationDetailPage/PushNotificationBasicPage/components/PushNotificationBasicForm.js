import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import {
	renderFormInput,
	renderFormTextArea,
	validateRequired,
	renderDateInput
} from '../../../../helpers/redux_form';

let PushNotificationBasicForm = props => {
	const {
		loadingSubmit,
		onSubmit,
		onSend,
		onSchedule,
		pushNotification,
		// redux-form props
		handleSubmit,
		pristine,
		submitting,
		invalid
	} = props;

	const disabled = pushNotification && pushNotification.status !== 'pending';

	return (
		<React.Fragment>
			<Grid>
				<Grid.Row>
					<Grid.Column width={8}>
						<Segment>
							<h4>Basic Information</h4>
							<Form>
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
											component={renderDateInput}
											name="delivery_date"
											placeholder="Shedule delivery date"
											validate={[validateRequired]}
											disabled={disabled}
										/>
										<label>Schedule delivery date</label>
									</Form.Field>
								</Form.Group>
							</Form>
						</Segment>
						<Segment>
							<h4>Notification Content</h4>
							<Form>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormInput}
											name="subject"
											placeholder="Push Notification Subject"
											validate={[validateRequired]}
											disabled={disabled}
										/>
										<label>Push Notification Subject</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormTextArea}
											rows={10}
											name="content"
											placeholder="Push notification content"
											validate={[validateRequired]}
											disabled={disabled}
										/>
									</Form.Field>
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
								{(!pushNotification || (pushNotification && pushNotification.status === 'pending')) && (
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
								{pushNotification && pushNotification.status === 'pending' && (
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
		</React.Fragment>
	);
};

PushNotificationBasicForm = reduxForm({
	form: 'PushNotificationBasicForm',
	enableReinitialize: true
})(PushNotificationBasicForm);

PushNotificationBasicForm = connect(state => {
	return {
		pushNotification: state.pushNotificationDetailPage.pushNotificationBasicPageReducer.push_notification,
		initialValues: state.pushNotificationDetailPage.pushNotificationBasicPageReducer.push_notification
	};
})(PushNotificationBasicForm);

export default PushNotificationBasicForm;
