/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Form, Select } from 'antd';
import { badgeStatusGobal } from '@fuse/core/DtpConfig';

const FormItem = Form.Item;
const { Option } = Select;

export default function SelectAntdCustomStatus({
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
					<Select
						{...field}
						{...props}
						allowClear
						placeholder={placeholder || ''}
						className={readOnly ? 'readOnly' : ''}
						optionFilterProp="children"
						defaultValue={field.value}
						onChange={handleSelect}
					>
						{options.map(p => (
							<Option key={p.value} value={p.value}>
								<p style={{ color: badgeStatusGobal[p.value] }}> {p.label} </p>
							</Option>
						))}
					</Select>
				</FormItem>
			</div>
		</>
	);
}
