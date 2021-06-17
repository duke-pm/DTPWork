/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { FormGroup } from '@material-ui/core';
import 'antd/dist/antd.css';

const FormItem = Form.Item;
const { Option } = Select;

const CreateAntField = AntComponent => ({
	field,
	form,
	hasFeedback,
	label,
	selectOptions,
	submitCount,
	width,
	placeholder,
	handleInputChange,
	handleOnChangeBlur,
	disabled,
	position,
	type,
	readOnly,
	notFoundContent,
	handleChangeState,
	...props
}) => {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;
	const onInputChange = ({ target }) => {
		form.setFieldValue(field.name, target.value);
		return handleInputChange ? handleInputChange(target) : null;
	};
	const onChange = value => {
		form.setFieldValue(field.name, value);
		return handleChangeState ? handleChangeState(value) : null;
	};
	const onBlur = e => {
		form.setFieldTouched(field.name, e.target.value);
		return handleOnChangeBlur && handleOnChangeBlur(e.target.value);
	};
	return (
		<div className={`${position && 'flex flex-row  justify-between'}`}>
			<div className={`flex flex-row ${position && 'mt-8'}`}>
				<span> {label} </span>
				{hasFeedback && (
					<p style={{ marginBottom: '-20px' }} className="text-red ml-8">
						{' '}
						(*){' '}
					</p>
				)}
			</div>
			<FormItem
				rules={[{ required: true }]}
				style={{ width: position ? width || '80%' : '100%' }}
				help={submittedError || touchedError ? hasError : false}
				validateStatus={submittedError || touchedError ? 'error' : 'success'}
			>
				<AntComponent
					style={{ width: '100%' }}
					{...field}
					{...props}
					type={type || null}
					className={readOnly ? 'readOnly' : ''}
					defaultValue={field.value || ''}
					// notFoundContent={notFoundContent || null}
					onBlur={onBlur}
					placeholder={placeholder || ' '}
					onChange={type ? onInputChange : onChange}
				>
					{selectOptions && selectOptions.map(name => <Option key={name}>{name}</Option>)}
				</AntComponent>
			</FormItem>
		</div>
	);
};

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntInputPassword = CreateAntField(Input.Password);
export const AntInputNumber = CreateAntField(InputNumber);
