/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { DatePicker, Form } from 'antd';
import * as moment from 'moment';

import Text from 'app/components/Text';

const FormItem = Form.Item;

export default function AntDateCustom({
	field, // { name, value, onChange, onBlur }
	form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
	width,
	disabledDate,
	placeholder,
	readOnly,
	position,
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
	function funcDisabledDate(current) {
		// Can not select days before today and today
		return current && current < moment().subtract(1, 'days');
	}
	const dateFormat = 'DD/MM/YYYY';
	return (
		<>
			<div className={`form-item-input ${position && 'flex flex-row justify-between '}`}>
				{label && (
					<div className={`flex flex-row ${position && 'mt-8'}`}>
						<Text required={hasFeedback} type="body">
							{label}
						</Text>
					</div>
				)}
				<FormItem
					style={{ width: position ? width || '80%' : '100%' }}
					rules={[{ required: true }]}
					help={submittedError || touchedError ? hasError : false}
					validateStatus={submittedError || touchedError ? 'error' : 'success'}
				>
					<DatePicker
						className={readOnly ? 'readOnly' : ''}
						style={{ width: '100%' }}
						// placeholder={placeholder || 'Vui lòng chọn ngày'}
						margin="normal"
						disabledDate={disabledDate && funcDisabledDate}
						format={dateFormat}
						value={value ? moment(moment(value), dateFormat) : null}
						onChange={handleDateChange}
					/>
				</FormItem>
			</div>
		</>
	);
}
