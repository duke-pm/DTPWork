/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import { FieldFeedbackLabel } from './FieldFeedbackLabel';
import { FormGroup } from '@material-ui/core';
import { Input, Form } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

export default function InputTextAreaRequest({
	field, // { name, value, onChange, onBlur }
	form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
	submitCount,
	handleInputChangeNote,
	placeholder,
	readOnly,
	hasFeedback,
	row,
	...props
}) {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;
	const onChange = e => {
		form.setFieldValue(field.name, e.target.value);
		return handleInputChangeNote ? handleInputChangeNote(e) : null;
	};
	return (
		<>
			<FormGroup>
				<div className="flex flex-row">
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
					style={{ width: '100%' }}
					help={submittedError || touchedError ? hasError : false}
					validateStatus={submittedError || touchedError ? 'error' : 'success'}
				>
					<TextArea
						className={readOnly ? 'readOnly' : ''}
						placeholder={placeholder || ''}
						rows={row}
						onChange={e => onChange(e)}
						type={type}
						{...field}
						{...props}
					/>
				</FormItem>
			</FormGroup>
		</>
	);
}
