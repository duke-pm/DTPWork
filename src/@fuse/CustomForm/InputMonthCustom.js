/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import { FieldFeedbackLabel } from './FieldFeedbackLabel';
import { TextField, FormGroup } from '@material-ui/core';

export default function InputMonthCustom({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
	...props
}) {
	return (
		<>
			<FormGroup>
				<label> {`${label} ${field && field.value} tháng `} </label>
				<TextField
					helperText={touched.name ? errors.name : ''}
					error={touched.name && Boolean(errors.name)}
					type={type}
					{...field}
					{...props}
					inputProps={{
						style: {
							height: '2px'
						}
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
