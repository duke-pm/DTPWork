import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import { Button } from '@material-ui/core';
import Text from 'app/components/Text';
import { Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { validateField } from '@fuse/core/DtpConfig';
import AntdCustomCheckbox from '@fuse/FormBookingCustom/AntdCustomCheckbox';

export default function CustomForm({ actionLoading, entitiesEdit, handleSubmitLine, ExitPage }) {
	let initial = {
		id: '',
		roleCode: '',
		roleName: '',
		description: '',
		inactive: false
	};
	if (entitiesEdit) {
		initial = {
			id: entitiesEdit?.roleID,
			roleCode: entitiesEdit?.roleCode,
			roleName: entitiesEdit?.roleName,
			inactive: entitiesEdit?.inactive
		};
	}
	const validateSchema = Yup.object().shape({
		roleCode: Yup.string().required(`${validateField}`),
		roleName: Yup.string().required(`${validateField}`)
	});
	const handleSubmitForm = values => {
		handleSubmitLine(values);
	};
	return (
		<Formik
			validationSchema={validateSchema}
			enableReinitialize
			initialValues={initial}
			onSubmit={values => {
				handleSubmitForm(values);
			}}
		>
			{({ handleSubmit, isSubmitting }) => (
				<Form>
					<div className="mt-8">
						<div>
							<Field
								hasFeedback
								label="Code"
								name="roleCode"
								type="text"
								component={AntInputCustom}
							/>
						</div>
						<div>
							<Field hasFeedback label="Mô tả" name="roleName" component={AntInputCustom} />
						</div>
						<div>
							<Field
								name="inactive"
								value={initial.inactive}
								component={AntdCustomCheckbox}
								label="Inactive"
								position
							/>
							{/* <Field
								hasFeedback
								label="Mô tả"
								name="description"
								row={3}
								component={AntDescriptionsCustom}
							/> */}
						</div>
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
						<Button onClick={ExitPage} className="button__cancle" variant="contained" color="secondary">
							<Text type="button">Cancel</Text>
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
