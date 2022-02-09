import React, { Component } from 'react';
import { Table, Icon, Button, Form, TableHeaderCell } from 'semantic-ui-react';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { renderFormInput } from '../../../../helpers/redux_form';

class EventUserTypes extends Component {
	handleOnAdd({ fields, change, addUserType, userTypes }) {
		if (
			!userTypes
			|| (
				userTypes
				&& userTypes.findIndex(o => o.name === addUserType) === -1
			)
		) {
			fields.push({
				name: addUserType
			});

			// clear fields
			change('add_user_type', '');
		}
	}

	render() {
		const {
			// redux-form formValueSelector values
			addUserType,
			userTypes,
			// redux-form props
			fields,
			change
		} = this.props;

		return (
			<React.Fragment>
				<Form className="content-header">
					<Form.Group>
						<Field
							component={renderFormInput}
							width={15}
							placeholder="Enter User Type"
							name="add_user_type"
						/>
						<Form.Field>
							<Button
								primary
								onClick={() => this.handleOnAdd({
									fields,
									change,
									addUserType,
									userTypes
								})}
								disabled={!addUserType}
							>
								Add
							</Button>
						</Form.Field>
					</Form.Group>
				</Form>
				<Table>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell width={12}>Name</Table.HeaderCell>
							<TableHeaderCell width={4}><center>Actions</center></TableHeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{fields.length === 0 &&
							<Table.Row key={0}>
								<Table.Cell colSpan={2}>No User Types</Table.Cell>
							</Table.Row>
						}
						{fields.map((field, index) => {
							const userType = fields.get(index);
							return (
								<Table.Row key={index}>
									<Table.Cell>{userType.name}</Table.Cell>
									{userType.name !== 'Alumni' && (
										<Table.Cell>
											<center>
												<Icon
													link
													name="minus circle"
													size="large"
													onClick={() => fields.remove(index)}
												/>
											</center>
										</Table.Cell>
									)}
									{userType.name !== 'Alumni' && <Table.Cell />}
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
			</React.Fragment>
		);
	}
}

const parentSelector = formValueSelector('EventBasicForm');
const selector = formValueSelector('EventUserTypes');
EventUserTypes = connect(state => {
	const addUserType = selector(state, 'add_user_type');
	const userTypes = parentSelector(state, 'user_types');
	return {
		addUserType,
		userTypes
	};
})(EventUserTypes);

EventUserTypes = reduxForm({
	form: 'EventUserTypes'
})(EventUserTypes);

export default EventUserTypes;
