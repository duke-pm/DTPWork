/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FormGroup, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default function FileCustom({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type,
	...props
}) {
	return (
		<FormGroup>
			<label className="mb-10"> {label} </label>
			<label htmlFor="upload-photo">
				<input style={{ display: 'none' }} id="upload-photo" name="upload-photo" type="file" />

				<Fab
					className="text-gray-800 font-sans"
					color="secondary"
					size="small"
					component="span"
					aria-label="add"
					variant="extended"
				>
					<AddIcon /> Chọn file đính kèm
				</Fab>
			</label>
		</FormGroup>
	);
}
