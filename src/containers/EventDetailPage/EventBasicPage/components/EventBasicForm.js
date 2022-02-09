import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Grid, Segment, Button, Form } from 'semantic-ui-react';
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import { useAlert } from 'react-alert';

import {
	renderFormInput,
	renderFormSelect,
	renderFormTextArea,
	renderDateRange,
	validateRequired,
	validateDateRange,
	validateNumberMin
} from '../../../../helpers/redux_form';
import LabelHelper from '../../../../helpers/Label';
import CommonEnum from '../../../../constants/CommonEnum';
import EventUserTypes from './EventUserTypes';
import FileTypes from './../../../../constants/file_types';
import Loading from '../../../../components/loading';
import renderEditor from '../../../../helpers/renderEditor';

const FILE_SIZE_MB = 10; //mb
const MAX_FILE_SIZE = FILE_SIZE_MB * 1e+6; //converted the mb to byte

const ALLOWED_WIDTH_RATIO = 1344;
const ALLOWED_HEIGHT_RATIO = 972;

// custom redux-form validations
const validateNumberMin1 = value => {
	return validateNumberMin(+value, 1);
};
const validateEventUserTypes = value => {
	return _.isArray(value) && value.length > 0 ? undefined : 'Add at least one User Type';
};

let EventBasicForm = props => {
	const {
		loadingSubmit,
		onSubmit,
		asset,
		loadingAsset,
		// redux-form formValueSelector values
		selectedType,
		fileContent,
		fileContentName,
		publish_date_range,
		event_date_range,
		// redux-form props
		handleSubmit,
		pristine,
		submitting,
		invalid,
		change
	} = props;
	const alert = useAlert();

	// Select field options
	const optionsEventType = CommonEnum.event_types.map(o => ({
		value: o,
		text: LabelHelper.eventType(o)
	}));
	const optionsEventPublishStatus = CommonEnum.event_publish_status.map(o => ({
		value: o,
		text: LabelHelper.eventPublishStatus(o)
	}));
	const optionsEventRequiredLogin = CommonEnum.event_required_login.map(o => ({
		value: o,
		text: LabelHelper.eventRequiredLogin(o)
	}));
	const optionsVisiblity = CommonEnum.event_visiblity.map(o => ({
		value: o,
		text: LabelHelper.eventVisibility(o)
	}));
	const optionsShowQuota = CommonEnum.event_show_quota.map(o => ({
		value: o,
		text: LabelHelper.eventShowQuota(o)
	}));
	const optionsWaitingList = CommonEnum.event_waiting_list.map(o => ({
		value: o,
		text: LabelHelper.eventWaitingList(o)
	}));

	// Dropzone event handlers
	const onDrop = file => {
		if (file) {
			change('file_content', file[0]);
			change('file_content_name', file[0].name);
		}
	};
	const onDropRejected = files => {
		if (!_.isEmpty(files)) {
			const file = files[0];
			if (file && file.size > MAX_FILE_SIZE) {
				alert.show(`Maximum file size is ${FILE_SIZE_MB} MB`, { type: 'error' });
			}
		}
	};

	const populateDatesIfUnpublished = (val) => {
		if (val === 'unpublished' && _.isNil(publish_date_range)) {
			change('publish_date_range', '2020-01-01 - 2020-01-01');
		}
		if (val === 'unpublished' && _.isNil(event_date_range)) {
			change('event_date_range', '2020-01-01 - 2020-01-01');
		}
	};

	return (
		<React.Fragment>
			<Grid>
				<Grid.Row>
					<Grid.Column width={8}>
						<Segment>
							<h4>Event Information</h4>
							<Form>
								<Field
									component={field =>
										<Dropzone
											accept={FileTypes.image.concat(FileTypes.image).join(',')}
											onDropRejected={onDropRejected}
											multiple={false}
											maxSize={MAX_FILE_SIZE}
											onDrop={(file) => onDrop(file)}
										>
											{({ getRootProps, getInputProps }) => (
												<div
													style={{ marginBottom: 10, padding: 20, textAlign: 'center', border: '1px solid rgba(34,36,38,0.1)', cursor: 'pointer' }}
													{...getRootProps({ className: 'dropzone-container' })}
												>
													<input {...getInputProps()} />
													{loadingAsset && <Loading />}
													{!loadingAsset && asset && !fileContent && (
														<div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
															<p style={{ textAlign: 'center' }}>{asset.file_name}</p>
															<div style={{ display: 'flex', justifyContent: 'center' }}>
																<img
																	style={{ display: 'block', width: '100%' }}
																	src={asset.file}
																	alt="preview"
																/>
															</div>
														</div>
													)}
													{!loadingAsset && fileContent && (
														<div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
															<p style={{ textAlign: 'center' }}>{fileContentName}</p>
															<div style={{ display: 'flex', justifyContent: 'center' }}>
																<img
																	style={{ display: 'block', width: '100%' }}
																	src={URL.createObjectURL(fileContent)}
																	alt="preview"
																/>
															</div>
														</div>
													)}
													<p>Click / Drag and drop your JPG image here. <br></br>{`(Recommended size ${ALLOWED_WIDTH_RATIO}px x ${ALLOWED_HEIGHT_RATIO}px)`}</p>
												</div>
											)}
										</Dropzone>
									}
									type="file"
									name="file_content"
								/>
								<Form.Group widths="equal">
									<Form.Field required>
										<Field
											component={renderFormInput}
											name="name"
											placeholder="Event Name"
											validate={[validateRequired]}
										/>
										<label>Event Name</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field required>
										<Field
											component={renderEditor}
											style={{ minHeight: 300 }}
											name="description"
											placeholder="Description (HTML)"
											validate={[validateRequired]}
										/>
										<label>Description (HTML)</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field required>
										<Field
											component={renderFormSelect}
											name="type"
											placeholder="Type"
											clearable
											onChange={() => change('url', '')}
											options={optionsEventType}
											validate={[validateRequired]}
										/>
										<label>Registration Form Type</label>
									</Form.Field>
									{
										selectedType !== 'none' &&
										<Form.Field required={Boolean(selectedType === 'external')}>
											<Field
												component={renderFormInput}
												name="url"
												placeholder="URL"
												disabled={!selectedType || selectedType === 'internal'}
												validate={selectedType === 'external' ? [validateRequired] : []}
											/>
											<label>URL (For External Event only)</label>
										</Form.Field>
									}
									{selectedType === 'none' && <Form.Field />}
								</Form.Group>
							</Form>
						</Segment>
						<Segment>
							<h4>Publish Settings</h4>
							<Form>
								<Form.Group widths="equal">
									<Form.Field required>
										<Field
											component={renderFormSelect}
											name="is_published"
											placeholder="Publish Status"
											clearable
											onChange={(val) => {
												populateDatesIfUnpublished(val);
											}}
											options={optionsEventPublishStatus}
											validate={[validateRequired]}
										/>
										<label>Publish Status</label>
									</Form.Field>
									<Form.Field required>
										<Field
											component={renderFormSelect}
											name="is_required"
											placeholder="Requires login to view detail"
											clearable
											options={optionsEventRequiredLogin}
											validate={[validateRequired]}
										/>
										<label>Requires login to view detail</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field required>
										<Field
											component={renderFormSelect}
											name="is_visible_web"
											placeholder="Visibility on Web"
											clearable
											options={optionsVisiblity}
											validate={[validateRequired]}
										/>
										<label>Visibility on Web</label>
									</Form.Field>
									<Form.Field required>
										<Field
											component={renderFormSelect}
											name="is_visible_app"
											placeholder="Visibility on App"
											clearable
											options={optionsVisiblity}
											validate={[validateRequired]}
										/>
										<label>Visibility on App</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field required>
										<Field
											component={renderDateRange}
											name="publish_date_range"
											placeholder="Publish Date Range"
											clearable
											closable
											dateFormat="YYYY-MM-DD"
											animation={''}
											hideMobileKeyboard
											allowSameEndDate
											validate={[validateRequired, validateDateRange]}
										/>
										<label>The date range this event should be visible</label>
									</Form.Field>
									<Form.Field required>
										<Field
											component={renderDateRange}
											name="event_date_range"
											placeholder="Event Date Range"
											clearable
											closable
											dateFormat="YYYY-MM-DD"
											animation="none"
											hideMobileKeyboard
											allowSameEndDate
											validate={[validateRequired, validateDateRange]}
										/>
										<label>Event date</label>
									</Form.Field>
								</Form.Group>
							</Form>
						</Segment>
					</Grid.Column>

					<Grid.Column width={8}>
						<Segment>
							<h4>Quota Settings</h4>
							<Form>
								<Form.Group widths="equal">
									<Form.Field required>
										<Field
											component={renderFormInput}
											type="number"
											name="quota"
											placeholder="Event Quota"
											validate={[validateRequired, validateNumberMin1]}
										/>
										<label>Event Quota</label>
									</Form.Field>
									<Form.Field required>
										<Field
											component={renderFormSelect}
											name="show_quota_left"
											placeholder="Show Quota Left to User"
											clearable
											options={optionsShowQuota}
											validate={[validateRequired]}
										/>
										<label>Show Quota Left to User</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field required>
										<Field
											component={renderFormSelect}
											name="allow_waiting_list"
											placeholder="Allow Waiting List"
											clearable
											options={optionsWaitingList}
											validate={[validateRequired]}
										/>
										<label>Allow Waiting List</label>
									</Form.Field>
									<Form.Field />
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field required>
										<Field
											component={renderDateRange}
											name="early_date_range"
											placeholder="Early bird Date Range"
											clearable
											closable
											dateFormat="YYYY-MM-DD"
											animation="none"
											hideMobileKeyboard
											allowSameEndDate
											validate={[validateRequired, validateDateRange]}
										/>
										<label>Early bird Date Range</label>
									</Form.Field>
									<Form.Field required>
										<Field
											component={renderDateRange}
											name="standard_date_range"
											placeholder="Standard Date Range"
											clearable
											closable
											dateFormat="YYYY-MM-DD"
											animation="none"
											hideMobileKeyboard
											allowSameEndDate
											validate={[validateRequired, validateDateRange]}
										/>
										<label>Standard Date Range</label>
									</Form.Field>
								</Form.Group>
							</Form>
						</Segment>
						<Segment>
							<h4>User Type</h4>
							<FieldArray
								name="user_types"
								component={EventUserTypes}
								validate={[validateEventUserTypes]}
							/>
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

EventBasicForm = reduxForm({
	form: 'EventBasicForm'
})(EventBasicForm);

const selector = formValueSelector('EventBasicForm');
EventBasicForm = connect(state => {
	const {
		type: selectedType,
		file_content: fileContent,
		file_content_name: fileContentName,
		publish_date_range,
		event_date_range
	} = selector(state, 'type', 'file_content', 'file_content_name', 'publish_date_range', 'event_date_range');

	const event = state.eventDetailPage.eventBasicPageReducer.event
		? state.eventDetailPage.eventBasicPageReducer.event
		: { user_types: [{ name: 'Alumni' }] }; // Add the Alumni type by default in creating event

	return {
		selectedType,
		fileContent,
		fileContentName,
		publish_date_range,
		event_date_range,
		initialValues: event
	};
})(EventBasicForm);

export default EventBasicForm;
