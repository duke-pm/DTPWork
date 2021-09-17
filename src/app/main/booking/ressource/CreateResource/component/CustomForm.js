// import { AntInput } from '@fuse/CustomForm/CreateAntField';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntRadioColorCustom from '@fuse/FormBookingCustom/AntRadioColorCustom';
// import AntRadioCustom from '@fuse/FormBookingCustom/AntRadioCustom';
// import AntRadioVerticalCustom from '@fuse/FormBookingCustom/AntRadioVerticalCustom';
import AntSelectCustom from '@fuse/FormBookingCustom/AntSelectCustom';
// import AntSelectMultiCustom from '@fuse/FormBookingCustom/AntSelectMultiCustom';
import { Button, Typography } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import React from 'react';

export default function CustomForm({ initital }) {
	const colors = [
		{ value: '#ffe0b2', color: '#ffe0b2' },
		{ value: '#ffcdd2', color: '#ffcdd2' },
		{ value: '#f8bbd0', color: '#f8bbd0' },
		{ value: '#fff0b6', color: '#fff0b6' },
		{ value: '#c8e6c9', color: '#c8e6c9' },
		{ value: '#b2dfdb', color: '#b2dfdb' },
		{ value: '#b2ebf2', color: '#b2ebf2' },
		{ value: '#bbdffb', color: '#bbdffb' },
		{ value: '#c5cae9', color: '#c5cae9' },
		{ value: '#c1d4e9', color: '#c1d4e9' }
	];
	return (
		<>
			<Formik enableReinitialize initialValues={initital}>
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
							<div>
								<Field
									options={[]}
									label="Resource group"
									name="resourceGroup"
									hasFeedback
									component={AntSelectCustom}
								/>
							</div>
							<div>
								<Field
									label="Color"
									name="color"
									options={colors}
									hasFeedback
									component={AntRadioColorCustom}
								/>
							</div>
							{/* <div>
								<Typography color="primary" variant="body1" className="label--form">
									Resource photo
								</Typography>
							</div> */}
							{/* <div>
								<Field
									options={[
										{ value: true, label: 'Yes' },
										{ value: false, label: 'No' }
									]}
									label="Allow recurring bookings"
									name="allowRecurre"
									component={AntRadioCustom}
								/>
							</div> */}
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
								<Button className="button__cancle mr-8" variant="contained" color="secondary">
									{' '}
									<Typography variant="button"> Cancel </Typography>
								</Button>
								<Button className="button__form" variant="contained" color="primary">
									{' '}
									<Typography variant="button"> Create resource </Typography>
								</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
