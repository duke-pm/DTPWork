import React from 'react';
// import { FieldFeedbackLabel } from './FieldFeedbackLabel';
import { TextField } from '@material-ui/core';

export default function InputCustom({
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
			<TextField
				helperText={touched.name ? errors.name : ''}
				error={touched.name && Boolean(errors.name)}
				label={label}
				type={type}
				{...field}
				{...props}
			/>
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
