/* eslint-disable no-multi-str */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FormGroup } from '@material-ui/core';
import { Editor } from '@tinymce/tinymce-react';

export default function InputTinyCustom(props) {
	const { field, form, label, hasFeedback } = props;
	const { name, value } = field;
	const { setFieldValue } = form;
	const handleEditorChange = content => {
		setFieldValue(name, content);
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
				</div>{' '}
				<Editor
					apiKey="fzue4j9gz454my0rnl8dva7fb7cd34cgjeemn3ih4hlb7qa0"
					init={{
						height: 200,
						menubar: true,
						plugins:
							' advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste imagetools wordcount  ',
						autosave_interval: '30s',
						toolbar:
							'forecolor backcolor | insertfile  | styleselect | bold italic | alignleft aligncenter alignright alignjustify | fontselect fontsizeselect formatselect| bullist numlist outdent indent | link image'
					}}
					onEditorChange={handleEditorChange}
					id="data-body"
					value={value}
				/>
				{/* <ErrorMessage name={name} component={FormFeedback} /> */}
			</FormGroup>
		</>
	);
}
