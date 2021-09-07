/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Form, Select } from 'antd';
import { Icon, Typography } from '@material-ui/core';
import './index.scss';

const FormItem = Form.Item;
const { Option } = Select;

export default function AntSelectIconCustom({
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
				<Select
					{...field}
					{...props}
					placeholder={placeholder || ''}
					className={readOnly ? 'readOnly' : ''}
					defaultValue={field.value}
					onChange={onChange}
				>
					{options.map(p => (
						<Option key={p.value} value={p.value}>
							<div className="flex items-center">
								<Icon color="primary" fontSize="small">
									{' '}
									{p.icon}{' '}
								</Icon>
								<Typography variant="body1" className="ml-8" color="primary">
									{' '}
									{p.label}{' '}
								</Typography>
							</div>
						</Option>
					))}
				</Select>
			</FormItem>
		</div>
	);
}
