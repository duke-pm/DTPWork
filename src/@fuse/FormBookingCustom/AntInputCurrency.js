/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import NumberFormat from 'react-number-format';
import { FormGroup, Typography } from '@material-ui/core';
import { Input, Form } from 'antd';

const FormItem = Form.Item;

export default function AntInputCurrency({
	field, // { name, value, onChange, onBlur }
	form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	placeholder,
	width,
	submitCount,
	position,
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
			<div className={`form-item-input ${position && 'flex flex-row  justify-between'}`}>
				<div className={`flex flex-row ${position && 'mt-8'}`}>
					<Typography variant="subtitle2" className="label--form">
						{label}
					</Typography>{' '}
					{hasFeedback && (
						<p style={{ marginBottom: '-20px' }} className="text-red">
							*
						</p>
					)}
				</div>
				<FormItem
					rules={[{ required: true }]}
					style={{ width: position ? width || '80%' : '100%' }}
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
			</div>
		</>
	);
}
