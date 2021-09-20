/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Form, Select } from 'antd';
import { Icon } from '@material-ui/core';
import './index.scss';

import Text from 'app/components/Text';

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
				<Text required={hasFeedback} type="body">
					{label}
				</Text>
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
									{p.icon}
								</Icon>
								<Text className="ml-8" color="primary" type="body">
									{p.label}
								</Text>
							</div>
						</Option>
					))}
				</Select>
			</FormItem>
		</div>
	);
}
