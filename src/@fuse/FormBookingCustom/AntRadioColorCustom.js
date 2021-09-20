/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Form, Radio } from 'antd';
import './index.scss';

import Text from 'app/components/Text';

const FormItem = Form.Item;
export default function AntRadioColorCustom({
	readOnly,
	label,
	options,
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
	const onChange = value => {
		form.setFieldValue(field.name, value);
		// return handleInputChange ? handleInputChange(target) : null;
	};
	return (
		<div className={`form-item-input ${position && 'flex flex-row  justify-between'}`}>
			<div className={`flex flex-row `}>
				<Text required={hasFeedback} type="body">
					{label}
				</Text>
			</div>
			<FormItem
				rules={[{ required: true }]}
				help={submittedError || touchedError ? hasError : false}
				validateStatus={submittedError || touchedError ? 'error' : 'success'}
			>
				<Radio.Group className="radio-color-group" size="middle" onChange={onChange} {...field} {...props}>
					{options?.map(op => (
						<Radio.Button key={op.value} value={op.value} style={{ backgroundColor: op.color }} />
					))}
				</Radio.Group>
			</FormItem>
		</div>
	);
}
