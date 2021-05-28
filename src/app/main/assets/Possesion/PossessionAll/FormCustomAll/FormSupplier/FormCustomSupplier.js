import CheckboxAntd from '@fuse/CustomForm/CheckboxAntd';
import { AntInput } from '@fuse/CustomForm/CreateAntField';
import { Button, DialogActions, DialogContent } from '@material-ui/core';
import { Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { validateField } from '@fuse/core/DtpConfig';

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
		contact: Yup.string().required(`${validateField}`)
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
										label="Tên NCC"
										type="text"
										name="nameSupplier"
										component={AntInput}
										hasFeedback
									/>
								</div>
								<div className="grid grid-cols-1 p-4 gap-8 ">
									<Field
										label="Địa chỉ"
										type="text"
										name="address"
										component={AntInput}
										hasFeedback
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-8 ">
									<Field label="Email" name="email" type="text" component={AntInput} />
									<Field
										label="Người liên hệ"
										type="text"
										name="contact"
										component={AntInput}
										hasFeedback
									/>{' '}
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-8 ">
									<Field label="Điện thoại" name="phone" component={AntInput} type="number" />
									<Field
										label="ĐT người liên hệ"
										name="phoneContact"
										type="number"
										component={AntInput}
									/>{' '}
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-8 ">
									<Field label="Inactive" name="inactive" component={CheckboxAntd} />
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<Button type="submit" className="h-26 font-sans" variant="contained" color="primary">
									Lưu
								</Button>
							)}
							<Button
								type="button"
								onClick={handleCloseFormSupplier}
								className="h-26 font-sans"
								variant="contained"
								color="secondary"
							>
								Hủy
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
