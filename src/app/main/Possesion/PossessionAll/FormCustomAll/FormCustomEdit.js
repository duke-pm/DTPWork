import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DateCustom from '@fuse/CustomForm/Date';
import InputMonthCustom from '@fuse/CustomForm/InputMonthCustom';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import InputCurrency from '@fuse/CustomForm/InputCurrency';
import InputNumberCustom from '@fuse/CustomForm/InputNumberCustom';
import { notification } from 'antd';
import InputCustom from '../../../../../@fuse/CustomForm/Input';
import SelectCustom from '../../../../../@fuse/CustomForm/Select';

const initial = {
	namePossessionall: '',
	amount: '',
	categoryPossessionall: '',
	specification: '',
	provider: '',
	datePay: '',
	dateService: '',
	effect: '',
	price: '',
	time_kh: '',
	location: '',
	note: '',
	prefix: '',
	valueStart: '',
	valueLength: ''
};
export default function FormCustomEdit({ handleClose }) {
	const checkValidateForm = Yup.object().shape({
		namePossessionall: Yup.string().required('Tên tài sản không được để trống'),
		categoryPossessionall: Yup.string().required('Loại tài sản không được để trống'),
		datePay: Yup.string().required('Ngày mua không được để trống'),
		amount: Yup.string().required('Số lượng không được để trống'),
		unitManagement: Yup.string().required('Đơn vị quản lý không được để trống'),
		peopleManagement: Yup.string().required('Người quản lý không được để trống'),
		location: Yup.string().required('Vị trí địa lí không được để trống'),
		prefix: Yup.string().required('Tiền tố không được để trống')
	});
	const saveForm = values => {
		// notification.open({
		// 	message: 'Notification Title',
		// 	description:
		// 		'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
		// 	onClick: () => {
		// 		console.log('Notification Clicked!');
		// 	}
		// });
	};
	const openNotification = () => {
		notification.success({
			message: 'Notification Title',
			description:
				'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
			onClick: () => {
				console.log('Notification Clicked!');
			}
		});
	};
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={checkValidateForm}
				initialValues={initial}
				onSubmit={values => {
					saveForm(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="flex flex-row">
								<h5 className="font-extrabold">Thông tin tài sản</h5>
								<span className="border-b-1 mt-3 ml-6 border-fuchsia w-3/6 sm:w-5/6 h-10" />
							</div>
							<div className="px-16 sm:px-24">
								<div className="grid mb-16  gap-8 ">
									<Field
										label="Tên tài sản (*)"
										autoFocus
										name="namePossessionall"
										type="text"
										component={InputCustom}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<Field
										label="Loại tài sản (*)"
										name="categoryPossessionall"
										component={SelectCustom}
										options={[{ value: 1, label: 'text' }]}
										className="mt-8 mb-16"
									/>
									<Field
										label="Số lượng (*)"
										autoFocus
										name="amount"
										type="number"
										component={InputNumberCustom}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
								<div className="grid mb-16 gap-8 ">
									<Field
										label="Quy cách tài sản/Thông số"
										autoFocus
										name="specification"
										component={InputTextAreaLg}
										row={2}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
								<div className="grid mb-16 gap-8 ">
									<Field
										label="Nhà cung cấp"
										autoFocus
										name="provider"
										type="text"
										component={SelectCustom}
										options={[{ value: 1, label: 'text' }]}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-3 mb-16 gap-8 ">
									<Field
										label="Ngày mua (*) "
										autoFocus
										name="datePay"
										type="text"
										component={DateCustom}
										className="mx-4 mb-16"
										variant="outlined"
									/>
									<Field
										label="Thời gian hiệu lực"
										autoFocus
										name="effect"
										component={DateCustom}
										className="mx-4 mb-16"
										variant="outlined"
									/>
									<Field
										label="Thời gian bảo hành "
										autoFocus
										name="dateService"
										type="number"
										component={InputNumberCustom}
										className="mx-4 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-3 mb-16 gap-8 ">
									<Field
										label="Nguyên giá "
										autoFocus
										name="price"
										type="number"
										component={InputCurrency}
										className="mx-4 mb-16"
										variant="outlined"
									/>
									<Field
										label="Thời gian KH "
										autoFocus
										name="time_kh"
										type="number"
										component={InputMonthCustom}
										className="mx-4 mb-16"
										variant="outlined"
									/>
									<Field
										label="Đơn vị quản lí (*)"
										autoFocus
										name="unitManagement"
										component={SelectCustom}
										options={[
											{ value: 1, label: 'text' },
											{ value: 2, label: 'text2' }
										]}
										className="mx-4 mb-16 flex-1"
										variant="outlined"
									/>
								</div>
							</div>
							{/* <h5 className="font-extrabold">Quy tắc đánh mã tài sản trong lô</h5> */}
							<div className="px-16 sm:px-24">
								<div className="grid grid-cols-1 sm:grid-cols-3 mb-16 gap-8 ">
									{/* <Field
										label="Tiền tố (*)"
										autoFocus
										name="prefix"
										component={Select}
										options={[{ value: 1, label: 'text' }]}
										className="mx-4 mb-16 flex-1"
										variant="outlined"
									/>
									<Field
										label="Giá trị bắt đầu (*) "
										autoFocus
										name="valueStart"
										type="number"
										component={Select}
										options={[{ value: 1, label: 'text' }]}
										className="mx-4 mb-16 w-auto	"
										variant="outlined"
									/>
									<Field
										label="Độ dài phần số"
										autoFocus
										name="number"
										component={Select}
										options={[{ value: 1, label: 'text' }]}
										className="mx-4 mb-16"
										variant="outlined"
									/> */}
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							<Button autoFocus onClick={openNotification} type="submit" color="primary">
								Lưu
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
