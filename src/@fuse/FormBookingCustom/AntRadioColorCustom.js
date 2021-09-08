/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Form, Radio } from 'antd';
import { Typography } from '@material-ui/core';
import './index.scss';

const FormItem = Form.Item;
export default function AntRadioColorCustom({
	readOnly,
	label,
	options,
	hasFeedback,
	field,
	submitCount,
	form,
	type,
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
		form.setFieldValue(field.name, value);
		// return handleInputChange ? handleInputChange(target) : null;
	};
	return (
		<div className={`form-item-input ${position && 'flex flex-row  justify-between'}`}>
			<div className={`flex flex-row `}>
				<Typography color="primary" variant="body1" className="label--form">
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
				<Radio.Group className="radio-color-group" size="middle" onChange={onChange} {...field} {...props}>
					{options?.map(op => (
						<Radio.Button key={op.value} value={op.value} style={{ backgroundColor: op.color }} />
					))}
				</Radio.Group>
			</FormItem>
		</div>
	);
}
