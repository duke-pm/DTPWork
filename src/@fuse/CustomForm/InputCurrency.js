/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import NumberFormat from 'react-number-format';
import { FormGroup } from '@material-ui/core';
import { Input, Form } from 'antd';

const FormItem = Form.Item;

export default function InputCurrency({
	field, // { name, value, onChange, onBlur }
	form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	placeholder,
	submitCount,
	hasFeedback,
	type = 'text',
	...props
}) {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;
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
				<FormItem
					rules={[{ required: true }]}
					style={{ width: '100%' }}
					help={submittedError || touchedError ? hasError : false}
					validateStatus={submittedError || touchedError ? 'error' : 'success'}
				>
					<NumberFormat
						name={field.name}
						customInput={Input}
						value={field.value}
						placeholder={placeholder || ' '}
						onValueChange={val => form.setFieldValue(field.name, val.floatValue)}
						thousandSeparator
						prefix="VNĐ "
					/>
				</FormItem>
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
