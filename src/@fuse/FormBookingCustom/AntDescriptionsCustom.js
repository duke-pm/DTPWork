/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
// import { FieldFeedbackLabel } from './FieldFeedbackLabel';
import { Input, Form } from 'antd';
import { Typography } from '@material-ui/core';
import './index.scss';

const FormItem = Form.Item;
const { TextArea } = Input;

export default function AntDescriptionsCustom({
	readOnly,
	label,
	hasFeedback,
	field,
	submitCount,
	row,
	form,
	type,
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
		// return handleInputChange ? handleInputChange(target) : null;
	};
	return (
		<div className={`form-item-input ${position && 'flex flex-row  justify-between'}`}>
			<div className={`flex flex-row mb-8 `}>
				<Typography color="primary" variant="body1" className="label--form">
					{' '}
					{label}{' '}
				</Typography>
				{hasFeedback && (
					<p style={{ marginBottom: '-20px' }} className="text-red">
						*
					</p>
				)}
			</div>
			<FormItem
				rules={[{ required: true }]}
				help={submittedError || touchedError ? hasError : false}
				validateStatus={submittedError || touchedError ? 'error' : 'success'}
			>
				<TextArea
					className="ant-input-dtp"
					{...field}
					{...props}
					rows={row}
					type={type || null}
					className={`${readOnly ? 'readOnly' : ''}ant-input-dtp`}
					defaultValue={field.value || ''}
					// notFoundContent={notFoundContent || null}
					placeholder={placeholder || ' '}
					onChange={onInputChange}
				/>
			</FormItem>
		</div>
	);
}
