import React from 'react';
import { connect } from 'react-redux';
import { Modal, Grid, Segment, Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import UrlParse from 'url-parse';
import LocalStorageHelper from '../../../helpers/local_storage';

import {
	renderFormInput,
	validateEmail
} from '../../../helpers/redux_form';

let AdminDetailForm = props => {
	const {
		//adminId,
		location,
		loadingSubmit,
		onSubmit,
		handleSubmit,
		pristine,
		submitting,
		invalid,
		change,
		openDelete,
		onDeleteConfirmation,
		onCloseDeleteModal,
		onDeleteAdminById
	} = props;

	const { query } = UrlParse(location, true);
	const adminId = query.id;
	const local_storage_admin_id = LocalStorageHelper.getAdminId();

	return (
		<React.Fragment>
			<Grid>
				<Grid.Row>
					<Grid.Column width={8}>
						<Segment>
							<h4>Admin Information</h4>
							<Form>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormInput}
											name="id"
											placeholder="Admin ID"
											disabled
										/>
										<label>Admin ID</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormInput}
											name="email"
											placeholder="Email"
											onChange={(event, newValue, previousValue) => {
												change('id', newValue.toLowerCase().split("@")[0]);
											}}
											validate={[validateEmail]}
										/>
										<label>Email</label>
									</Form.Field>
								</Form.Group>
								
							</Form>
						</Segment>
						{adminId && adminId !== local_storage_admin_id && (
							<Button
								negative
								disabled={ submitting || loadingSubmit}
								onClick={() => onDeleteConfirmation()}
								content="Delete"
								style={{ float: 'left' }}
							/>
						)}
						<Button
							primary
							disabled={pristine || submitting || invalid || loadingSubmit}
							onClick={handleSubmit(data => onSubmit(data))}
							content="Save"
							style={{ float: 'right' }}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>

			{/* DELETE CONFIRMATION MODAL */}
			<Modal
				open={openDelete}
				size="mini"
				onClose={() => onCloseDeleteModal()}
				closeIcon={{ name: 'close' }}
				closeOnDimmerClick={false}
			>
				<Modal.Header>Delete Admin</Modal.Header>
				<Modal.Content>
					<p>Are you sure to delete { adminId } ?</p>
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
						disabled={loadingSubmit}
						onClick={() => onDeleteAdminById(adminId)}
					>
						Yes
					</Button>
				</Modal.Actions>
			</Modal>
		</React.Fragment>
	);
};

AdminDetailForm = reduxForm({
	form: 'AdminDetailForm'
})(AdminDetailForm);

//const selector = formValueSelector('AdminDetailForm');
AdminDetailForm = connect(state => {
	//const adminId = selector(state, 'id');
	return {
		//adminId,
		initialValues: state.adminDetailPageReducer.admin
	};
})(AdminDetailForm);

export default AdminDetailForm;
