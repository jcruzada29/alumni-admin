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
	renderFormTextArea,
	renderDateRange,
	validateRequired,
	validateDateRange, renderDateInput
} from '../../../../helpers/redux_form';

import LabelHelper from '../../../../helpers/Label';
import CommonEnum from '../../../../constants/CommonEnum';
import FileTypes from './../../../../constants/file_types';
import Loading from '../../../../components/loading';
import renderEditor from '../../../../helpers/renderEditor';

const FILE_SIZE_MB = 10; //mb
const MAX_FILE_SIZE = FILE_SIZE_MB * 1e+6; //converted the mb to byte

// App Image dimension: 375px x 150px
const ALLOWED_WIDTH_RATIO = 375 * 4;
const ALLOWED_HEIGHT_RATIO = 150 * 4;

let HighlighBasicForm = props => {

	const {
		loadingSubmit,
		onSubmit,
		asset,
		loadingAsset,
		// redux-form formValueSelector values
		fileContent,
		fileContentName,
		// redux-form props
		handleSubmit,
		pristine,
		submitting,
		invalid,
		change
	} = props;
	const alert = useAlert();

	// Select field options
	const optionsHighlightsPublishStatus = CommonEnum.highlights_publish_status.map(o => ({
		value: o,
		text: LabelHelper.highlightsPublishStatus(o)
	}));
	const optionsHiglightsLocations = CommonEnum.highlights_location.map(o => ({
		value: o,
		text: LabelHelper.highlightsLocation(o)
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

	return (
		<React.Fragment>
			<Grid>
				<Grid.Row>
					<Grid.Column>
						<div style={{ display: 'flex' }}>
							<div style={{ flex: 1, marginRight: 20 }}>
								<Segment>
									<h4>Highlight Information</h4>
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
													name="title"
													placeholder="Title"
													validate={[validateRequired]}
												/>
												<label>Title</label>
											</Form.Field>
										</Form.Group>
										<Form.Group widths="equal">
											<Form.Field>
												<Field
													component={renderEditor}
													style={{ minHeight: 300 }}
													name="description"
													placeholder="Highlights Description (HTML)"
												/>
												<label>Description (HTML)</label>
											</Form.Field>
										</Form.Group>
										<Form.Group>
											<Form.Field>
												<Field
													component={renderDateInput}
													name="display_date"
													placeholder="Display date"
													validate={[validateRequired]}
													dateFormat="YYYY-MM-DD"
												/>
												<label>Display Date</label>
											</Form.Field>
										</Form.Group>
									</Form>
								</Segment>
							</div>
							<div style={{ flex: 1 }}>
								<Segment>
									<h4>Publish Settings</h4>
									<Form>
										<Form.Group widths="equal">
											<Form.Field>
												<Field
													component={renderFormSelect}
													name="is_published"
													placeholder="Publish Status"
													clearable
													options={optionsHighlightsPublishStatus}
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
												<label>The datetime range this event should be visible</label>
											</Form.Field>
										</Form.Group>
										<Form.Group widths="equal">
											<Form.Field>
												<Field
													component={renderFormSelect}
													name="location"
													placeholder="Publish Status"
													clearable
													options={optionsHiglightsLocations}
													validate={[validateRequired]}
												/>
												<label>Location</label>
											</Form.Field>
											<Form.Field />
										</Form.Group>
									</Form>
								</Segment>
							</div>
						</div>
					</Grid.Column>

				</Grid.Row>
			</Grid>
			<Button
				primary
				disabled={(!asset && !fileContent) || pristine || submitting || invalid || loadingSubmit }
				onClick={handleSubmit(data => onSubmit(data))}
			>
				Save
			</Button>
		</React.Fragment>
	);
};

HighlighBasicForm = reduxForm({
	form: 'HighlighBasicForm'
})(HighlighBasicForm);

const selector = formValueSelector('HighlighBasicForm');
HighlighBasicForm = connect(state => {
	const {
		file_content: fileContent,
		file_content_name: fileContentName
	} = selector(state, 'file_content', 'file_content_name');
	return {
		fileContent,
		fileContentName,
		initialValues: state.highlightDetailPage.highlightBasicPageReducer.highlight
	};
})(HighlighBasicForm);

export default HighlighBasicForm;
