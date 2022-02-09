import React, { Component } from 'react';
import { Button, Form, Grid, Header, Icon, Modal, Segment } from 'semantic-ui-react';
import { Field } from 'redux-form';
import {
	renderFormInput,
	renderFormTextArea,
	validateRequired
} from '../../../helpers/redux_form';

class MerchantModal extends Component {
	render() {
		const { openFormModal, toggleModal, invalid, pristine, loadingSubmit, handleSubmit, onSubmit } = this.props;
		return (
			<Modal
				size="tiny"
				open={openFormModal}
				onClose={toggleModal}
				className="cust-modal-holder"
			>
				<Modal.Header>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div style={{ marginRight: 'auto' }}>
							<Header as="h5">Merchant</Header>
						</div>
						<div>
							<Icon
								name="delete"
								color="grey"
								style={{ fontSize: '20px' }}
								onClick={toggleModal}
								className="cust-cursor-pointer"
							/>
						</div>
					</div>
				</Modal.Header>
				<Modal.Content>
					<Segment>
						<Grid.Row>
							<Header
								as="h6"
								style={{ borderBottom: '1px solid #f2f2f2', padding: '15px 15px 15px 15px', fontSize: '13px' }}
							>Basic Information</Header>
						</Grid.Row>
						<Form>
							<Grid.Row style={{ padding: '15px 15px 0px 15px' }}>
								<Form.Group widths={2}>
									<Form.Field>
										<Field
											component={renderFormInput}
											validate={[validateRequired]}
											name="name"
											placeholder="Name"
										/>
										<label><small style={{ marginLeft: '15px', color: '#999', fontSize: '10px' }}>Name</small></label>
									</Form.Field>
								</Form.Group>
							</Grid.Row>
							<Grid.Row style={{ padding: '0px 15px 0px 15px' }}>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormTextArea}
											placeholder="Remark"
											name="remark"
											rows="5"
										/>
										<label>
											<small style={{ marginLeft: '15px', color: '#999', fontSize: '10px' }}>Remark</small>
										</label>
									</Form.Field>
								</Form.Group>
							</Grid.Row>
						</Form>
					</Segment>
				</Modal.Content>
				<Modal.Actions>
					<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
						<div style={{ margin: '0px 10px' }}>
							<Button
								primary
								disabled={pristine || loadingSubmit || invalid}
								loading={loadingSubmit}
								onClick={handleSubmit(data => onSubmit(data))}
							>Save</Button>
						</div>
						<div>
							<Button
								basic
								onClick={toggleModal}
							>Cancel</Button>
						</div>
					</div>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default MerchantModal;
