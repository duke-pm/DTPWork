/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import { FieldFeedbackLabel } from './FieldFeedbackLabel';
import { FormGroup } from '@material-ui/core';
import { Input } from 'antd';

const { TextArea } = Input;

export default function InputTextAreaLg({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
	placeholder,
	row,
	...props
}) {
	return (
		<>
			<FormGroup>
				<label className="mb-10"> {label} </label>
				<TextArea
					placeholder={placeholder || ''}
					rows={row}
					variant="outlined"
					type={type}
					{...field}
					{...props}
				/>
			</FormGroup>
		</>
	);
}
