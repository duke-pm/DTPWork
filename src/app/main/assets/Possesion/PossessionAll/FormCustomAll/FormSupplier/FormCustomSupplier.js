import { Button, DialogActions, DialogContent } from '@material-ui/core';
import { Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import Text from 'app/components/Text';
import { validateField } from '@fuse/core/DtpConfig';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';

const inititalState = {
	supplierID: 1,
	nameSupplier: '',
	address: '',
	phone: '',
	email: '',
	contact: '',
	phoneContact: '',
	inactive: false
};
export default function FormCustomSupplier({ actionLoading, handleSaveFormSupplier, handleCloseFormSupplier }) {
	const validateForm = Yup.object().shape({
		nameSupplier: Yup.string().required(`${validateField}`),
		address: Yup.string().required(`${validateField}`),
		contact: Yup.string().required(`${validateField}`),
		email: Yup.string().email('Vui lòng nhập đúng định dạng')
	});
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={validateForm}
				initialValues={inititalState}
				onSubmit={values => {
					handleSaveFormSupplier(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<div className="grid grid-cols-1  p-4 gap-8 ">
									<Field
										label="Tên nhà cung cấp"
										name="nameSupplier"
										component={AntInputCustom}
										hasFeedback
									/>
								</div>
								<div className="grid grid-cols-1 p-4 gap-8 ">
									<Field label="Địa chỉ" name="address" component={AntInputCustom} hasFeedback />
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-8 ">
									<Field label="Email" name="email" type="email" component={AntInputCustom} />
									<Field label="Điện thoại" name="phone" component={AntInputCustom} type="number" />
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-8 ">
									<Field
										label="Người liên hệ"
										type="text"
										name="contact"
										component={AntInputCustom}
									/>
									<Field
										label="ĐT người liên hệ"
										name="phoneContact"
										type="number"
										component={AntInputCustom}
									/>
								</div>
								{/* <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-8 ">
									<Field label="Inactive" name="inactive" component={CheckboxAntd} />
								</div> */}
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<Button type="submit" className="h-26" variant="contained" color="primary">
									<Text type="button" color="white">
										Lưu
									</Text>
								</Button>
							)}
							<Button
								type="button"
								onClick={handleCloseFormSupplier}
								className="h-26"
								variant="contained"
								color="secondary"
							>
								<Text type="button">Hủy</Text>
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
