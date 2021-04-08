/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FormGroup } from '@material-ui/core';
import { Input } from 'antd';

export default function InputCustom({
	field,
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
				<label className="mb-10"> {label} </label>
				<Input type={type} {...field} {...props} />
				{errors[field.name] && touched[field.name] ? (
					<div className="text-red">{errors[field.name]}</div>
				) : null}
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
