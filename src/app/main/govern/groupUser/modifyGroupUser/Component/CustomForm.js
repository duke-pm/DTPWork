import { validateField } from '@fuse/core/DtpConfig';
import AntdCustomCheckbox from '@fuse/FormBookingCustom/AntdCustomCheckbox';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import { Button } from '@material-ui/core';
import Text from 'app/components/Text';
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
					<div className="mt-8">
						<Field label="Tên nhóm" name="groupName" hasFeedback component={AntInputCustom} />
						<Field label="Mô tả" name="description" type="text" component={AntDescriptionsCustom} row={4} />
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
								<Text type="button" color="white">
									Save
								</Text>
							</Button>
						)}
						<Button
							onClick={handleCloseFormGroupUser}
							className="button__cancle"
							variant="contained"
							color="secondary"
						>
							<Text type="button">Cancel</Text>
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
