/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { DatePicker, Form } from 'antd';
import './index.scss';
import * as moment from 'moment';

import Text from 'app/components/Text';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

export default function AntDatepickerCustom({
	readOnly,
	label,
	hasFeedback,
	field,
	submitCount,
	form,
	type,
	options,
	placeholder,
	position,
	...props
}) {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;
	const { value } = field;
	const onChange = (date, dateString) => {
		form.setFieldValue(field.name, date);
		// return handleInputChange ? handleInputChange(target) : null;
	};
	const dateFormat = 'DD/MM/YYYY hh:mm:ss';
	function disabledDate(current) {
		// Can not select days before today and today
		return current && current < moment().subtract(1, 'days');
	}
	return (
		<div className={`form-item-input ${position && 'flex flex-row  justify-between'}`}>
			<div className={`flex flex-row `}>
				<Text required={hasFeedback} type="body">
					{label}
				</Text>
			</div>
			<FormItem
				rules={[{ required: true }]}
				help={submittedError || touchedError ? hasError : false}
				validateStatus={submittedError || touchedError ? 'error' : 'success'}
			>
				<RangePicker
					onChange={onChange}
					showTime
					format={dateFormat}
					disabledDate={disabledDate}
					value={value ? [moment(moment(value), dateFormat), moment(moment(value), dateFormat)] : null}
				/>
			</FormItem>
		</div>
	);
}
