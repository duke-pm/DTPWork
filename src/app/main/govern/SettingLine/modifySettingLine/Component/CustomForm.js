import { validateField, validateFieldEN } from '@fuse/core/DtpConfig';
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
import AntdCustomCheckbox from '@fuse/FormBookingCustom/AntdCustomCheckbox';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntSelectCustom from '@fuse/FormBookingCustom/AntSelectCustom';
import AntSelectMultiCustom from '@fuse/FormBookingCustom/AntSelectMultiCustom';
import { Button, Typography } from '@material-ui/core';
import { Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export default function CustomForm({ actionLoading }) {
	const initial = {
		id: '',
		code: '',
		roleName: '',
		description: ''
	};
	const handleSubmitForm = values => {
		console.log(values);
	};
	return (
		<Formik
			// validationSchema={validateSchema}
			// enableReinitialize
			// initialValues={initialState}
			onSubmit={values => {
				handleSubmitForm(values);
			}}
		>
			{({ handleSubmit, isSubmitting }) => (
				<Form>
					<div className="mt-8 px-16 sm:px-24">
						<div>
							<Field hasFeedback label="Code" name="code" type="text" component={AntInputCustom} />
						</div>
						<div>
							<Field hasFeedback label="Tên mã" name="codeName" component={AntInputCustom} />
						</div>
						<div>
							<Field
								hasFeedback
								label="Mô tả"
								name="description"
								row={3}
								component={AntDescriptionsCustom}
							/>
						</div>
					</div>
					<div className="flex items-center justify-end">
						{actionLoading ? (
							<Spin className="ml-20" />
						) : (
							<Button type="submit" className="button__cancle mr-8" variant="contained" color="primary">
								{' '}
								<Typography variant="body2"> Save </Typography>
							</Button>
						)}
						<Button className="button__cancle mr-8" variant="contained" color="secondary">
							<Typography variant="body2"> Cancle </Typography>
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
