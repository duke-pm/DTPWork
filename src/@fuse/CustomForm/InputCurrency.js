/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FormGroup, TextField } from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

export default function InputCurrency({
	field: { name, value }, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
	withFeedbackLabel = true,
	customFeedbackLabel,
	type = 'text',
	...props
}) {
	return (
		<>
			<FormGroup>
				<label className="mb-16"> {label}</label>
				<CurrencyTextField
					currencySymbol="VNĐ"
					variant="outlined"
					// minimumValue="0"
					outputFormat="string"
					decimalCharacter="."
					digitGroupSeparator=","
					inputProps={{
						style: {
							height: '2px'
						}
					}}
				/>
			</FormGroup>
		</>
	);
}
