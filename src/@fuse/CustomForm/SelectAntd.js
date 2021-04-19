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
	valueProps,
	handleChangeState,
	options,
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
	console.log(options);
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
					<Select defaultValue={valueProps} onChange={handleSelect}>
						{options.map(items => (
							<Option key={items.value}> {items.label} </Option>
						))}
					</Select>
				</FormItem>
			</FormGroup>
		</>
	);
}
