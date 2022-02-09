import React from 'react';
import _ from 'lodash';
import { Form, Dropdown } from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { DateInput, TimeInput, YearInput } from 'semantic-ui-calendar-react';

// Render fields
const renderFormInput = ({
	input,
	meta: { touched, invalid, error },
	...custom
}) => {
	return (
		<Form.Input
			{...input}
			{...custom}
			error={touched && !_.isNil(error)}
			autoComplete="off"
		/>
	);
};

const renderFormTextArea = ({
	input,
	meta: { touched, invalid, error },
	...custom
}) => {
	return (
		<Form.TextArea
			{...input}
			{...custom}
			error={touched && !_.isNil(error)}
			autoComplete="off"
		/>
	);
};

const renderFormSelect = ({
	input,
	meta: { touched, invalid, error },
	...custom
}) => {
	return (
		<Form.Select
			{...input}
			{...custom}
			clearable
			scrolling
			search
			error={touched && !_.isNil(error)}
			onBlur={(e, { value }) => input.onBlur(value)}
			onChange={(e, { value }) => input.onChange(value)}
		/>
	);
};

const renderDropdown = ({
	input,
	meta: { touched, invalid, error },
	...custom
}) => {
	return (
		<Dropdown
			{...input}
			{...custom}
			selection
			onChange={(e, { value }) => input.onChange(value)}
			fluid
		/>
	);
};

const renderDateRange = ({
	input,
	meta: { touched, invalid, error },
	...custom
}) => {
	return (
		<DatesRangeInput
			{...input}
			{...custom}
			error={touched && !_.isNil(error)}
			onChange={(e, { value }) => input.onChange(value)}
			onClear={(e, { value }) => input.onChange()}
			autoComplete="off"
		/>
	);
};

const renderCheckbox = ({
	input,
	meta: { touched, invalid, error },
	...custom
}) => {
	return (
		<Form.Checkbox
			{...input}
			{...custom}
			error={touched && !_.isNil(error)}
			value=""
			onChange={(e, { checked }) => input.onChange(checked)}
		// onClear={(e, { value }) => input.onChange()}
		/>
	);
};

const renderDateInput = ({
	input,
	meta: { touched, invalid, error },
	...custom
}) => {
	return (
		<DateInput
			{...input}
			{...custom}
			error={touched && !_.isNil(error)}
			onChange={(e, { value }) => input.onChange(value)}
			onClear={(e, { value }) => input.onChange()}
			autoComplete="off"
			dateFormat="YYYY-MM-DD"
		/>
	);
};

const renderTimeInput = ({
	input,
	meta: { touched, invalid, error },
	...custom
}) => {
	return (
		<TimeInput
			{...input}
			{...custom}
			error={touched && !_.isNil(error)}
			onChange={(e, { value }) => input.onChange(value)}
			onClear={(e, { value }) => input.onChange()}
			autoComplete="off"
		/>
	);
};

const renderYearInput = ({
	input,
	meta: { touched, invalid, error },
	...custom
}) => {
	return (
		<YearInput
			{...input}
			{...custom}
			error={touched && !_.isNil(error)}
			onChange={(e, { value }) => input.onChange(value)}
			onClear={(e, { value }) => input.onChange('')}
			autoComplete="off"
		/>
	);
};


const renderFileInputButton = ({
	input: { value: omitValue, onChange, onBlur, ...inputProps },
	meta: omitMeta,
	...props
}) => {
	return (
		<div>
			<label
				htmlFor="file"
				className="ui icon button"
			>Select file</label>
			<input
				id="file"
				onChange={adaptFileEventToValue(onChange)}
				onBlur={adaptFileEventToValue(onBlur)}
				type="file"
				{...props.input}
				{...props}
				hidden
			/>
		</div>
	);
};

// Validations
const validateRequired = value => (value || typeof value === 'number' ? undefined : 'Required');
const validateDateRange = value => {
	const datesArr = _.compact(value.split(' - '));
	return datesArr.length === 2 ? undefined : 'Select two dates';
};
const validateNumberMin = (value, min) => +value >= (_.isNil(min) ? 0 : +min) ? undefined : `Minimum is ${_.isNil(min) ? 0 : +min}`;
const validateNumberMax = (value, max) => +value <= (_.isNil(max) ? 0 : +max) ? undefined : `Maximum is ${_.isNil(max) ? 0 : +max}`;

// custom validation
const _isEmail = value => {
	// eslint-disable-next-line no-useless-escape
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(value).toLowerCase());
};
const validateEmail = value => {
	return _isEmail(value) ? undefined : 'Invalid Email';
};
const validateUstEmail = value => {
	if (!value || !_isEmail(value)) {
		return 'Invalid Email';
	}
	return (_.endsWith(value, '@ust.hk') || _.endsWith(value, '.ust.hk')) ? undefined : 'Invalid Email';
};

const validateMatchPassword = (value, allValues) => {
	if (value === undefined && allValues.password === "" || allValues.password === null) {
		return;
	} else {
		return value !== allValues.password ? 'Passwords do not match' : undefined;
	}
};

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);


export {
	// render fields
	renderFormInput,
	renderFormTextArea,
	renderCheckbox,
	renderFormSelect,
	renderDropdown,
	renderDateRange,
	renderDateInput,
	renderTimeInput,
	renderYearInput,
	renderFileInputButton,
	// validations
	validateRequired,
	validateDateRange,
	validateNumberMin,
	validateNumberMax,
	validateEmail,
	validateUstEmail,
	validateMatchPassword
};
