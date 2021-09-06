/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { Form, Checkbox } from 'antd';

const FormItem = Form.Item;

const useStyles = makeStyles(theme => ({
	spanLabel: {
		width: '11rem',
		marginLeft: '16px'
	},
	hasFeedback: {
		marginBottom: '20px'
	}
}));

export default function AntdCustomCheckbox({
	field, // { name, value, onChange, onBlur }
	form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	value,
	valueProps,
	handleChangeState,
	readOnly,
	options,
	position,
	labelAligh,
	hasFeedback,
	top,
	notFoundContent,
	submitCount,
	...props
}) {
	const classes = useStyles();
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;
	const onChange = e => {
		form.setFieldValue(field.name, e.target.checked);
		return handleChangeState ? handleChangeState(e) : null;
	};
	return (
		<>
			<div className={`form-item-input ${position && 'flex flex-row justify-between '}`}>
				<div className={`flex flex-row ${position && 'mt-8'}`}>
					<Typography color="primary" variant="body1" className="label--form">
						{' '}
						{label}{' '}
					</Typography>{' '}
					{hasFeedback && (
						<p style={{ marginBottom: '-20px' }} className="text-red">
							*
						</p>
					)}
				</div>{' '}
				<FormItem
					style={{ width: '100%', marginTop: top || '0px' }}
					rules={[{ required: true }]}
					hasFeedback={!!((hasFeedback && submitted) || (hasFeedback && touched))}
					help={submittedError || touchedError ? hasError : false}
					validateStatus={submittedError || touchedError ? 'error' : hasFeedback && 'success'}
				>
					<Checkbox className={readOnly ? 'readOnly' : ''} defaultChecked={value} onChange={onChange} />
				</FormItem>
			</div>
		</>
	);
}
