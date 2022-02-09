import React from 'react';
import _ from 'lodash';
import {
	Grid, Segment, Button, Form
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
	renderFormInput,
	validateRequired,
	renderDateInput,
	renderFormSelect,
	validateDateRange,
	renderDateRange
} from '../../../../helpers/redux_form';
import FileTypes from '../../../../constants/file_types';
import renderEditor from '../../../../helpers/renderEditor';
import Loading from '../../../../components/loading';

const MAX_FILE_SIZE = 100e6;

// App Image dimension: 240px x 180px
const ALLOWED_WIDTH_RATIO = 375 * 4;
const ALLOWED_HEIGHT_RATIO = 281 * 4;

let NewsBasicForm = props => {
	const {
		loading,
		loadingSubmit,
		onSubmit,
		asset,
		loadingAsset,
		pristine, 
		submitting, 
		invalid, 
		file, 
		file_name,
		display_date,
		date_range,
		loadingUpload,
		handleSubmit,
		change
	} = props;

	const onDrop = (file) => {
		if (file) {
			change('file', file[0]);
			change('file_name', file[0].name);
		}
	};
	
	const onDropRejected = files => {
		if (!_.isEmpty(files)) {
			const file = files[0];
			if (file && file.size > MAX_FILE_SIZE) {
				alert('error file size');
			}
		}
	};

	const populateDatesIfUnpublished = (val) => {
		if(val === 0 && _.isNil(display_date)) {
			change('display_date', '2020-01-01');
		}

		if(val === 0 && _.isNil(date_range)){
			change('date_range', '2020-01-01 - 2020-01-01');
		}
	};

	return (
		<React.Fragment>
			<Grid>
				<Grid.Row>
					<Grid.Column width={8}>
						<Segment>
							<h4>News Information</h4>
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
												style={{ margin: 10, padding: 20, textAlign: 'center', border: '1px solid rgba(34,36,38,0.1)', cursor: 'pointer' }}
												{...getRootProps({ className: 'dropzone-container' })}
											>
												<input {...getInputProps()} />
												{loadingAsset || loading ? <Loading />
													:
													asset && !file ?
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
														:
														file &&
														<div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
															<p style={{ textAlign: 'center' }}>{file_name}</p>
															<div style={{ display: 'flex', justifyContent: 'center' }}>
																<img
																	style={{ display: 'block', width: '100%' }}
																	src={URL.createObjectURL(file)}
																	alt="preview"
																/>
															</div>
														</div>
												}
												<p>Click / Drag and drop your JPG image here. <br></br>{`(Recommended size ${ALLOWED_WIDTH_RATIO}px x ${ALLOWED_HEIGHT_RATIO}px)`}</p>
											</div>
										)}
									</Dropzone>
								}
								type="file"
								name="onboard_screen_file_content"
							/>
							<Form widths="equal">
								<Form.Group>
									<Form.Field>
										<Field
											component={renderFormInput}
											name="title"
											placeholder="Title"
											validate={[validateRequired]}
											// disabled={Boolean(_.get(newsBasicPage, 'id'))}
										/>
										<label>Title</label>
									</Form.Field>
								</Form.Group>
								<Form.Group>
									<Form.Field>
										<Field
											component={renderEditor}
											style={{ minHeight: 300 }}
											placeholder="Description (HTML)"
											name="description"
											validate={[validateRequired]}
											// disabled={disableEdit}
										/>
										<label>Description (HTML)</label>
									</Form.Field>
								</Form.Group>
								<Form.Group>
									<Form.Field>
										<Field
											component={renderDateInput}
											name="display_date"
											placeholder="Date"
											clearable
											closable
											dateFormat="YYYY-MM-DD"
											animation="none"
											hideMobileKeyboard
											validate={[validateRequired]}
											// disabled={disabled}
										/>
										<label>Display Date</label>
									</Form.Field>
								</Form.Group>
							</Form>
						</Segment>
					</Grid.Column>
					<Grid.Column width={8}>
						<Segment>
							<h4>Publish Settings</h4>
							<Form widths="equal">
								<Form.Group>
									<Form.Field>
										<Field
											component={renderFormSelect}
											name="is_published"
											placeholder="Publish Status"
											validate={[validateRequired]}
											options={
												[
													{ value: 1, text: 'Published' },
													{ value: 0, text: 'Unpublished' }
												]
											}
											onChange={(val) => {
												populateDatesIfUnpublished(val);
											}}
											// disabled={Boolean(_.get(newsBasicPage, 'id'))}
										/>
										<label>Publish Status</label>
									</Form.Field>
									<Form.Field>
										<Field
											component={renderDateRange}
											name="date_range"
											placeholder="From - To"
											clearable
											closable
											dateFormat="YYYY-MM-DD"
											animation="none"
											hideMobileKeyboard
											allowSameEndDate
											validate={[validateRequired, validateDateRange]}
										/>
										<label>Datetime range this event should be visible</label>
									</Form.Field>
								</Form.Group>
							</Form>
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<Button
				primary
				disabled={(!file && !asset) || pristine || submitting || invalid || loadingSubmit || loadingUpload}
				onClick={handleSubmit((data) => onSubmit({ ...data }))}
			>
					Save
			</Button>
		</React.Fragment>
	);
};

NewsBasicForm = reduxForm({
	form: 'NewsBasicForm'
})(NewsBasicForm);

// Decorate with connect to read form values
const selector = formValueSelector('NewsBasicForm');
NewsBasicForm = connect(state => {
	const { file, file_name, display_date, date_range } =
		selector(state, 'file', 'file_name', 'display_date', 'date_range');

	const { news } = state.newsDetailPage.newsBasicPageReducer;
	let newNews = {};
	if(news) {
		 newNews = {
			...news,
			display_date: moment(news.display_date).format('YYYY-MM-DD'),
			date_range: `${moment(news.publish_start_date).format('YYYY-MM-DD')} - ${moment(news.publish_end_date).format('YYYY-MM-DD')}`
		};
	}

	return {
		file,
		file_name,
		display_date,
		date_range,
		initialValues: news && newNews
	};
})(NewsBasicForm);

export default NewsBasicForm;
