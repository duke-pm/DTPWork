import {
	validateField
	// validateFieldEN
} from '@fuse/core/DtpConfig';
import AntdCustomCheckbox from '@fuse/FormBookingCustom/AntdCustomCheckbox';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import { Button, Typography } from '@material-ui/core';
import { Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export default function CustomForm({
	actionLoading,
	handleCloseFormGroupUser,
	handleSubmitFormGroupUser,
	entitiesEdit
}) {
	const initial = {
		groupID: '0',
		groupName: '',
		description: '',
		inactive: false
	};
	const validateSchema = Yup.object().shape({
		groupName: Yup.string().required(`${validateField}`)
	});
	const initialState = entitiesEdit?.groupID ? entitiesEdit : initial;
	return (
		<Formik
			validationSchema={validateSchema}
			enableReinitialize
			initialValues={initialState}
			onSubmit={values => {
				handleSubmitFormGroupUser(values);
			}}
		>
			{({ handleSubmit, isSubmitting }) => (
				<Form>
					<div className="mt-8 px-16 sm:px-24">
						<div>
							<Field label="Tên nhóm" name="groupName" hasFeedback component={AntInputCustom} />{' '}
						</div>
						<div>
							<Field
								label="Mô tả"
								name="description"
								type="text"
								component={AntDescriptionsCustom}
								row={4}
							/>
						</div>

						<Field
							label="Inactive"
							name="inactive"
							top="10px"
							position="right"
							value={initialState.inactive}
							component={AntdCustomCheckbox}
						/>
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
						<Button
							onClick={handleCloseFormGroupUser}
							className="button__cancle mr-8"
							variant="contained"
							color="secondary"
						>
							<Typography variant="body2"> Cancel </Typography>
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
