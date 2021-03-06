/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Form, Input } from 'antd';
import './index.scss';

import Text from 'app/components/Text';

const FormItem = Form.Item;
export default function AntInputCustom({
	readOnly,
	label,
	hasFeedback,
	field,
	submitCount,
	form,
	type,
	handleInputChange,
	width,
	placeholder,
	position,
	...props
}) {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;
	const onInputChange = ({ target }) => {
		form.setFieldValue(field.name, target.value);
		return handleInputChange ? handleInputChange(target) : null;
	};
	return (
		<div className={`form-item-input ${position && 'flex flex-row justify-between'}`}>
			<div className={`flex flex-row ${position && 'mt-8'}`}>
				<Text required={hasFeedback} type="body">
					{label}
				</Text>
			</div>
			<FormItem
				rules={[{ required: true }]}
				style={{ width: position ? width || '80%' : '100%' }}
				help={submittedError || touchedError ? hasError : false}
				validateStatus={submittedError || touchedError ? 'error' : 'success'}
			>
				<Input
					{...field}
					{...props}
					type={type || null}
					className={`${readOnly ? 'readOnly' : ''}`}
					defaultValue={field.value || ''}
					placeholder={placeholder || ' '}
					onChange={onInputChange}
				/>
			</FormItem>
		</div>
	);
}
