/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	root: {
		'& .MuiFormLabel-root': {
			color: '#172b4d',
			fontWeight: 'bold'
		}
	}
}));
export default function InputMaterialUi({
	field, // { name, value, onChange, onBlur }
	form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	valueProps,
	handleChangeState,
	options,
	placeholder,
	width,
	type,
	hasFeedback,
	notFoundContent,
	readOnly,
	position,
	submitCount,
	...props
}) {
	const classes = useStyles();
	const touched = form.touched[field.name];
	const hasError = form.errors[field.name];
	const touchedError = hasError && touched;
	return (
		<>
			<div className={`${position && 'flex flex-row  justify-between'}`}>
				<FormGroup>
					<TextField
						{...props}
						{...field}
						// required={hasFeedback}
						type={type}
						id={field.name}
						name={field.name}
						label={label}
						variant="outlined"
						// className="mb-32"
						className={clsx(classes.root, 'mb-32')}
						error={touchedError}
						helperText={touched && hasError}
					/>
				</FormGroup>
			</div>
		</>
	);
}
