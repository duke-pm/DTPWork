/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import { FieldFeedbackLabel } from './FieldFeedbackLabel';
import { FormGroup } from '@material-ui/core';
import { Input } from 'antd';

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
				<label className="mb-10"> {`${label} ${field && field.value} tháng `} </label>
				<Input error={touched.name && Boolean(errors.name)} type={type} {...field} {...props} />
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
