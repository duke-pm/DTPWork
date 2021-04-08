/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FormGroup } from '@material-ui/core';
import { DatePicker } from 'antd';

export default function DateCustom({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
	...props
}) {
	const { value, name } = field;
	const handleDateChange = (date, dateString) => {
		setFieldValue(name, date);
	};
	return (
		<>
			<FormGroup>
				<label className="mb-10"> {label} </label>
				<DatePicker
					placeholder="Vui lòng chọn ngày"
					margin="normal"
					format="DD/MM/YYYY"
					value={value}
					onChange={handleDateChange}
					helperText={touched[field.name] ? errors[field.name] : ''}
					error={touched[field.name] && Boolean(errors[field.name])}
				/>
			</FormGroup>
		</>
	);
}
