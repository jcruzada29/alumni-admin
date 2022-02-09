import React, { Component } from 'react';
import { Form, Grid, Header, Icon, Modal, Progress, Table, Button, Loader, Dimmer } from 'semantic-ui-react';
import _ from 'lodash';
import Papa from 'papaparse';
import Dropzone from 'react-dropzone';

import FileTypes from './../../../constants/file_types';

class UploadModal extends Component {
	constructor() {
		super();
		this.state = {
			originalAccessStudentInclude: [],
			originalAccessStudentExclude: [],
			access_students_include: [],
			access_students_exclude: [],
			uploadedStudent: [],
			loadingUpload: false,
			initialCount: 0,
			totalCount: 0,
			csvfile: undefined
		};
	}

	componentDidUpdate(prevProps) {
		const { pageProps, onSubmit, values, type, id } = this.props._reduxForm;
		const { uploadedStudent } = pageProps;
		const { uploadedStudent: prevUploadedStudent } = prevProps._reduxForm.pageProps;

		if (uploadedStudent && uploadedStudent !== prevUploadedStudent) {
			this.setState({
				uploadedStudent: pageProps.uploadedStudent
			});
		}

		const { initialCount, totalCount, loadingUpload, originalAccessStudentInclude, originalAccessStudentExclude } = this.state;
		if (initialCount !== 0 && totalCount !== 0 && initialCount === totalCount && loadingUpload) {
			// Added 1 second delay to get full uploadedStudent id updated above;
			setTimeout(()=> {
				if(this.props.accessType === 'include') {
					const uploadedNotFound = [];
					uploadedStudent.map(value => !value.isFound && uploadedNotFound.push(value.emplid));
					const accessStudentInclude = originalAccessStudentInclude.filter( item => uploadedNotFound.indexOf( item.emplid ) === -1  );

					const diff = _.differenceBy(originalAccessStudentExclude, originalAccessStudentInclude, 'emplid');
					onSubmit({
						access_students_exclude: diff,
						access_students_include: accessStudentInclude,
						is_visible_all: values.is_visible_all,
						type,
						...(type === 'event' && { event_id: id }),
						...(type === 'coupon' && { coupon_id: id }),
						...(type === 'parking' && { parking_id: id }),
						...(type === 'highlight' && { highlight_id: id }),
						...(type === 'popup' && { popup_id: id }),
						...(type === 'push' && { push_id: id })
					});
				}
				if(this.props.accessType === 'exclude') {
					const uploadedNotFound = [];
					uploadedStudent.map(value => !value.isFound && uploadedNotFound.push(value.emplid));
					const accessStudentExclude = originalAccessStudentExclude.filter( item => uploadedNotFound.indexOf( item.emplid ) === -1  );

					const diff = _.differenceBy(originalAccessStudentInclude, originalAccessStudentExclude, 'emplid');
					onSubmit({
						access_students_include: diff,
						access_students_exclude: accessStudentExclude,
						is_visible_all: values.is_visible_all,
						type,
						...(type === 'event' && { event_id: id }),
						...(type === 'coupon' && { coupon_id: id }),
						...(type === 'parking' && { parking_id: id }),
						...(type === 'highlight' && { highlight_id: id }),
						...(type === 'popup' && { popup_id: id }),
						...(type === 'push' && { push_id: id })
					});
				}

			},1000);
			this.setState({
				loadingUpload: false
			});
		}
	}

	handleChange = file => {
		if (file) {
			this.setState({
				csvfile: file[0]
			}, () => {
				// callback
				this.importCSV();
			});
		}
	}

	importCSV = () => {
		const { csvfile } = this.state;
		Papa.parse(csvfile, {
			complete: this.storeData,
			skipEmptyLines: true,
			header: true
		});
	}

	storeData = (result) => {
		const { accessType } = this.props;
		const students_id = result.data;
		const access_students_include = [];
		const access_students_exclude = [];

		students_id.map(student => {
			if (accessType === 'include') {
				access_students_include.push({
					emplid: student['Student ID']
				});
			} else {
				access_students_exclude.push({
					emplid: student['Student ID']
				});
			}
		});

		if (accessType === 'include') {
			this.setState({
				access_students_include,
				totalCount: access_students_include.length
			});
		} else {
			this.setState({
				access_students_exclude,
				totalCount: access_students_exclude.length
			});
		}
	}

	uploadData = async () => {
		const { access_students_include: studentsInclude, access_students_exclude: studentsExclude } = this.state;
		const { type, id, onUpload, values } = this.props._reduxForm;

		// Start ProgressBar
		this.setState({
			initialCount: 0,
			loadingUpload: true
		});

		const access_students_include = [];
		// Add original values to avoid deleting previous include
		values.access_students_include && values.access_students_include.length > 0 && values.access_students_include.map(origValues=>{
			return access_students_include.push({emplid: origValues.emplid});
		});

		this.setState({
			originalAccessStudentInclude: access_students_include
		});

		studentsInclude && await studentsInclude.map((include,index) => {
			setTimeout(() => {
				access_students_include.push(include);
				onUpload({
					access_students_include,
					is_visible_all: values.is_visible_all,
					type,
					...(type === 'event' && { event_id: id }),
					...(type === 'coupon' && { coupon_id: id }),
					...(type === 'parking' && { parking_id: id }),
					...(type === 'highlight' && { highlight_id: id }),
					...(type === 'popup' && { popup_id: id }),
					...(type === 'push' && { push_id: id })
				});
				this.setState({
					initialCount: this.state.initialCount += 1
				});
			}, 1000*index);
		});

		const access_students_exclude = [];
		// Add original values to avoid deleting previous exclude
		values.access_students_exclude && values.access_students_exclude.length > 0 && values.access_students_exclude.map(origValues=>{
			return access_students_exclude.push({emplid: origValues.emplid});
		});

		this.setState({
			originalAccessStudentExclude: access_students_exclude
		});

		studentsExclude && await studentsExclude.map((exclude,index) => {
			setTimeout(() => {
				access_students_exclude.push(exclude);
				onUpload({
					access_students_exclude,
					is_visible_all: values.is_visible_all,
					type,
					...(type === 'event' && { event_id: id }),
					...(type === 'coupon' && { coupon_id: id }),
					...(type === 'parking' && { parking_id: id }),
					...(type === 'highlight' && { highlight_id: id }),
					...(type === 'popup' && { popup_id: id }),
					...(type === 'push' && { push_id: id })
				});

				this.setState({
					initialCount: this.state.initialCount += 1
				});
			}, 1000*index);
		});
	}

	closeAndReload = () => {
		const { toggleModal } = this.props;
		const {initialCount, totalCount} = this.state;

		this.setState({
			access_students_include: [],
			access_students_exclude: [],
			loadingUpload: false,
			initialCount: 0,
			totalCount: 0,
			uploadedStudent: []
		}, () => {
			// setState callback
			toggleModal();
		});

		if(initialCount !== 0 && totalCount !== 0 && initialCount === totalCount) {
			window.location.reload(false);
		}
	}

	downloadSampleCsv = () => {
		const csv = Papa.unparse([
			{
				"Student ID": "11111111"
			},
			{
				"Student ID": "22222222"
			},
			{
				"Student ID": "33333333"
			}
		]);

		if (navigator && navigator.msSaveBlob) {
			const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
			navigator.msSaveBlob(blob, 'Alumni');
			return;
		}
		const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csv}`);
		let a = document.createElement('a');
		document.body.appendChild(a);
		a.href = encodedUri;
		a.download = 'Alumni.csv';
		a.click();
	}

	render() {
		const { openModal, toggleModal, accessType } = this.props;
		const { initialCount, totalCount, access_students_include, access_students_exclude, loadingUpload, uploadedStudent } = this.state;
		const studentids = access_students_include.length ? access_students_include : access_students_exclude;
		return (
			<Modal
				size="tiny"
				open={openModal}
				onClose={toggleModal}
				className="cust-modal-holder"
				closeOnDimmerClick={false}
				closeOnEscape={false}
			>
				<Modal.Header>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div style={{ marginRight: 'auto' }}>
							<Header as="h5">{accessType === 'include' ? "Include Students" : "Exclude Students"} CSV</Header>
						</div>
						<div>
							<Icon
								name="delete"
								color="grey"
								style={{ fontSize: '20px' }}
								onClick={this.closeAndReload}
								className="cust-cursor-pointer"
							/>
						</div>
					</div>
				</Modal.Header>
				<Modal.Content>
					<Grid.Row />
					{!totalCount &&
						<Form>
							<Dropzone
								accept=".csv, application/vnd.ms-excel, text/csv"
								multiple={false}
								onDrop={(file) => this.handleChange(file)}
							>
								{({ getRootProps, getInputProps }) => (
									<div
										style={{ marginBottom: 10, padding: 20, textAlign: 'center', border: '1px solid rgba(34,36,38,0.1)', cursor: 'pointer' }}
										{...getRootProps({ className: 'dropzone-container' })}
									>
										<input {...getInputProps()} />
										<p>Click / Drag and drop your CSV file here.</p>
									</div>
								)}
							</Dropzone>
							<Grid.Column
								floated="right"
							>
								<Button
									onClick={() => this.downloadSampleCsv() }
								>
									<Icon name="download" /> Sample CSV
								</Button>
							</Grid.Column>
						</Form>
					}
					{
						totalCount !== 0 && studentids.length > 0 &&
						<React.Fragment>
							<div>
								Do you want to add the following list of student ID to include list? (Invalid student IDs would be skipped)
							</div>
							{
								<div
									style={{
										height: 150,
										overflowY: 'hidden',
										marginTop: 10,
										overflow: 'hidden',
    								position: 'relative'
									}}
								>
									<div
										style={{position: 'absolute',
											top: 0,
											left: 0,
											bottom: 0,
											right: -20,
											overflowY: 'scroll'}}
									>
										<Table
											columns={1}
											basic
										>
											<Table.Body>
												{
													studentids.map((student, index) => {
														return (
															<Table.Row
																key={`result-${index}`}
															>
																<Table.Cell width={1}>
																	{/* <Loader
																		active
																		inline
																	/> */}
																	<Icon
																		name={
																			uploadedStudent &&
																			uploadedStudent[index] &&
																			uploadedStudent[index].emplid !== undefined &&
																			uploadedStudent[index].emplid === student.emplid &&
																			uploadedStudent[index].isFound ?
																				"check circle" :
																				uploadedStudent &&
																				uploadedStudent[index] &&
																				uploadedStudent[index].emplid !== undefined &&
																				uploadedStudent[index].emplid === student.emplid &&
																				!uploadedStudent[index].isFound ? "remove circle" : "info"
																		}
																		size="large"
																		color={
																			uploadedStudent &&
																			uploadedStudent[index] &&
																			uploadedStudent[index].emplid !== undefined &&
																			uploadedStudent[index].emplid === student.emplid &&
																			uploadedStudent[index].isFound ? "green" :
																				uploadedStudent &&
																				uploadedStudent[index] &&
																				uploadedStudent[index].emplid !== undefined &&
																				uploadedStudent[index].emplid === student.emplid &&
																				!uploadedStudent[index].isFound ? "red" : null
																		}
																	/>
																</Table.Cell>
																<Table.Cell width={12}>
																	{student.emplid}
																</Table.Cell>
															</Table.Row>
														);
													})
												}
											</Table.Body>
										</Table>
									</div>
								</div>
							}
							{totalCount !== 0 && studentids.length > 0 && uploadedStudent.length > 0 &&
								<Progress
									value={initialCount}
									total={totalCount}
									progress="ratio"
									autoSuccess
									style={{marginTop: 20}}
								/>
							}
						</React.Fragment>
					}
				</Modal.Content>
				<Modal.Actions>
					{totalCount !== 0 && studentids.length > 0 && 
						totalCount !== initialCount ? (
							<Button
								disabled={loadingUpload}
								onClick={() => this.uploadData()}
							>Upload</Button>
						) : (
							null
						)
					}
				</Modal.Actions>
			</Modal>
		);
	}
}

export default UploadModal;
