/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Divider, FormGroup } from '@material-ui/core';
import { Form, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { Option } = Select;

export default function SelectAntdCustom({
	field, // { name, value, onChange, onBlur }
	form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	valueProps,
	handleChangeState,
	options,
	placeholder,
	hasFeedback,
	notFoundContent,
	readOnly,
	handleOpenSelectCustom,
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
	const handleClick = () => {
		return handleOpenSelectCustom && handleOpenSelectCustom(true);
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
					style={{ width: '100%' }}
					rules={[{ required: true }]}
					help={submittedError || touchedError ? hasError : false}
					validateStatus={submittedError || touchedError ? 'error' : hasFeedback && 'success'}
				>
					<Select
						{...field}
						{...props}
						showSearch
						allowClear
						dropdownRender={menu => (
							<div>
								{menu}
								<Divider style={{ margin: '4px 0' }} />
								<div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
									<a
										style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
										onClick={handleClick}
									>
										<PlusOutlined /> Thêm mới
									</a>
								</div>
							</div>
						)}
						placeholder={placeholder || ''}
						className={readOnly ? 'readOnly' : ''}
						optionFilterProp="children"
						filterOption={(input, option) =>
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						defaultValue={field.value}
						onChange={handleSelect}
					>
						{options.map(p => (
							<Option key={p.value} value={p.value}>
								{p.label}
							</Option>
						))}
					</Select>
				</FormItem>
			</FormGroup>
		</>
	);
}
