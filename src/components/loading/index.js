import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

export class Loading extends Component {
	render() {
		const { onTop, color } = this.props;
		const style = {
			width: 60,
			height: 20,
			zIndex: 1,
			...(onTop && {
				position: 'absolute',
				top: '50%',
				left: '50%',
				marginTop: -10,
				marginLeft: -30
			}),
			...(!onTop && {
				margin: '0 auto',
				paddingTop: 150,
				paddingBottom: 100
			})
		};
		return (
			<Spinner
				color={color}
				fadeIn="none"
				name="three-bounce"
				style={style}
			/>
		);
	}
}

Loading.propTypes = {
	color: PropTypes.string,
	width: PropTypes.number,
	paddingTop: PropTypes.number,
	paddingBottom: PropTypes.number
};

Loading.defaultProps = {
	color: '#444',
	width: 60,
	paddingTop: 150,
	paddingBottom: 100
};

export default Loading;
