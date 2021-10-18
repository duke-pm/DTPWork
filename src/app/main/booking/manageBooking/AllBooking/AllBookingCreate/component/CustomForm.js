// import { AntInput } from '@fuse/CustomForm/CreateAntField';
import { validateFieldEN } from '@fuse/core/DtpConfig';
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
// import AntDatepickerCustom from '@fuse/FormBookingCustom/AntDatepickerCustom';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntdCustomCheckbox from '@fuse/FormBookingCustom/AntdCustomCheckbox';
import AntSelectCustom from '@fuse/FormBookingCustom/AntSelectCustom';
import AntSelectMultiCustom from '@fuse/FormBookingCustom/AntSelectMultiCustom';
import AntTimeCustom from '@fuse/FormBookingCustom/AntTimeCustom';
import { Button, Icon } from '@material-ui/core';
import { Spin } from 'antd';
import Text from 'app/components/Text';
import { Form, Formik, Field } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export default function CustomForm({ initital, bkResource, Users, handleSubmitForm, actionLoading, ExitPage }) {
	const validationSchema = Yup.object().shape({
		resource: Yup.string().required(`${validateFieldEN}`).nullable(),
		purpose: Yup.string().required(`${validateFieldEN}`),
		startDate: Yup.string().required(`${validateFieldEN}`).nullable(),
		endDate: Yup.string().required(`${validateFieldEN}`).nullable(),
		timeStart: Yup.string().required(`${validateFieldEN}`).nullable(),
		timeEnd: Yup.string().required(`${validateFieldEN}`).nullable()
	});
	return (
		<>
			<Formik
				validationSchema={validationSchema}
				enableReinitialize
				initialValues={initital}
				onSubmit={values => {
					handleSubmitForm(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<div className=" mt-8 px-16 sm:px-24">
							<div className="mb-20">
								<Text type="subTitle" color="primary" borderBottom>
									{' '}
									THÔNG TIN BOOKING{' '}
								</Text>
							</div>
							<div>
								<Field
									label="Tài nguyên sử dụng"
									name="resource"
									placeholder="Chọn tài nguyên sử dụng"
									hasFeedback
									options={bkResource}
									component={AntSelectCustom}
								/>
							</div>
							<div>
								<Field label="Mục đích" name="purpose" hasFeedback component={AntInputCustom} />
							</div>
							<div>
								<Field
									label="Ghi chú"
									name="description"
									row={4}
									component={AntDescriptionsCustom}
								/>
							</div>
							<div>
								<Field
									label="Người tham gia"
									name="participants"
									options={Users}
									component={AntSelectMultiCustom}
								/>
							</div>
							<div>
								<Field
									name="checkBooking"
									label="One-time booking"
									position
									value={initital.checkBooking}
									component={AntdCustomCheckbox}
								/>
							</div>
							<div className="control-booking-time">
								<div className={`flex flex-row `}>
									<Text type="body" className="label--form">
										Thời gian sử dụng
									</Text>
									<p style={{ marginBottom: '-20px' }} className="text-red">
										*
									</p>
								</div>
								<div className="flex justify-between">
									<div className="flex justify-between items-center">
										<Field disabledDate name="startDate" component={AntDateCustom} hasFeedback />
										<Field
											marginleft="10px"
											name="timeStart"
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
										<Field disabledDate name="endDate" component={AntDateCustom} hasFeedback />
										<Field marginleft="10px" name="timeEnd" component={AntTimeCustom} hasFeedback />
									</div>
								</div>
							</div>
							<div className="flex items-center justify-end">
								{actionLoading ? (
									<Spin style={{ marginRight: '20px' }} />
								) : (
									<Button
										type="submit"
										className="button__cancle mr-8"
										variant="contained"
										color="primary"
									>
										<Text type="button" color="white">
											Save
										</Text>
									</Button>
								)}
								<Button
									onClick={ExitPage}
									className="button__cancle"
									variant="contained"
									color="secondary"
								>
									<Text type="button">Cancel</Text>
								</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
