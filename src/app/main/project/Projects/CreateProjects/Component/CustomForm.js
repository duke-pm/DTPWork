import { validateFieldEN } from '@fuse/core/DtpConfig';
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
import AntdCustomCheckbox from '@fuse/FormBookingCustom/AntdCustomCheckbox';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntSelectCustom from '@fuse/FormBookingCustom/AntSelectCustom';
import AntSelectMultiCustom from '@fuse/FormBookingCustom/AntSelectMultiCustom';
import { Button, Grid } from '@material-ui/core';
import { Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import Text from 'app/components/Text';

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
					<div className="mt-8">
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
						<Grid container spacing={2} className="flex flex-1 flex-row items-end">
							{role?.userName === 'phucvd' && (
								<Grid item xs={12} sm={8} md={8} lg={8}>
									<Grid container spacing={4}>
										<Grid item xs={6} sm={6} md={6} lg={6}>
											<Field
												label="Inspection time"
												name="appraisalTime"
												placeholder="Please select time"
												component={AntDateCustom}
											/>
										</Grid>
										<Grid item xs={6} sm={6} md={6} lg={6}>
											<Field
												label="Priority"
												name="priority"
												type="number"
												component={AntInputCustom}
											/>
										</Grid>
									</Grid>
								</Grid>
							)}
							<Grid item xs={12} sm={4} md={4} lg={4}>
								<Field
									label="Public"
									position="right"
									name="isPublic"
									top="10px"
									value={initial.isPublic}
									component={AntdCustomCheckbox}
								/>
							</Grid>
						</Grid>
					</div>

					<div className="flex items-center justify-end">
						{actionLoading ? (
							<Spin className="ml-20" />
						) : (
							<Button type="submit" className="button__cancle mr-8" variant="contained" color="primary">
								<Text color="white" type="button">
									Save
								</Text>
							</Button>
						)}
						<Button onClick={handleCancle} className="button__cancle" variant="contained" color="secondary">
							<Text color="white" type="button">
								Cancel
							</Text>
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
