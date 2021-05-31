/* eslint-disable no-multi-str */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FormGroup } from '@material-ui/core';
import { Form, Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

const FormItem = Form.Item;
const { Option } = Select;

export default function InputTinyCustom({
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
	submitCount,
	...props
}) {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;
	const handleEditorChange = content => {
		form.setFieldValue(field.name, content);
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
					<Editor
						apiKey="fzue4j9gz454my0rnl8dva7fb7cd34cgjeemn3ih4hlb7qa0"
						init={{
							height: 250,
							menubar: false,
							plugins: [
								'advlist autolink lists link',
								'charmap print preview anchor help',
								'searchreplace visualblocks code',
								'insertdatetime media table paste wordcount'
							],
							toolbar:
								'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help'
						}}
						onChange={handleEditorChange}
					/>
				</FormItem>
			</FormGroup>
		</>
	);
}
