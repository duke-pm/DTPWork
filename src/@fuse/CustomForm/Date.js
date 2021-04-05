/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { FormGroup, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

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
	const handleDateChange = data => {
		setFieldValue(name, data._d);
	};
	return (
		<>
			<FormGroup>
				<label> {label} </label>
				<KeyboardDatePicker
					margin="normal"
					format="DD/MM/YYYY"
					value={value}
					variant="outlined"
					onChange={handleDateChange}
					helperText={touched[field.name] ? errors[field.name] : ''}
					error={touched[field.name] && Boolean(errors[field.name])}
					KeyboardButtonProps={{
						'aria-label': 'change date'
					}}
				/>
			</FormGroup>
			{/* {withFeedbackLabel && (
				<FieldFeedbackLabel
					error={errors[field.name]}
					touched={touched[field.name]}
					label={label}
					type={type}
					customFeedbackLabel={customFeedbackLabel}
				/>
			)} */}
		</>
	);
}
