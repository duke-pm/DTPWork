/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FormGroup } from '@material-ui/core';
import { DatePicker, Form, Select } from 'antd';
import 'antd/dist/antd.css';

const FormItem = Form.Item;
const { Option } = Select;

export default function SelectAntd({
	field, // { name, value, onChange, onBlur }
	form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	handleChangeState,
	selectOptions,
	hasFeedback,
	notFoundContent,
	submitCount,
	...props
}) {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;
	const handleSelect = value => {
		form.setFieldValue(field.name, value);
		return handleChangeState ? handleChangeState(value) : null;
	};
	console.log(hasFeedback);
	return (
		<>
			<FormGroup>
				<label className="mb-10"> {label} </label>
				<FormItem
					style={{ width: '100%' }}
					rules={[{ required: true }]}
					hasFeedback={!!((hasFeedback && submitted) || (hasFeedback && touched)) || hasFeedback}
					help={submittedError || touchedError ? hasError : false}
					validateStatus={submittedError || touchedError ? 'error' : hasFeedback && 'success'}
				>
					<Select
						notFoundContent={notFoundContent}
						{...field}
						{...props}
						style={{ zIndex: 2000, width: '100%' }}
						value={field.value}
						onChange={handleSelect}
					>
						{selectOptions && selectOptions.map(name => <Option key={name}>{name}</Option>)}
					</Select>
				</FormItem>
			</FormGroup>
		</>
	);
}
