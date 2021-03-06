/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FormGroup } from '@material-ui/core';
import { Form, Checkbox } from 'antd';

const FormItem = Form.Item;

export default function CheckboxAntd({
	field, // { name, value, onChange, onBlur }
	form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	value,
	valueProps,
	handleChangeState,
	readOnly,
	options,
	labelAligh,
	hasFeedback,
	top,
	notFoundContent,
	submitCount,
	...props
}) {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;
	const onChange = e => {
		form.setFieldValue(field.name, e.target.checked);
		return handleChangeState ? handleChangeState(e) : null;
	};
	return (
		<>
			<FormGroup>
				<FormItem
					label={label}
					style={{ width: '100%', marginTop: top || '0px' }}
					rules={[{ required: true }]}
					hasFeedback={!!((hasFeedback && submitted) || (hasFeedback && touched))}
					help={submittedError || touchedError ? hasError : false}
					validateStatus={submittedError || touchedError ? 'error' : hasFeedback && 'success'}
				>
					<Checkbox className={readOnly ? 'readOnly' : ''} defaultChecked={value} onChange={onChange} />
				</FormItem>
			</FormGroup>
		</>
	);
}
