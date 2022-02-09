import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Grid, Segment, Button, Form, Divider } from 'semantic-ui-react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Loading from '../../components/loading';
import { renderFormSelect } from '../../helpers/redux_form';

// custom validation
const validateBoolean = value => {
	return typeof value === 'boolean' ? undefined : 'Required';
};

class GeneralSettingsPage extends Component {
	componentDidMount() {
		this.props.getSettings();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, hasLoaded: prev_hasLoaded } = prevProps.generalSettingsPageProps;
		const { meta, hasLoaded } = this.props.generalSettingsPageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}

		if (hasLoaded && hasLoaded !== prev_hasLoaded) {
			const { settings } = this.props.generalSettingsPageProps;
			this.props.initialize(settings);
		}
	}

	componentWillUnmount() {
		this.props.resetPage();
	}

	render() {
		const {
			generalSettingsPageProps,
			// redux-form props
			handleSubmit,
			// pristine,
			submitting,
			invalid
		} = this.props;
		const { loading, loadingSubmit } = generalSettingsPageProps;
		const optionsSystemStatus = [
			{ value: false, text: 'Maintenance' },
			{ value: true, text: 'Live' }
		];
		const optionsStatus = [
			{ value: true, text: 'Enabled' },
			{ value: false, text: 'Disabled' }
		];

		if (loading) {
			return (
				<Loading />
			);
		}

		return (
			<React.Fragment>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>General Settings</span>
				</div>
				<Divider />
				<div className="bt-content-padded">
					<Grid>
						<Grid.Row>
							<Grid.Column width={8}>
								<Segment>
									<h4>Maintenance</h4>
									<Form>
										<Form.Group>
											<Field
												component={renderFormSelect}
												width={8}
												options={optionsSystemStatus}
												name="system_status"
												placeholder="System Status"
												label="System Status"
												validate={[validateBoolean]}
												style={{ width: '100%' }}
											/>
										</Form.Group>
									</Form>
								</Segment>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={8}>
								<Segment>
									<h4>Feature Settings</h4>
									<Form>
										<Form.Group>
											<Field
												component={renderFormSelect}
												width={8}
												options={optionsStatus}
												name="library_status"
												placeholder="Library Status"
												label="Library Status"
												validate={[validateBoolean]}
												style={{ width: '100%' }}
											/>
											<Field
												component={renderFormSelect}
												width={8}
												options={optionsStatus}
												name="facility_status"
												placeholder="Facility Booking Status"
												label="Facility Booking Status"
												validate={[validateBoolean]}
												style={{ width: '100%' }}
											/>
										</Form.Group>
										<Form.Group>
											<Field
												component={renderFormSelect}
												width={8}
												options={optionsStatus}
												name="event_status"
												placeholder="Happenings Status"
												label="Happenings Status"
												validate={[validateBoolean]}
												style={{ width: '100%' }}
											/>
											<Field
												component={renderFormSelect}
												width={8}
												options={optionsStatus}
												name="parking_status"
												placeholder="Parking Privilege Status"
												label="Parking Privilege Status"
												validate={[validateBoolean]}
												style={{ width: '100%' }}
											/>
										</Form.Group>
									</Form>
								</Segment>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Button
						primary
						disabled={submitting || invalid || loadingSubmit}
						onClick={handleSubmit((data) => this.props.onSubmit(data))}
					>
						Save
					</Button>
				</div>
			</React.Fragment>
		);
	}
}

GeneralSettingsPage.propTypes = {
	generalSettingsPageProps: PropTypes.object.isRequired,
	getSettings: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	resetPage: PropTypes.func.isRequired
};

export default compose(
	withAlert(),
	reduxForm({
		form: 'GeneralSettingsPage'
	})
)(
	GeneralSettingsPage
);
