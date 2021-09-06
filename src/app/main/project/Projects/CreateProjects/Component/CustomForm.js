import { validateFieldEN } from '@fuse/core/DtpConfig';
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

export default function CustomForm({
	initial,
	projectSub,
	owner,
	role,
	handleSubmitForm,
	actionLoading,
	handleCancle
}) {
	const validateSchema = Yup.object().shape({
		prjName: Yup.string().required(`${validateFieldEN}`),
		owner: Yup.string().required(`${validateFieldEN}`).nullable()
	});
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
					<div className="mt-8 px-16 sm:px-24">
						<div>
							<Field label="Project Name" hasFeedback name="prjName" component={AntInputCustom} />
						</div>
						<div>
							<Field
								label="Subproject of"
								name="prjParentID"
								component={AntSelectCustom}
								options={projectSub}
							/>
						</div>
						<div>
							<Field label="Description" name="descr" component={AntDescriptionsCustom} row={4} />
						</div>
						<div>
							<Field
								label="Project Owner"
								name="owner"
								component={AntSelectCustom}
								options={owner}
								hasFeedback
							/>
						</div>
						<div>
							<Field
								label="Add Team Member"
								name="userInvite"
								component={AntSelectMultiCustom}
								options={owner}
							/>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
							{role?.userName === 'phucvd' && (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Appraisal time"
										name="appraisalTime"
										placeholder="Please select time"
										component={AntDateCustom}
									/>
									<Field label="Priority" name="priority" type="number" component={AntInputCustom} />
								</div>
							)}
							<Field
								label="Public"
								hasFeedback
								name="isPublic"
								value={initial.isPublic}
								component={AntdCustomCheckbox}
								top="10px"
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
						<Button
							onClick={handleCancle}
							className="button__cancle mr-8"
							variant="contained"
							color="secondary"
						>
							<Typography variant="body2"> Cancle </Typography>
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
