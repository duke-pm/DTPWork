/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Cascader, Form } from 'antd';
import { Typography } from '@material-ui/core';
import './index.scss';

const FormItem = Form.Item;
export default function AntCascadeCustom({
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
	const onChange = value => {
		console.log(value);
		form.setFieldValue(field.name, value);
		// return handleInputChange ? handleInputChange(target) : null;
	};
	return (
		<div className={`form-item-input ${position && 'flex flex-row  justify-between'}`}>
			<div className={`flex flex-row `}>
				<Typography color="primary" variant="subtitle2" className="label--form">
					{' '}
					{label}{' '}
				</Typography>
				{hasFeedback && (
					<p style={{ marginBottom: '-20px' }} className="text-red">
						*
					</p>
				)}
			</div>
			<FormItem
				rules={[{ required: true }]}
				help={submittedError || touchedError ? hasError : false}
				validateStatus={submittedError || touchedError ? 'error' : 'success'}
			>
				<Cascader {...field} {...props} options={options} onChange={onChange} placeholder="Please select" />
			</FormItem>
		</div>
	);
}
