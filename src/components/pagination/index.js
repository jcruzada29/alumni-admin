import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Dropdown } from 'semantic-ui-react';
import './index.scss';

export class Pagination extends Component {
	onClickPrev = (e, obj) => {
		const { page, limit } = this.props;
		this.props.onPageChange(page - 1, limit);
	};

	onClickNext = (e, obj) => {
		const { page, limit } = this.props;
		this.props.onPageChange(page + 1, limit);
	};

	onItemsPerPageChange = (e, obj) => {
		if (this.props.onItemsPerPageChange) {
			this.props.onItemsPerPageChange(obj.value);
		}
	};

	getDropdownOptions(options) {
		return options.map(elem => {
			return {
				key: `${elem}`,
				text: `${elem}`,
				value: elem
			};
		});
	}

	render() {
		const { limit, page, total, options } = this.props;
		const disablePrev = page <= 1;
		const disableNext = page * limit >= total;
		const firstRowOfPage = 1 + (page - 1) * limit;
		const lastRowOfPage = firstRowOfPage - 1 + limit;
		const dropdownOptions = this.getDropdownOptions(options);

		return (
			<div className="pagination-style">
				<span>Records per page </span>
				<Dropdown
					options={dropdownOptions}
					value={limit}
					onChange={this.onItemsPerPageChange}
				/>
				<span>
					{firstRowOfPage}-{lastRowOfPage > total ? total : lastRowOfPage} of {total}
				</span>
				<Button
					icon
					disabled={disablePrev}
					onClick={this.onClickPrev}
				>
					<Icon name="angle left" />
				</Button>
				<Button
					icon
					disabled={disableNext}
					onClick={this.onClickNext}
				>
					<Icon name="angle right" />
				</Button>
			</div>
		);
	}
}

Pagination.propTypes = {
	total: PropTypes.number,
	page: PropTypes.number,
	limit: PropTypes.number,
	onPageChange: PropTypes.func
};

Pagination.defaultProps = {
	total: 0,
	page: 1,
	limit: 20
};

export default Pagination;
