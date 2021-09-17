/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Form, Input } from 'antd';
import { Typography, Grid } from '@material-ui/core';
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
	width,
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
			<Grid container spacing={2}>
				<Grid item lg={3} md={3} sm={3} xs={12}>
					<div className={`flex flex-row ${position && 'mt-6'}`}>
						<Typography variant="subtitle2" className="label--form">
							{label}
						</Typography>
						{hasFeedback && (
							<p style={{ marginBottom: '-20px' }} className="text-red">
								*
							</p>
						)}
					</div>
				</Grid>
				<Grid item lg={9} md={9} sm={9} xs={12}>
					<FormItem
						rules={[{ required: true }]}
						// style={{ width: position ? width || '80%' : '100%' }}
						className="w-full"
						help={submittedError || touchedError ? hasError : false}
						validateStatus={submittedError || touchedError ? 'error' : 'success'}
					>
						<Input
							{...field}
							{...props}
							type={type || null}
							className={`${readOnly ? 'readOnly' : ''}`}
							defaultValue={field.value || ''}
							placeholder={placeholder || ' '}
							onChange={onInputChange}
						/>
					</FormItem>
				</Grid>
			</Grid>
		</div>
	);
}
