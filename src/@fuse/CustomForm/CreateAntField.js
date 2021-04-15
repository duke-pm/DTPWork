/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { DatePicker, Form, Input, InputNumber, TimePicker, Select } from 'antd';
import 'antd/dist/antd.css';
import { FormGroup } from '@material-ui/core';

const FormItem = Form.Item;
const { Option } = Select;

const CreateAntField = AntComponent => ({
	field,
	form,
	hasFeedback,
	label,
	selectOptions,
	submitCount,
	placeholder,
	disabled,
	type,
	notFoundContent,
	handleChangeState,
	...props
}) => {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;
	const onInputChange = ({ target: { value } }) => form.setFieldValue(field.name, value);
	const onChange = value => {
		form.setFieldValue(field.name, value);
		return handleChangeState ? handleChangeState(value) : null;
	};
	const onBlur = () => form.setFieldTouched(field.name, true);
	return (
		<FormGroup>
			<label className="mb-10"> {label} </label>
			<FormItem
				rules={[{ required: true }]}
				style={{ width: '100%' }}
				hasFeedback={!!((hasFeedback && submitted) || (hasFeedback && touched))}
				help={submittedError || touchedError ? hasError : false}
				validateStatus={submittedError || touchedError ? 'error' : 'success'}
			>
				<AntComponent
					style={{ width: '100%' }}
					{...field}
					{...props}
					disabled={disabled}
					defaultValue={field.value}
					notFoundContent={notFoundContent || ''}
					onBlur={onBlur}
					placeholder={placeholder || ' '}
					onChange={type ? onInputChange : onChange}
				>
					{selectOptions && selectOptions.map(name => <Option key={name}>{name}</Option>)}
				</AntComponent>
			</FormItem>
		</FormGroup>
	);
};

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntInputNumber = CreateAntField(InputNumber);
