/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FormGroup } from '@material-ui/core';
import { DatePicker, Form } from 'antd';
import * as moment from 'moment';

const FormItem = Form.Item;

export default function DateCustom({
	field, // { name, value, onChange, onBlur }
	form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
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
		form.setFieldValue(field.name, date);
	};
	const dateFormat = 'DD-MM-YYYY';
	return (
		<>
			<FormGroup>
				<label className="mb-10"> {label} </label>
				<FormItem
					rules={[{ required: true }]}
					hasFeedback={!!((hasFeedback && submitted) || (hasFeedback && touched))}
					help={submittedError || touchedError ? hasError : false}
					validateStatus={submittedError || touchedError ? 'error' : 'success'}
				>
					<DatePicker
						style={{ width: '100%' }}
						placeholder="Vui lòng chọn ngày"
						margin="normal"
						format={dateFormat}
						value={value ? moment(moment(value), dateFormat) : null}
						onChange={handleDateChange}
					/>
				</FormItem>
			</FormGroup>
		</>
	);
}
