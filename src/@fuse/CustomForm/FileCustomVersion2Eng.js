/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { FormGroup } from '@material-ui/core';

const { Dragger } = Upload;

export default function FileCustomVersion2Eng({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
	readOnly,
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
			<Dragger className={readOnly ? 'readOnly' : ''} onChange={handleChangeFile}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p style={style} className="ant-upload-text">
					Click or drag file to this area to upload
				</p>
				<p className="ant-upload-hint"> Support for a single or bulk upload.</p>
			</Dragger>
		</FormGroup>
	);
}
