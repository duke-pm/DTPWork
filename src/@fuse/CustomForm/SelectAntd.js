/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FormGroup } from '@material-ui/core';
import { Form, Select } from 'antd';
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
	readOnly,
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
	return (
		<>
			<FormGroup>
				<label className="mb-10"> {label} </label>
				<FormItem
					style={{ width: '100%' }}
					rules={[{ required: true }]}
					hasFeedback={!!((hasFeedback && submitted) || (hasFeedback && touched))}
					help={submittedError || touchedError ? hasError : false}
					validateStatus={submittedError || touchedError ? 'error' : hasFeedback && 'success'}
				>
					<Select
						{...field}
						{...props}
						showSearch
						className={readOnly ? 'readOnly' : ''}
						optionFilterProp="children"
						filterOption={
							(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							// option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						defaultValue={field.value}
						onChange={handleSelect}
					>
						{options.map(p => (
							<Option value={p.value}>{p.label}</Option>
						))}
					</Select>
				</FormItem>
			</FormGroup>
		</>
	);
}
