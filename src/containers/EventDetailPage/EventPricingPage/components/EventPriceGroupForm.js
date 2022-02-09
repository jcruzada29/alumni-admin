import React, { Component } from 'react';
import _ from 'lodash';
import { Modal, Segment, Form, Button, Table } from 'semantic-ui-react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import {
	renderFormInput,
	renderFormSelect,
	validateRequired,
	validateNumberMin
} from '../../../../helpers/redux_form';
import LabelHelper from '../../../../helpers/Label';
import CommonEnum from '../../../../constants/CommonEnum';

// custom redux-form validations
const validateNumberMin1 = value => {
	return validateNumberMin(+value, 0);
};

const validateEventUserTypes = value => {
	return _.isArray(value) && value.length > 0 ? undefined : 'Add at least one User Type';
};

const renderUserTypePrices = ({
	fields
}) => {

	return (
		<Table style={{ maring: 0 }}>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell width={10}>Name</Table.HeaderCell>
					<Table.HeaderCell width={6}>Price (HKD)</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{fields.length === 0 &&
					<Table.Row key={0}>
						<Table.Cell colSpan={2}>No User Types</Table.Cell>
					</Table.Row>
				}
				{fields.map((member, index) => {
					const userTypePrice = fields.get(index);

					return (
						<Table.Row key={index}>
							<Table.Cell>{userTypePrice.event_ut_name}</Table.Cell>
							<Table.Cell>
								<Form style={{ padding: 0 }}>
									<Form.Group
										widths="equal"
										style={{ margin: 0 }}
									>
										<Field
											component={renderFormInput}
											type="number"
											name={`${member}.price`}
											placeholder="Enter price"
											validate={[validateRequired, validateNumberMin1]}
										/>
									</Form.Group>
								</Form>
							</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table>
	);
};

class EventPriceGroupForm extends Component {
	state = {
		hasInitialized: false
	};

	componentDidUpdate(prevProps) {
		const {
			openFormModal: prev_openFormModal,
			hasLoadedEventPriceGroup: prev_hasLoadedEventPriceGroup
		} = prevProps;
		const {
			openFormModal,
			hasLoadedEventPriceGroup,
			selectedEventPriceGroup,
			eventUserTypes,
			change
		} = this.props;
		const { hasInitialized } = this.state;

		if (openFormModal && openFormModal !== prev_openFormModal) {
			const { reset } = this.props;
			this.setState({ hasInitialized: false });
			reset();
		}

		if (eventUserTypes) {
			if (hasLoadedEventPriceGroup && hasLoadedEventPriceGroup !== prev_hasLoadedEventPriceGroup) {
				const { name, type, min_person, prices } = selectedEventPriceGroup;

				change('name', name);
				change('type', type);
				change('min_person', min_person);

				const userTypesPrices = eventUserTypes.map(userType => {
					const priceGroupPrice = prices.find(o => o.event_ut_id === userType.id);
					return {
						event_ut_id: userType.id,
						event_ut_name: userType.name,
						price: priceGroupPrice ? priceGroupPrice.price : null
					};
				});
				change('prices', userTypesPrices);
				this.setState({ hasInitialized: true });
			}

			if (!hasInitialized && !selectedEventPriceGroup) {
				const userTypesPrices = eventUserTypes.map(userType => {
					return {
						event_ut_id: userType.id,
						event_ut_name: userType.name,
						price: null
					};
				});
				change('prices', userTypesPrices);
				this.setState({ hasInitialized: true });
			}
		}
	}

	render() {
		const {
			openFormModal,
			selectedEventPriceGroup,
			loadingEventPriceGroup,
			loadingSubmit,
			onSubmit,
			onCloseModal,
			loadingEventUserTypes,
			openDelete,
			onDeleteEventPriceGroupById,
			loadingDelete,
			onDeleteConfirmation,
			onCloseDeleteModal,
			// redux-form props
			handleSubmit,
			pristine,
			submitting,
			invalid
		} = this.props;

		const optionsPriceGroupType = CommonEnum.event_price_group_types.map(o => ({
			value: o,
			text: LabelHelper.eventPriceGroupType(o)
		}));

		return (
			<React.Fragment>
				<Modal
					size="small"
					open={openFormModal}
					onClose={() => onCloseModal()}
					closeIcon={{ name: 'close' }}
					closeOnDimmerClick={false}
				>
					<Modal.Header>Pricing Group</Modal.Header>
					<Modal.Content>
						<Segment loading={loadingEventPriceGroup}>
							<h4>Basic Information</h4>
							<Form>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormInput}
											name="name"
											placeholder="Name"
											validate={[validateRequired]}
										/>
										<label>Name</label>
									</Form.Field>
									<Form.Field>
										<Field
											component={renderFormSelect}
											name="type"
											placeholder="Type"
											clearable
											options={optionsPriceGroupType}
											validate={[validateRequired]}
										/>
										<label>Type</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormInput}
											type="number"
											name="min_person"
											placeholder="Minimum number of persons"
											validate={[validateRequired, validateNumberMin1]}
										/>
										<label>Minimum number of persons to use this pricing group</label>
									</Form.Field>
									<Form.Field />
								</Form.Group>
							</Form>
						</Segment>
						<Segment loading={loadingEventPriceGroup || loadingEventUserTypes}>
							<h4>Pricing</h4>
							<FieldArray
								name="prices"
								component={renderUserTypePrices}
								validate={[validateEventUserTypes]}
							/>
						</Segment>
					</Modal.Content>
					<Modal.Actions>
						{selectedEventPriceGroup && (
							<Button
								negative
								disabled={submitting || loadingEventPriceGroup || loadingEventUserTypes || loadingSubmit || loadingDelete}
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
							disabled={pristine || submitting || invalid || loadingEventPriceGroup || loadingEventUserTypes || loadingSubmit || loadingDelete}
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
					<Modal.Header>Delete Pricing Group</Modal.Header>
					<Modal.Content>
						<p>Are you sure to delete this pricing group?</p>
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
							onClick={() => onDeleteEventPriceGroupById(selectedEventPriceGroup.id)}
						>
							Yes
						</Button>
					</Modal.Actions>
				</Modal>
			</React.Fragment>
		);
	}
};

EventPriceGroupForm = reduxForm({
	form: 'EventPriceGroupForm'
})(EventPriceGroupForm);

export default EventPriceGroupForm;
