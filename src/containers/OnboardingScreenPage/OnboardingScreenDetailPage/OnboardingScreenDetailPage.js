import React, { Component } from 'react';
import _ from 'lodash';
import { Grid, Modal, Form, Button, Segment } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import moment from 'moment';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { renderFormInput, validateRequired, renderDateInput, validateNumberMax, validateNumberMin } from '../../../helpers/redux_form';
import FileTypes from '../../../constants/file_types';
import Loading from '../../../components/loading';

const MAX_FILE_SIZE = 100e6;
// App Image dimension: 375px x 812px
const ALLOWED_WIDTH_RATIO = 375 * 4;
const ALLOWED_HEIGHT_RATIO = 812 * 4;

const validateNumberMin1 = value => {
	return validateNumberMin(+value, 1);
};
const validateNumberMax50 = value => {
	return validateNumberMax(value, 50);
};


class OnboardingScreenDetailPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
		const { openDetailPageData, getOnboardingScreenById } = this.props;
		if (openDetailPageData) {
			getOnboardingScreenById({ id: openDetailPageData.id });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, submitSuccess: prev_submitSuccess, loadedSuccess: prev_loadedSuccess } = prevProps.onboardingScreenDetailPageProps;
		const { meta, submitSuccess, loadedSuccess, onboardingScreen } = this.props.onboardingScreenDetailPageProps;
		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}

		if (submitSuccess && prev_submitSuccess !== submitSuccess) {
			this.props.modalHandle();
		}

		if (onboardingScreen && loadedSuccess && prev_loadedSuccess !== loadedSuccess) {
			// initialize
			const { name, sort, asset_id } = onboardingScreen;
			this.props.initialize({
				sort,
				name: name
			});
			this.props.getAssetFileById({ asset_id });
		}
	}

	componentWillUnmount() {
		this.props.resetPage();
	}

	onDrop = (file) => {
		if (file) {
			this.props.change('onboard_screen_file_content', file[0]);
			this.props.change('onboard_screen_file_content_name', file[0].name);
		}
	}


	onDropRejected = files => {
		if (!_.isEmpty(files)) {
			const file = files[0];
			if (file && file.size > MAX_FILE_SIZE) {
				alert('error file size');
			}
		}
	};

	render() {
		// const { reportDetailPageProps } = this.props;
		// const { report, loading } = reportDetailPageProps;
		const { onboard_screen_file_content, onboard_screen_file_content_name,
			submitting, loadingUpload, loadingSubmit, invalid, pristine,
			openDetailPage, modalHandle, onboardingScreenDetailPageProps, openDetailPageData } = this.props;
		const { asset, loadingAsset, loading } = onboardingScreenDetailPageProps;

		return (
			<div className="bt-content-padded">
				<Modal
					size="small"
					open={Boolean(openDetailPage)}
					onClose={() => modalHandle()}
					scrolling="true"
					closeIcon={{ name: 'close' }}
				>
					<Modal.Header>Onboarding Screen</Modal.Header>
					<Modal.Content>
						<div className="bt-content-padded">
							<Grid stackable>
								<Grid.Row>
									<Grid.Column width={16}>
										<Segment>
											<h4>Basic Information</h4>
											<Form loading={loading}>
												<Form.Group widths="equal">
													<Form.Field>
														<Field
															component={renderFormInput}
															name="name"
															placeholder="Name of onboard screen"
															validate={[validateRequired]}
														/>
														<label>Name of onboard screen</label>
													</Form.Field>
													<Form.Field>
														<Field
															component={renderFormInput}
															name="sort"
															placeholder="Sort"
															validate={[validateRequired, validateNumberMax50, validateNumberMin1]}
															type="number"
														/>
														<label>Sort</label>
													</Form.Field>
												</Form.Group>
												{/* <Form.Group widths="equal">
													<Form.Field>
														<Field
															component={renderDateInput}
															name="schedule_delivery_date"
															placeholder="Schedule delivery date"
															validate={[validateRequired]}
															type="integer"
														/>
														<label>Schedule delivery date</label>
													</Form.Field>
												</Form.Group> */}
											</Form>
										</Segment>
										<Segment>
											<h4>Onboard Screen Content</h4>
											<Field
												component={field =>
													<Dropzone
														accept={FileTypes.image.concat(FileTypes.image).join(',')}
														onDropRejected={this.onDropRejected}
														multiple={false}
														maxSize={MAX_FILE_SIZE}
														onDrop={(file) => this.onDrop(file)}
													>
														{({ getRootProps, getInputProps }) => (
															<div
																style={{ margin: 10, padding: 20, textAlign: 'center', border: '1px solid rgba(34,36,38,0.1)', cursor: 'pointer' }}
																{...getRootProps({ className: 'dropzone-container' })}
															>
																<input {...getInputProps()} />
																{loadingAsset || loading ? <Loading />
																	:
																	asset && !onboard_screen_file_content ?
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
																		onboard_screen_file_content &&
																		<div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
																			<p style={{ textAlign: 'center' }}>{onboard_screen_file_content_name}</p>
																			<div style={{ display: 'flex', justifyContent: 'center' }}>
																				<img
																					style={{ display: 'block', width: '100%' }}
																					src={URL.createObjectURL(onboard_screen_file_content)}
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
										</Segment>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</div>
					</Modal.Content>
					<Modal.Actions
						style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
					>
						<div>
							{openDetailPageData && openDetailPageData.id && 
							<Button
								disabled={loadingSubmit || loadingUpload}
								textAlign="left"
								color="red"
								onClick={() => openDetailPageData && this.props.deleteOnboardingScreenById(openDetailPageData.id)}
							>
								Delete
							</Button>}
						</div>
						<div >
							<Button
								default
								onClick={() => modalHandle()}
							>
								Cancel
							</Button>
							<Button
								primary
								disabled={(_.isNil(openDetailPageData) ? !onboard_screen_file_content : false) || pristine || submitting || invalid || loadingSubmit || loadingUpload}
								onClick={this.props.handleSubmit((data) => this.props.onSubmit({ ...data, openDetailPageData }))}
							>
								Save
							</Button>
						</div>
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}
// Decorate with connect to read form values
const selector = formValueSelector('OnboardingScreenDetailPage');
OnboardingScreenDetailPage = connect(state => {
	const { sort, name, onboard_screen_file_content, onboard_screen_file_content_name } =
		selector(state, 'sort', 'name', 'onboard_screen_file_content', 'onboard_screen_file_content_name');
	return {
		sort,
		name,
		onboard_screen_file_content,
		onboard_screen_file_content_name
	};
})(OnboardingScreenDetailPage);

export default compose(
	withAlert(),
	reduxForm({
		form: 'OnboardingScreenDetailPage'
	})
)(OnboardingScreenDetailPage);
