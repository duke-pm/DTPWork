/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { TimePicker, Form } from 'antd';
import * as moment from 'moment';

const FormItem = Form.Item;

export default function AntTimeCustom({
	field, // { name, value, onChange, onBlur }
	form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
	width,
	placeholder,
	marginleft,
	readOnly,
	className,
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
	// const { value } = field;
	const handleDateChange = (time, timeString) => {
		form.setFieldValue(field.name, time);
	};
	// const dateFormat = 'DD/MM/YYYY';
	return (
		<>
			<div className={`form-item-input ${position && 'flex flex-row justify-between '}`}>
				{label && (
					<div className={`flex flex-row ${position && 'mt-8'}`}>
						<span> {label} </span>
						{hasFeedback && (
							<p style={{ marginBottom: '-20px' }} className="text-red ml-8">
								{' '}
								(*){' '}
							</p>
						)}
					</div>
				)}
				<FormItem
					style={{ width: '95%', marginLeft: marginleft || null }}
					rules={[{ required: true }]}
					help={submittedError || touchedError ? hasError : false}
					validateStatus={submittedError || touchedError ? 'error' : 'success'}
				>
					<TimePicker onChange={handleDateChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
				</FormItem>
			</div>
		</>
	);
}
