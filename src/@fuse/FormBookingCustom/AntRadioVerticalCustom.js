/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Form, Input, Radio, Space } from 'antd';
import { Typography } from '@material-ui/core';
import './index.scss';

const FormItem = Form.Item;
export default function AntRadioVerticalCustom({
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
	const onChange = value => {
		form.setFieldValue(field.name, value);
		// return handleInputChange ? handleInputChange(target) : null;
	};
	return (
		<div className={`form-item-input ${position && 'flex flex-row  justify-between'}`}>
			<div className={`flex flex-row mb-8 `}>
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
				<Radio.Group {...field} {...props} onChange={onChange}>
					<Space direction="vertical">
						{options?.map(op => (
							<Radio value={op.value} key={op.value}>
								<div>
									<Typography className="label--radio-button" color="primary" variant="body2">
										{' '}
										{op.label}{' '}
									</Typography>
									<Typography color="primary" variant="caption">
										{' '}
										{op.description}{' '}
									</Typography>
								</div>
							</Radio>
						))}
					</Space>
				</Radio.Group>
			</FormItem>
		</div>
	);
}
