// import { AntInput } from '@fuse/CustomForm/CreateAntField';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
// import AntRadioColorCustom from '@fuse/FormBookingCustom/AntRadioColorCustom';
// import AntRadioCustom from '@fuse/FormBookingCustom/AntRadioCustom';
// import AntRadioVerticalCustom from '@fuse/FormBookingCustom/AntRadioVerticalCustom';
// import AntSelectCustom from '@fuse/FormBookingCustom/AntSelectCustom';
import AntSelectIconCustom from '@fuse/FormBookingCustom/AntSelectIconCustom';
// import AntSelectMultiCustom from '@fuse/FormBookingCustom/AntSelectMultiCustom';
import { Button, Typography } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import React from 'react';

export default function CustomForm({ initital }) {
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
							{/* <div>
								<Typography color="primary" variant="body1" className="label--form">
									Resource photo
								</Typography>
							</div> */}
							<div className="grid grid-cols-3">
								<Field
									options={[
										{ value: 'ad_units', label: 'ad_units', icon: 'ad_units' },
										{ value: 'drive_eta', label: 'drive_eta', icon: 'drive_eta' },
										{ value: 'credit_card', label: 'credit_card', icon: 'credit_card' },
										{ value: 'favorite', label: 'favorite', icon: 'favorite' },
										{ value: 'border_all', label: 'border_all', icon: 'border_all' },
										{ value: 'tv', label: 'tv', icon: 'tv' },
										{ value: 'star', label: 'star', icon: 'star' }
									]}
									label="Group icon"
									hasFeedback
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
								<Button className="button__cancle mr-8" variant="contained" color="secondary">
									{' '}
									<Typography variant="body2"> Cancel </Typography>
								</Button>
								<Button className="button__form" variant="contained" color="primary">
									{' '}
									<Typography variant="body2"> Create resource </Typography>
								</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
