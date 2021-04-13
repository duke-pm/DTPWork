/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { Select, Form } from 'antd';
import 'antd/dist/antd.css';
import { FormGroup } from '@material-ui/core';

const FormItem = Form.Item;

Select.propTypes = {
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,

	label: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	option: PropTypes.array
};
Select.defaultProps = {
	label: '',
	placeholder: '',
	disabled: false,
	options: []
};
export default function SelectCustom(props) {
	const { Option } = Select;
	const { field, form, options, label } = props;
	const { name, value } = field;
	const { errors, touched } = form;
	const handleSelect = type => {
		form.setFieldValue(name, type);
	};
	return (
		<FormGroup>
			<label className="mb-10"> {label} </label>
			<Select {...field} {...props} style={{ zIndex: 2000 }} value={value} onChange={handleSelect}>
				{options.map(option => (
					<Option key={option.value} value={option.value}>
						{option.label}
					</Option>
				))}
			</Select>
			{errors[name] && touched[name] ? <div className="text-red">{errors[name]}</div> : null}
		</FormGroup>
	);
}
