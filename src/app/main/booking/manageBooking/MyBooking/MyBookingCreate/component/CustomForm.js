// import { AntInput } from '@fuse/CustomForm/CreateAntField';
import AntCascadeCustom from '@fuse/FormBookingCustom/AntCascadeCustom';
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
// import AntDatepickerCustom from '@fuse/FormBookingCustom/AntDatepickerCustom';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntRadioCustom from '@fuse/FormBookingCustom/AntRadioCustom';
import AntSelectMultiCustom from '@fuse/FormBookingCustom/AntSelectMultiCustom';
import AntTimeCustom from '@fuse/FormBookingCustom/AntTimeCustom';
import { Button, Icon, Typography } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import React from 'react';

const options = [{ label: 'Phong hop HCM', value: 1, children: [{ label: 'Phòng họp', value: 2 }] }];
export default function CustomForm({ initital }) {
	console.log(initital);
	return (
		<>
			<Formik enableReinitialize initialValues={initital}>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<div className=" mt-8 px-16 sm:px-24">
							<div className="mb-20">
								<Typography variant="subtitle2" className="title__view" color="primary">
									{' '}
									GENERAL INFORMATION{' '}
								</Typography>
							</div>
							<div>
								<Field
									label="Resource"
									name="resource"
									placeholder="Enter resource name"
									hasFeedback
									options={options}
									component={AntCascadeCustom}
								/>
							</div>
							<div>
								<Field
									label="Purpose"
									name="purpose"
									hasFeedback
									type="text"
									component={AntInputCustom}
								/>
							</div>
							<div>
								<Field
									label="Description"
									name="description"
									hasFeedback
									row={4}
									component={AntDescriptionsCustom}
								/>
							</div>
							<div>
								<Field
									label="Participants"
									name="participants"
									hasFeedback
									options={[{ value: 1, label: 'TheLinh' }]}
									component={AntSelectMultiCustom}
								/>
							</div>
							<div>
								<Field
									name="checkBooking"
									options={[{ value: true, label: 'One-time booking' }]}
									component={AntRadioCustom}
								/>
							</div>
							<div className="control-booking-time">
								<div className={`flex flex-row `}>
									<Typography color="primary" variant="body1" className="label--form">
										Booking time
									</Typography>
									<p style={{ marginBottom: '-20px' }} className="text-red">
										*
									</p>
								</div>
								<div className="flex justify-between">
									<div className="flex justify-between items-center">
										<Field name="booking.startDate" component={AntDateCustom} hasFeedback />
										<Field
											marginleft="10px"
											name="booking.timeStart"
											component={AntTimeCustom}
											hasFeedback
										/>
									</div>
									<div className="mt-8">
										{' '}
										<Icon color="primary" fontSize="small">
											{' '}
											multiple_stop{' '}
										</Icon>{' '}
									</div>
									<div className="flex">
										<Field name="booking.endDate" component={AntDateCustom} hasFeedback />
										<Field
											marginleft="10px"
											name="booking.timeEnd"
											component={AntTimeCustom}
											hasFeedback
										/>
									</div>
								</div>
							</div>
							<div className="flex justify-end">
								<Button className="button__cancle mr-8" variant="contained" color="secondary">
									{' '}
									<Typography variant="body2"> Cancle </Typography>
								</Button>
								<Button className="button__form" variant="contained" color="primary">
									{' '}
									<Typography variant="body2"> Create booking </Typography>
								</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
