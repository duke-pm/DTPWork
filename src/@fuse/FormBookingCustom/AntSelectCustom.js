/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Form, Input, Radio, Select } from 'antd';
import { Typography } from '@material-ui/core';
import './index.scss';

const FormItem = Form.Item;
const { Option } = Select;

export default function AntSelectCustom({
	readOnly,
	label,
	hasFeedback,
	field,
	submitCount,
	form,
	width,
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
			<div className={`flex flex-row ${position && 'mt-8'}`}>
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
				style={{ width: position ? width || '80%' : '100%' }}
				help={submittedError || touchedError ? hasError : false}
				validateStatus={submittedError || touchedError ? 'error' : 'success'}
			>
				<Select
					{...field}
					{...props}
					showSearch
					allowClear
					placeholder={placeholder || ''}
					className={readOnly ? 'readOnly' : ''}
					optionFilterProp="children"
					filterOption={(input, option) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					defaultValue={field.value}
					onChange={onChange}
				>
					{options.map(p => (
						<Option key={p.value} value={p.value}>
							{p.label}
						</Option>
					))}
				</Select>
			</FormItem>
		</div>
	);
}
