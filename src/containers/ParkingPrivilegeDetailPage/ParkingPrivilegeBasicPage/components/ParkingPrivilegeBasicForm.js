import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Grid, Segment, Button, Form } from 'semantic-ui-react';
import { Field, formValueSelector, reduxForm } from 'redux-form';

import {
	renderFormInput,
	renderFormSelect,
	renderFormTextArea,
	renderDateRange,
	validateRequired,
	validateDateRange
} from '../../../../helpers/redux_form';

import LabelHelper from '../../../../helpers/Label';
import CommonEnum from '../../../../constants/CommonEnum';
import renderEditor from '../../../../helpers/renderEditor';

let ParkingPrivilegeBasicForm = props => {

	const {
		loadingSubmit,
		onSubmit,
		handleSubmit,
		usage_date_range,
		pristine,
		submitting,
		invalid,
		change
	} = props;

	// Select field options
	const optionsEventPublishStatus = CommonEnum.event_publish_status.map(o => ({
		value: o,
		text: LabelHelper.eventPublishStatus(o)
	}));

	const populateDateIfUnpublished = (val) => {
		if(val === 'unpublished' && _.isNil(usage_date_range)) {
			change('usage_date_range', '2020-01-01 - 2020-01-01');
		}
	};

	return (
		<React.Fragment>
			<Grid>
				<Grid.Row>
					<Grid.Column width={8}>
						<Segment>
							<h4>Parking Privilege</h4>
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
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderEditor}
											style={{ minHeight: 300 }}
											name="description"
											placeholder="Parking Description (HTML)"
										/>
										<label>Description (HTML)</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormSelect}
											name="is_published"
											placeholder="Publish Status"
											onChange={(val) => {
												populateDateIfUnpublished(val);
											}}
											clearable
											options={optionsEventPublishStatus}
										/>
										<label>Publish Status</label>
									</Form.Field>
									<Form.Field>
										<Field
											component={renderDateRange}
											name="usage_date_range"
											placeholder="Usable datetime range"
											clearable
											closable
											dateFormat="YYYY-MM-DD"
											animation="none"
											hideMobileKeyboard
											allowSameEndDate
											validate={[validateRequired, validateDateRange]}
										/>
										<label>The datetime range this privilege could be use</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths={2}>
									<Form.Field>
										<Field
											component={renderFormInput}
											name="num_usage"
											placeholder="Usage per user"
										/>
										<label>Number of times used by each user</label>
									</Form.Field>
								</Form.Group>
							</Form>
						</Segment>

					</Grid.Column>

				</Grid.Row>
			</Grid>
			<Button
				primary
				disabled={pristine || submitting || invalid || loadingSubmit}
				onClick={handleSubmit(data => onSubmit(data))}
			>
				Save
			</Button>
		</React.Fragment>
	);
};

ParkingPrivilegeBasicForm = reduxForm({
	form: 'ParkingPrivilegeBasicForm'
})(ParkingPrivilegeBasicForm);

const selector = formValueSelector('ParkingPrivilegeBasicForm');
ParkingPrivilegeBasicForm = connect(state => {
	const usage_date_range = selector(state, 'usage_date_range');
	return {
		usage_date_range,
		initialValues: state.parkingPrivilegeDetailPage.parkingPrivilegeBasicPageReducer.parking_privilege
	};
})(ParkingPrivilegeBasicForm);

export default ParkingPrivilegeBasicForm;
