/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FormGroup } from '@material-ui/core';
import { Form, Radio } from 'antd';
import 'antd/dist/antd.css';

const FormItem = Form.Item;

export default function RadioAntd({
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
	const onChange = e => {
		form.setFieldValue(field.name, e.target.value);
		return handleChangeState ? handleChangeState(e.target.value) : null;
	};
	return (
		<>
			<FormGroup>
				<label className="mb-10"> {label} </label>
				<FormItem
					style={{ width: '100%' }}
					className={readOnly ? 'readOnly' : ''}
					rules={[{ required: true }]}
					hasFeedback={!!((hasFeedback && submitted) || (hasFeedback && touched))}
					help={submittedError || touchedError ? hasError : false}
					validateStatus={submittedError || touchedError ? 'error' : hasFeedback && 'success'}
				>
					<Radio.Group defaultValue={field.value} options={options} onChange={onChange} />
				</FormItem>
			</FormGroup>
		</>
	);
}