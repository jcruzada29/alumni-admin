import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Grid, Segment, Button, Form } from 'semantic-ui-react';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import { useAlert } from 'react-alert';

import {
	renderFormInput,
	renderFormSelect,
	renderDateRange,
	validateRequired,
	validateDateRange
} from '../../../../helpers/redux_form';

import LabelHelper from '../../../../helpers/Label';
import CommonEnum from '../../../../constants/CommonEnum';
import FileTypes from './../../../../constants/file_types';
import Loading from '../../../../components/loading';
import renderEditor from '../../../../helpers/renderEditor';

const FILE_SIZE_MB = 10; //mb
const MAX_FILE_SIZE = FILE_SIZE_MB * 1e+6; //converted the mb to byte

const ALLOWED_WIDTH_RATIO = 648;
const ALLOWED_HEIGHT_RATIO = 380;

let CouponBasicForm = props => {

	const {
		loadingSubmit,
		onSubmit,
		asset,
		loadingAsset,
		// redux-form formValueSelector values
		fileContent,
		fileContentName,
		publish_date_range,
		// redux-form props
		handleSubmit,
		pristine,
		submitting,
		invalid,
		options,
		change
	} = props;
	const alert = useAlert();

	// Select field options
	const optionsEventPublishStatus = CommonEnum.event_publish_status.map(o => ({
		value: o,
		text: LabelHelper.eventPublishStatus(o)
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

	const populateDateIfUnpublished = (val) => {
		if(val === 'unpublished' && _.isNil(publish_date_range)) {
			change('publish_date_range', '2020-01-01 - 2020-01-01');
		}
	};

	return (
		<React.Fragment>
			<Grid>
				<Grid.Row>
					<Grid.Column width={8}>
						<Segment>
							<h4>Coupon Information</h4>
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
									<Form.Field>
										<Field
											component={renderFormInput}
											name="name"
											placeholder="Coupon Name"
											validate={[validateRequired]}
										/>
										<label>Coupon Name</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderEditor}
											style={{ minHeight: 300 }}
											name="description"
											placeholder="Coupon Description (HTML)"
										/>
										<label>Description (HTML)</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormSelect}
											name="merchant_id"
											placeholder="Merchant"
											clearable
											options={options}
											validate={[validateRequired]}
										/>
										<label>Merchant</label>
									</Form.Field>
									<Form.Field>
										<Field
											component={renderFormInput}
											name="url"
											placeholder="URL"
										/>
										<label>URL (For External Event only)</label>
									</Form.Field>
								</Form.Group>
							</Form>
						</Segment>
						<Segment>
							<h4>Publish Settings</h4>
							<Form>
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
											validate={[validateRequired]}
										/>
										<label>Publish Status</label>
									</Form.Field>
									<Form.Field>
										<Field
											component={renderDateRange}
											name="publish_date_range"
											placeholder="Publish Date Range"
											clearable
											closable
											dateFormat="YYYY-MM-DD"
											animation="none"
											hideMobileKeyboard
											allowSameEndDate
											validate={[validateRequired, validateDateRange]}
										/>
										<label>The date range this event should be visible</label>
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

CouponBasicForm = reduxForm({
	form: 'CouponBasicForm'
})(CouponBasicForm);

const selector = formValueSelector('CouponBasicForm');
CouponBasicForm = connect(state => {
	const {
		file_content: fileContent,
		file_content_name: fileContentName,
		publish_date_range
	} = selector(state, 'file_content', 'file_content_name', 'publish_date_range');
	return {
		fileContent,
		fileContentName,
		publish_date_range,
		initialValues: state.couponDetailPage.couponBasicPageReducer.coupon
	};
})(CouponBasicForm);

export default CouponBasicForm;
