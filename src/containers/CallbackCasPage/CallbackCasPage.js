import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import GeneralHelper from '../../helpers/general';
import Loading from '../../components/loading';

class CallbackCasPage extends Component {
	componentDidMount() {
		// this.props.location.search -> "?query1=value1"
		const query = GeneralHelper.queryStringToObject(this.props.location.search);
		this.props.authorizeWithTicket({ query });
	}
	render() {
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
}

CallbackCasPage.propTypes = {
	authorizeWithTicket: PropTypes.func.isRequired
};

CallbackCasPage.defaultProps = {};

// Use redux's compose to use multiple
// HOC(Higher Order Component) wrappers
export default CallbackCasPage;
