/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Upload, Form } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import Text from 'app/components/Text';

const { Dragger } = Upload;

const FormItem = Form.Item;

export default function AntFileCustom({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
	handleChangeImage,
	style,
	hasFeedback,
	...props
}) {
	const handleChangeFile = info => {
		setFieldValue(field.name, info.file.originFileObj);
		return handleChangeImage ? handleChangeImage(info.file.originFileObj) : null;
	};
	return (
		<div className="form-item-input">
			<div className="flex flex-row mt-8">
				<Text required={hasFeedback} type="body">
					{label}
				</Text>
			</div>
			<FormItem>
				<Dragger {...field} {...props} onChange={handleChangeFile}>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p style={style} className="ant-upload-text">
						Chọn hoặc kéo thả vào khu vực này
					</p>
					<p className="ant-upload-hint">Hỗ trợ tải lên một lần hoặc hàng loạt.</p>
				</Dragger>
			</FormItem>
		</div>
	);
}
