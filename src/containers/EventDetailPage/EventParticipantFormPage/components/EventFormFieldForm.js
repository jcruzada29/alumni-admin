import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Segment, Form, Button } from 'semantic-ui-react';
import { Field, formValueSelector, reduxForm } from 'redux-form';

import {
	renderFormInput,
	renderFormSelect,
	renderFormTextArea,
	validateRequired,
	validateNumberMin
} from '../../../../helpers/redux_form';
import LabelHelper from '../../../../helpers/Label';
import CommonEnum from '../../../../constants/CommonEnum';

// custom redux-form validations
const validateNumberMin1 = value => {
	return validateNumberMin(+value, 1);
};

class EventFormFieldForm extends Component {
	componentDidUpdate(prevProps) {
		const {
			openFormModal: prev_openFormModal,
			hasLoadedEventFormField: prev_hasLoadedEventFormField
		} = prevProps;
		const {
			openFormModal,
			hasLoadedEventFormField,
			selectedEventFormField,
			change
		} = this.props;

		if (openFormModal && openFormModal !== prev_openFormModal) {
			const { reset } = this.props;
			this.setState({ hasInitialized: false });
			reset();
		}

		if (hasLoadedEventFormField && hasLoadedEventFormField !== prev_hasLoadedEventFormField) {
			const {
				type,
				enabled,
				sort,
				is_required,
				name,
				placeholder,
				dropdown_values
			} = selectedEventFormField;

			change('type', type);
			change('enabled', enabled);
			change('sort', sort);
			change('is_required', is_required);
			change('name', name);
			change('placeholder', placeholder);
			change('dropdown_values', dropdown_values);
		}
	}

	render() {
		const {
			openFormModal,
			selectedEventFormField,
			loadingEventFormField,
			loadingSubmit,
			onSubmit,
			onCloseModal,
			openDelete,
			onDeleteEventFormFieldById,
			loadingDelete,
			onDeleteConfirmation,
			onCloseDeleteModal,
			// redux-form formValueSelector values
			selectedType,
			// redux-form props
			handleSubmit,
			pristine,
			submitting,
			invalid
		} = this.props;

		// Select field options
		const optionsFormFieldType = CommonEnum.event_form_field_types.map(o => ({
			value: o,
			text: LabelHelper.eventFormFieldType(o)
		}));
		const optionsYesNo = [{
			value: 'yes',
			text: 'Yes'
		}, {
			value: 'no',
			text: 'No'
		}];

		return (
			<React.Fragment>
				<Modal
					size="tiny"
					open={openFormModal}
					onClose={() => onCloseModal()}
					closeIcon={{ name: 'close' }}
					closeOnDimmerClick={false}
				>
					<Modal.Header>Additional Field</Modal.Header>
					<Modal.Content>
						<Segment loading={loadingEventFormField}>
							<h4>Settings</h4>
							<Form>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormSelect}
											name="type"
											placeholder="Field Type"
											clearable
											options={optionsFormFieldType}
											validate={[validateRequired]}
										/>
										<label>Field Type</label>
									</Form.Field>
									<Form.Field>
										<Field
											component={renderFormSelect}
											name="enabled"
											placeholder="Enabled?"
											clearable
											options={optionsYesNo}
											validate={[validateRequired]}
										/>
										<label>Enabled?</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormInput}
											type="number"
											name="sort"
											placeholder="Order"
											validate={[validateRequired, validateNumberMin1]}
										/>
										<label>Order</label>
									</Form.Field>
									<Form.Field>
										<Field
											component={renderFormSelect}
											name="is_required"
											placeholder="Required?"
											clearable
											options={optionsYesNo}
											validate={[validateRequired]}
										/>
										<label>Required?</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormInput}
											name="name"
											placeholder="Field Name"
											validate={[validateRequired]}
										/>
										<label>Field Name</label>
									</Form.Field>
									<Form.Field>
										<Field
											component={renderFormInput}
											name="placeholder"
											placeholder="Field Placeholder"
											validate={[validateRequired]}
										/>
										<label>Field Placeholder</label>
									</Form.Field>
								</Form.Group>
								{selectedType === 'dropdown' && (
									<Form.Group widths="equal">
										<Form.Field>
											<Field
												component={renderFormTextArea}
												rows={10}
												name="dropdown_values"
												placeholder="Dropdown values (1 line per option)"
												validate={[validateRequired]}
											/>
											<label>Dropdown values (1 line per option)</label>
										</Form.Field>
									</Form.Group>
								)}
							</Form>
						</Segment>
					</Modal.Content>
					<Modal.Actions>
						{selectedEventFormField && (
							<Button
								negative
								disabled={submitting || loadingSubmit || loadingDelete}
								onClick={() => onDeleteConfirmation()}
								content="Delete"
								style={{ float: 'left' }}
							/>
						)}
						<Button
							basic
							disabled={submitting || loadingSubmit || loadingDelete}
							onClick={() => onCloseModal()}
							content="Cancel"
						/>
						<Button
							primary
							disabled={pristine || submitting || invalid || loadingSubmit || loadingDelete}
							onClick={handleSubmit(data => onSubmit(data))}
							content="Save"
						/>
					</Modal.Actions>
				</Modal>

				<Modal
					open={openDelete}
					size="mini"
					onClose={() => onCloseDeleteModal()}
					closeIcon={{ name: 'close' }}
					closeOnDimmerClick={false}
				>
					<Modal.Header>Delete Form Field</Modal.Header>
					<Modal.Content>
						<p>Are you sure to delete this form field?</p>
					</Modal.Content>
					<Modal.Actions>
						<Button
							default
							onClick={() => onCloseDeleteModal()}
						>
							No
						</Button>
						<Button
							primary
							disabled={loadingDelete}
							onClick={() => onDeleteEventFormFieldById(selectedEventFormField.id)}
						>
							Yes
						</Button>
					</Modal.Actions>
				</Modal>
			</React.Fragment>
		);
	}
}

EventFormFieldForm = reduxForm({
	form: 'EventFormFieldForm'
})(EventFormFieldForm);

const selector = formValueSelector('EventFormFieldForm');
EventFormFieldForm = connect(state => {
	const selectedType = selector(state, 'type');
	return {
		selectedType
	};
})(EventFormFieldForm);

export default EventFormFieldForm;
