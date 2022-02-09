import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Button, Message } from 'semantic-ui-react';

import Loading from '../../components/loading';
import GeneralHelper from '../../helpers/general';

class LoginPage extends Component {
	componentWillUnmount() {
		this.props.reset();
	}
	componentDidMount() {
		const query = GeneralHelper.queryStringToObject(this.props.location.search);
		this.props.showLoginForm({
			path: _.get(query, 'path')
		});
	}
	onFieldChange = (e, data) => {
		this.props.onFieldChange(e.target.name, data.value);
	}
	onKeyPress = e => {
		if (e.key === 'Enter') {
			this.onSubmit();
		}
	}
	onSubmit = e => {
		const { email, password } = this.props.loginPageProps;
		const query = GeneralHelper.queryStringToObject(this.props.location.search);
		this.props.login({ email, password, query });
	}
	render() {
		const { loginPageProps } = this.props;
		const { email, password, loading, error } = loginPageProps;

		if (!loginPageProps.showLoginForm) {
			return (
				<Grid>
					<Grid.Row>
						<Grid.Column width={16}>
							<Loading />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			);
		}


		return (
			<Grid
				centered
				stackable
				className="with-padding"
			>
				<Grid.Row>
					<Grid.Column>
						<Form
							error={error !== ''}
							onSubmit={this.onSubmit}
						>
							<Form.Group widths="equal">
								<Form.Input
									name="email"
									type="email"
									label="Email address"
									value={email}
									onChange={this.onFieldChange}
									onKeyPress={this.onKeyPress}
									required
								/>
							</Form.Group>
							<Form.Group widths="equal">
								<Form.Input
									name="password"
									type="password"
									label="Password"
									value={password}
									onChange={this.onFieldChange}
									onKeyPress={this.onKeyPress}
									required
								/>
							</Form.Group>
							<Button
								content="Login"
								primary
								fluid
								loading={loading}
								disabled={loading}
							/>
							{error && (
								<Message
									error
									content={error}
								/>
							)}
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

LoginPage.propTypes = {
	loginPageProps: PropTypes.object.isRequired,
	onFieldChange: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired
};

export default LoginPage;
