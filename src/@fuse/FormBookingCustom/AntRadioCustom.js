/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Form, Input, Radio } from 'antd';
import { Typography } from '@material-ui/core';
import './index.scss';

const FormItem = Form.Item;
export default function AntRadioCustom({
	readOnly,
	label,
	hasFeedback,
	field,
	submitCount,
	form,
	options,
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
	const onChange = ({ target }) => {
		form.setFieldValue(field.name, target.value);
		// return handleInputChange ? handleInputChange(target) : null;
	};
	return (
		<div className={`form-item-input ${position && 'flex flex-row  justify-between'}`}>
			{label ? (
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
			) : null}
			<FormItem
				rules={[{ required: true }]}
				help={submittedError || touchedError ? hasError : false}
				validateStatus={submittedError || touchedError ? 'error' : 'success'}
			>
				<Radio.Group {...field} {...props} onChange={onChange}>
					{options?.map(op => (
						<Radio value={op.value} key={op.value}>
							{' '}
							{op.label}{' '}
						</Radio>
					))}
				</Radio.Group>
			</FormItem>
		</div>
	);
}
