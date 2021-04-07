/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { FormGroup } from '@material-ui/core';

const { Dragger } = Upload;

export default function FileCustomVersion2({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
	style,
	...props
}) {
	return (
		<FormGroup>
			<label className="mb-16"> {label} </label>
			<Dragger>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p style={style} className="ant-upload-text">
					Chọn hoặc kéo thả vào khu vực này
				</p>
				<p className="ant-upload-hint">Hỗ trợ tải lên một lần hoặc hàng loạt.</p>
			</Dragger>
		</FormGroup>
	);
}
