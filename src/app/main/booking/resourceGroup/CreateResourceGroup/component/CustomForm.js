import { validateFieldEN } from '@fuse/core/DtpConfig';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntSelectIconCustom from '@fuse/FormBookingCustom/AntSelectIconCustom';
import { Button, Icon, Typography } from '@material-ui/core';
import { Spin } from 'antd';
import { Form, Formik, Field } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

export default function CustomForm({ initital, bkIcon, handleSubmitForm, actionLoading, ExitPage }) {
	const validationSchema = Yup.object().shape({
		name: Yup.string().required(`${validateFieldEN}`),
		icon: Yup.string().required(`${validateFieldEN}`)
	});
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={validationSchema}
				initialValues={initital}
				onSubmit={values => {
					handleSubmitForm(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<div className=" mt-8 px-16 sm:px-24">
							<div>
								<Field
									label="Name"
									name="name"
									type="text"
									placeholder="Enter resource name"
									hasFeedback
									component={AntInputCustom}
								/>
							</div>
							<div>
								<Field
									label="Description"
									name="description"
									type="text"
									placeholder="Enter a short description"
									component={AntInputCustom}
								/>
							</div>
							{/* <div>
								<Typography color="primary" variant="body1" className="label--form">
									Resource photo
								</Typography>
							</div> */}
							<div className="grid grid-cols-3">
								<Field
									options={bkIcon}
									label="Group icon"
									hasFeedback
									handleChan
									name="icon"
									component={AntSelectIconCustom}
								/>
							</div>
							{/* <div>
								<Field
									options={[
										{ value: true, label: 'Yes' },
										{ value: false, label: 'No' }
									]}
									label="Allow adding other participants to the booking"
									name="allowAdding"
									component={AntRadioCustom}
								/>
							</div> */}
							{/* <div>
								<Field
									options={[
										{
											value: true,
											label: 'Allow overlapping booking',
											description:
												'Allow booking in the time frame in which another event has been previously booked and is still waiting for approval'
										},
										{
											value: false,
											label: 'Disallow overlapping booking',
											description:
												'Disallow booking in the time frame in which another event has been previously booked and is waiting for approval'
										}
									]}
									label="Overlapping booking"
									name="overlapping"
									component={AntRadioVerticalCustom}
								/>
							</div> */}
							{/* <div>
								<Field
									options={[
										{
											value: 1,
											label: 'Booking created -> complete'
										}
									]}
									label="Approval process"
									name="approval"
									component={AntSelectCustom}
								/>
							</div> */}
							{/* <div>
								<Field
									options={[
										{
											value: 1,
											label: 'DTP'
										}
									]}
									label="Department"
									name="department"
									hasFeedback
									component={AntSelectMultiCustom}
								/>
							</div> */}
							{/* <div>
								<Field
									options={[
										{
											value: 1,
											label: 'Kịch bản thông báo mặc định'
										}
									]}
									label="Notification scenario"
									name="department"
									hasFeedback
									component={AntSelectCustom}
								/>
							</div> */}
							<div className="flex justify-end">
								{actionLoading ? (
									<Spin style={{ marginRight: '20px' }} />
								) : (
									<Button
										type="submit"
										className="button__cancle mr-8"
										variant="contained"
										color="primary"
									>
										{' '}
										<Typography variant="button"> Save </Typography>
									</Button>
								)}
								<Button
									type="button"
									onClick={ExitPage}
									className="button__cancle"
									variant="contained"
									color="secondary"
								>
									{' '}
									<Typography variant="button"> Cancel </Typography>
								</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
