/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import { FieldFeedbackLabel } from './FieldFeedbackLabel';
import { FormGroup } from '@material-ui/core';
import { Input, Form } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

export default function InputTextAreaLg({
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
				<label className="mb-10"> {label} </label>
				<FormItem
					rules={[{ required: true }]}
					style={{ width: '100%' }}
					hasFeedback={!!((hasFeedback && submitted) || (hasFeedback && touched))}
					help={submittedError || touchedError ? hasError : false}
					validateStatus={submittedError || touchedError ? 'error' : 'success'}
				>
					<TextArea
						className={readOnly ? 'readOnly' : ''}
						placeholder={placeholder || ''}
						rows={row}
						onChange={e => onChange(e)}
						type={type}
						// {...field}
						// {...props}
					/>
				</FormItem>
			</FormGroup>
		</>
	);
}
