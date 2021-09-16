/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { FormGroup, Typography } from '@material-ui/core';

const { Dragger } = Upload;

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
				<Typography variant="subtitle2" color="primary">
					{' '}
					{label}{' '}
				</Typography>
				{hasFeedback && (
					<p style={{ marginBottom: '-20px' }} className="text-red ml-8">
						{' '}
						(*){' '}
					</p>
				)}
			</div>
			<Dragger {...field} {...props} onChange={handleChangeFile}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p style={style} className="ant-upload-text">
					Chọn hoặc kéo thả vào khu vực này
				</p>
				<p className="ant-upload-hint">Hỗ trợ tải lên một lần hoặc hàng loạt.</p>
			</Dragger>
		</div>
	);
}
