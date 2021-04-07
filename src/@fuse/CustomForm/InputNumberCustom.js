/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import { FieldFeedbackLabel } from './FieldFeedbackLabel';
import { FormGroup } from '@material-ui/core';
import { InputNumber } from 'antd';

export default function InputNumberCustom({
	field,
	form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
	...props
}) {
	const onChange = number => {
		setFieldValue(field.name, number);
	};
	return (
		<>
			<FormGroup>
				<label className="mb-16">
					{' '}
					{label} {field.value ? `${field.value} tháng ` : null}{' '}
				</label>
				<InputNumber style={{ width: '100%' }} type={type} {...field} {...props} onChange={onChange} />
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
