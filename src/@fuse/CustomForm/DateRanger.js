/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FormGroup } from '@material-ui/core';
import { DatePicker, Form } from 'antd';
import * as moment from 'moment';

const FormItem = Form.Item;

export default function DateRanger({
	field, // { name, value, onChange, onBlur }
	form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
	readOnly,
	hasFeedback,
	submitCount,
	...props
}) {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;
	const { value } = field;
	const handleDateChange = (date, dateString) => {
		console.log(date, dateString);
		form.setFieldValue(field.name, date);
	};
	const dateFormat = 'DD-MM-YYYY';
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
					help={submittedError || touchedError ? hasError : false}
					validateStatus={submittedError || touchedError ? 'error' : 'success'}
				>
					<DatePicker.RangePicker
						className={readOnly ? 'readOnly' : ''}
						style={{ width: '100%' }}
						margin="normal"
						format={dateFormat}
						defaultValue={
							value ? [moment(moment(value), dateFormat), moment(moment(value), dateFormat)] : null
						}
						onChange={handleDateChange}
					/>
				</FormItem>
			</FormGroup>
		</>
	);
}
