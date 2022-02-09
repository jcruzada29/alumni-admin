import React from 'react';
import { Table, Form, Button, Search, Label, Icon } from 'semantic-ui-react';
import { formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import UploadModal from './UploadModal';

const minCharacters = 2;
const resultRenderer = ({ title }) => <Label content={title} />;

class ExcludeSpecificStudents extends React.Component {
	state = {
		value: '',
		timeout: null,
		selected_student: null,
		openModal: false
	};

	handleSearchChange = (e, { value }) => {
		const self = this;
		this.setState({ value });

		if (value.length >= minCharacters) {
			const { timeout: oldTimeout } = this.state;
			clearTimeout(oldTimeout);

			const timeout = setTimeout(() => {
				self.props.getStudents({ access_type: 'exclude', search: value });
			}, 1000);
			this.setState({ timeout });
		}
	}

	handleResultSelect = (e, { result }) => {
		this.setState({ value: result.title, selected_student: result });
	}

	handleOnAddExcludeStudent = ({
		fields,
		selected_student,
		selectedExcludeAccessStudents
	}) => {
		if (
			!selectedExcludeAccessStudents
			|| (
				selectedExcludeAccessStudents
				&& selectedExcludeAccessStudents.findIndex(stud => stud.emplid === selected_student.emplid) === -1
			)
		) {
			fields.push(selected_student);

			// clear fields
			this.setState({ value: '', selected_student: null });
		}
	}

	renderModal = () => {
		const { openModal } = this.state;
		return (
			<div>
				<UploadModal
					{...this.props}
					accessType="exclude"
					openModal={openModal}
					toggleModal={this.toggleModal}
				/>
			</div>
		);
	}

	toggleModal = () => {
		this.setState({ openModal: !this.state.openModal });
	}

	showUploadIncludeModal = () => {
		this.toggleModal();
	}

	render() {
		const {
			fields,
			loadingAccessStudentsExclude,
			search_students_exclude,
			loadingSearchStudentsExclude,
			selectedExcludeAccessStudents
		} = this.props;
		const { value, selected_student } = this.state;

		return (
			<React.Fragment>
				{this.renderModal()}
				<Form className="content-header">
					<Form.Group>
						<Form.Field width={10}>
							<Search
								fluid
								minCharacters={minCharacters}
								disabled={loadingAccessStudentsExclude}
								loading={loadingSearchStudentsExclude}
								onResultSelect={this.handleResultSelect}
								onSearchChange={this.handleSearchChange}
								results={search_students_exclude}
								resultRenderer={resultRenderer}
								value={value}
								placeholder="Search for student"
							/>
						</Form.Field>
						<Form.Field>
							<Button
								primary
								onClick={() => this.handleOnAddExcludeStudent({
									fields,
									selected_student,
									selectedExcludeAccessStudents
								})}
								content="Add"
								disabled={!selected_student || loadingSearchStudentsExclude}
							/>
						</Form.Field>
						<Form.Field width={1}/>
						<Form.Field>
							<Button
								primary
								onClick={() => this.showUploadIncludeModal()}
								content="Upload CSV"
							/>
						</Form.Field>
					</Form.Group>
				</Form>
				{/* Uncomment div to enable scroll horizontally */}
				{/* <div style={{width: '100%', overflowX: 'scroll'}}> */}
				<Table
					columns={1}
				>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Student ID</Table.HeaderCell>
							<Table.HeaderCell>Program</Table.HeaderCell>
							<Table.HeaderCell>Actions</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{fields.length === 0 &&
							<Table.Row key={0}>
								<Table.Cell
									colSpan={4}
									textAlign="center"
								>No Alumni</Table.Cell>
							</Table.Row>
						}
						{fields.map((item, index) => (
							<Table.Row key={`result-${index}`}>
								<Table.Cell width={4}>{`
									${fields.get(index).last_name ? fields.get(index).last_name : ''},
									${fields.get(index).first_name ? fields.get(index).first_name : ''}`}
								</Table.Cell>
								<Table.Cell width={4}>
									{fields.get(index).emplid ? fields.get(index).emplid : fields.get(index).student_id}
									<br />
									{fields.get(index).zr_email_srch && fields.get(index).zr_email_srch.split('|')[0]}
								</Table.Cell>
								<Table.Cell width={6}>
									({fields.get(index).grad_yr_eos && fields.get(index).grad_yr_eos})
									{fields.get(index).academic_plans && fields.get(index).academic_plans[0].descr}
								</Table.Cell>
								<Table.Cell width={2}>
									<Icon
										link
										name="minus circle"
										size="large"
										onClick={() => fields.remove(index)}
									/>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
				{/* </div> */}
			</React.Fragment>
		);
	}
}

// Decorate with connect to read form values
const parentSelector = formValueSelector('SegmentationPage');
ExcludeSpecificStudents = connect(state => {
	// can select values individually
	// or together as a group
	const selectedExcludeAccessStudents = parentSelector(state, 'access_students_exclude');
	return {
		selectedExcludeAccessStudents
	};
})(ExcludeSpecificStudents);

export default (
	reduxForm({
		form: 'ExcludeSpecificStudents'
	})
)(ExcludeSpecificStudents);