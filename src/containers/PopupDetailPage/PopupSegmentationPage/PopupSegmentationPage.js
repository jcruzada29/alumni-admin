import React, { Component } from 'react';
import UrlParse from 'url-parse';

import SegmentationPage from './../../../components/SegmentationPage';
import Loading from './../../../components/loading';

export class PopupSegmentationPage extends Component {
	state = {
		id: null
	};

	componentDidMount() {
		const { query } = UrlParse(this.props.location.search, true);
		const { id } = query;

		this.setState({ id });
	}

	render() {
		const { id } = this.state;

		if (!id) {
			return (
				<div className="bt-content-padded">
					<Loading />
				</div>
			);
		}

		return (
			<SegmentationPage
				type="popup"
				id={id}
			/>
		);
	}
}

export default PopupSegmentationPage;
