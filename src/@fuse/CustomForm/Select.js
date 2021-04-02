/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
// import { Select } from "antd";
import { FormGroup } from '@material-ui/core';
import SelectField from 'react-select';

Select.propTypes = {
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,

	label: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	option: PropTypes.array
};
Select.defaultProps = {
	label: '',
	placeholder: '',
	disabled: false,
	options: []
};
export default function Select(props) {
	const { field, form, options, label, placeholder, isMulti, handleChangeState } = props;
	const { name, value } = field;
	const { errors, touched } = form;
	const selectedOption = options.find(option => option.value === value);
	const handleSelectedOptionChange = selectedOption => {
		const selectedValue = selectedOption ? selectedOption.value : '';

		const changeEvent = {
			target: {
				name,
				value: selectedValue
			}
		};
		field.onChange(changeEvent);
		return handleChangeState ? handleChangeState(changeEvent) : null;
	};
	return (
		<FormGroup>
			<SelectField
				style={{ width: '100%' }}
				id={name}
				{...field}
				isClearable
				value={selectedOption}
				isMulti={isMulti}
				onChange={handleSelectedOptionChange}
				placeholder={placeholder}
				options={options}
				error={touched.name && Boolean(errors.name)}
			/>
			{/* <ErrorMessage name={name} component="span" className="invalid-input" /> */}
			{errors.name ? errors.name : ''}
		</FormGroup>
	);
}
