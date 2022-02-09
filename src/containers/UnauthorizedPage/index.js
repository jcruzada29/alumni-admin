import React, { Component } from 'react';
import { Grid, Message } from 'semantic-ui-react';

class UnauthorizedPage extends Component {
	render() {
		return (
			<Grid
				centered
				stackable
				className="with-padding"
			>
				<Grid.Row>
					<Grid.Column>
						<Message negative>Unauthorized</Message>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default UnauthorizedPage;
