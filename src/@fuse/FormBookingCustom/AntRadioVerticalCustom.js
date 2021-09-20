/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Form, Input, Radio, Space } from 'antd';
import './index.scss';

import Text from 'app/components/Text';

const FormItem = Form.Item;
export default function AntRadioVerticalCustom({
	readOnly,
	label,
	hasFeedback,
	field,
	submitCount,
	form,
	options,
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
	const onChange = ({ target }) => {
		form.setFieldValue(field.name, target.value);
		// return handleInputChange ? handleInputChange(target) : null;
	};
	return (
		<div className={`form-item-input ${position && 'flex flex-row  justify-between'}`}>
			<div className={`flex flex-row mb-8 `}>
				<Text required={hasFeedback} type="body">
					{label}
				</Text>
			</div>
			<FormItem
				rules={[{ required: true }]}
				help={submittedError || touchedError ? hasError : false}
				validateStatus={submittedError || touchedError ? 'error' : 'success'}
			>
				<Radio.Group {...field} {...props} onChange={onChange}>
					<Space direction="vertical">
						{options?.map(op => (
							<Radio value={op.value} key={op.value}>
								<div>
									<Text type="body" color="primary">
										{op.label}
									</Text>
									<Text type="caption" color="primary">
										{op.description}
									</Text>
								</div>
							</Radio>
						))}
					</Space>
				</Radio.Group>
			</FormItem>
		</div>
	);
}
