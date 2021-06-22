/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Form, Slider } from 'antd';

const FormItem = Form.Item;
function formatter(value) {
	return `${value}%`;
}
export default function SliderAntd({
	field, // { name, value, onChange, onBlur }
	form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	valueProps,
	handleChangeState,
	options,
	placeholder,
	width,
	hasFeedback,
	notFoundContent,
	readOnly,
	position,
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
			<div className={`${position && 'flex flex-row  justify-between'}`}>
				<div className={`flex flex-row ${position && 'mt-8'}`}>
					<span> {label} </span>
					{hasFeedback && (
						<p style={{ marginBottom: '-20px' }} className="text-red ml-8">
							{' '}
							(*){' '}
						</p>
					)}
				</div>
				<FormItem
					style={{ width: position ? width || '80%' : '100%' }}
					rules={[{ required: true }]}
					help={submittedError || touchedError ? hasError : false}
					validateStatus={submittedError || touchedError ? 'error' : hasFeedback && 'success'}
				>
					<Slider
						{...field}
						{...props}
						className={readOnly ? 'readOnly' : ''}
						onChange={handleSelect}
						tipFormatter={formatter}
						defaultValue={field.value}
					/>
				</FormItem>
			</div>
		</>
	);
}
