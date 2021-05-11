/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import NumberFormat from 'react-number-format';
import { FormGroup } from '@material-ui/core';
import { Input } from 'antd';

export default function InputCurrency({
	field: { name, value }, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	placeholder,
	hasFeedback,
	type = 'text',
	...props
}) {
	return (
		<>
			<FormGroup>
				<div className="flex flex-row">
					<span> {label} </span>
					{hasFeedback && (
						<p style={{ marginBottom: '-20px' }} className="text-red ml-8">
							{' '}
							(*){' '}
						</p>
					)}
				</div>
				<NumberFormat
					name={name}
					customInput={Input}
					value={value}
					placeholder={placeholder || ' '}
					onValueChange={val => setFieldValue(name, val.floatValue)}
					thousandSeparator
					prefix="VNĐ "
				/>
			</FormGroup>

			{/* {withFeedbackLabel && (
				<FieldFeedbackLabel
					error={errors[name]}
					touched={touched[name]}
					label={label}
					type={type}
					customFeedbackLabel={customFeedbackLabel}
				/>
			)} */}
		</>
	);
}
