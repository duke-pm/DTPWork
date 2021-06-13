/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import { FieldFeedbackLabel } from './FieldFeedbackLabel';
import { FormGroup } from '@material-ui/core';
import { Input } from 'antd';

const { TextArea } = Input;

export default function InputTextArea({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
	handleInputChangeNote,
	placeholder,
	row,
	...props
}) {
	const onChange = e => {
		setFieldValue(field.name, e.target.value);
		return handleInputChangeNote ? handleInputChangeNote(e) : null;
	};
	return (
		<>
			<FormGroup>
				<label> {label} </label>
				<TextArea
					placeholder={placeholder || ''}
					rows={row}
					onChange={e => onChange(e)}
					type={type}
					{...field}
					{...props}
				/>
			</FormGroup>
		</>
	);
}
