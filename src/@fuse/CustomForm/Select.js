/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
// import { FormGroup, Label, FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';
// import { Select } from "antd";
import SelectField from 'react-select';
import { FormGroup } from '@material-ui/core';

export function SelectCustomer(props) {
	const { field, form, options, label, placeholder, isMulti, handleChangeState, valueProps } = props;
	const { name, value } = field;
	console.log(field);
	const { errors, touched } = form;
	const showError = errors[name] && touched[name];

	const selectedOption = options.find(option => option.value === valueProps);
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
			<label className="mb-10"> {label} </label>
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
				className={showError ? 'is-invalid' : ''}
			/>
			{/* <ErrorMessage name={name} component={FormFeedback} /> */}
		</FormGroup>
	);
}
