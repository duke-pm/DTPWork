/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { DatePicker, Form } from 'antd';
import * as moment from 'moment';
import { Typography, Grid } from '@material-ui/core';

const FormItem = Form.Item;

export default function AntDateCustom({
	field, // { name, value, onChange, onBlur }
	form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
	width,
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
	function disabledDate(current) {
		// Can not select days before today and today
		return current && current < moment().subtract(1, 'days');
	}
	const dateFormat = 'DD/MM/YYYY';
	return (
		<>
			<div className={`form-item-input ${position && 'flex flex-row justify-between '}`}>
				<Grid container spacing={2}>
					<Grid item lg={3} md={3} sm={3} xs={12}>
						{label && (
							<div className={`flex flex-row ${position && 'mt-6'}`}>
								<Typography variant="subtitle2" className="label--form">
									{label}
								</Typography>
								{hasFeedback && (
									<p style={{ marginBottom: '-20px' }} className="text-red">
										*
									</p>
								)}
							</div>
						)}
					</Grid>

					<Grid item lg={9} md={9} sm={9} xs={12}>
						<FormItem
							// style={{ width: position ? width || '80%' : '100%' }}
							className="w-full"
							rules={[{ required: true }]}
							help={submittedError || touchedError ? hasError : false}
							validateStatus={submittedError || touchedError ? 'error' : 'success'}
						>
							<DatePicker
								className={readOnly ? 'readOnly' : ''}
								style={{ width: '100%' }}
								// placeholder={placeholder || 'Vui lòng chọn ngày'}
								margin="normal"
								disabledDate={disabledDate}
								format={dateFormat}
								value={value ? moment(moment(value), dateFormat) : null}
								onChange={handleDateChange}
							/>
						</FormItem>
					</Grid>
				</Grid>
			</div>
		</>
	);
}
