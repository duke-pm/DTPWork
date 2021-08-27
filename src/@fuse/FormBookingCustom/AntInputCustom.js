/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Form, Input } from 'antd';
import { Typography } from '@material-ui/core';
import './index.scss';

const FormItem = Form.Item;
export default function AntInputCustom({
	readOnly,
	label,
	hasFeedback,
	field,
	submitCount,
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
				<Input
					className="ant-input-dtp"
					{...field}
					{...props}
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