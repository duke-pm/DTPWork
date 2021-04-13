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
import { AntDatePicker, AntInput, AntSelect } from '@fuse/CustomForm/CreateAntField';
import SelectCustom from '../../../../../@fuse/CustomForm/Select';

const initial = {
	namePossessionall: '',
	amount: null,
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
	unitManagement: ''
	// prefix: '',
	// valueStart: '',
	// valueLength: ''
};
export default function FormCustomEdit({ handleClose }) {
	const checkValidateForm = Yup.object().shape({
		namePossessionall: Yup.string().required('Tên tài sản không được để trống'),
		categoryPossessionall: Yup.string().required('Loại tài sản không được để trống'),
		datePay: Yup.date().required('Ngày mua không được để trống').nullable(),
		amount: Yup.number()
			.typeError('Số lượng phải là dạng số và không được để trống. ')
			.required('Số lượng không được để trống'),
		unitManagement: Yup.string().required('Đơn vị quản lý không được để trống')
	});
	const saveForm = values => {
		console.log(values);
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
								<div className="grid gap-8 ">
									<Field
										label="Tên tài sản (*)"
										autoFocus
										name="namePossessionall"
										type="text"
										component={AntInput}
										className="mx-4"
										variant="outlined"
										hasFeedback
										placeholder="Vui lòng điền tên tài sản"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Loại tài sản (*)"
										name="categoryPossessionall"
										component={AntSelect}
										options={[{ value: 1, label: 'text' }]}
										className="mt-8 mb-16"
										hasFeedback
										placeholder="Vui lòng chọn loại tài sản"
									/>
									<Field
										label="Số lượng (*)"
										autoFocus
										name="amount"
										placeholder="Vui lòng điền số lượng"
										type="number"
										hasFeedback
										component={AntInput}
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
										placeholder="Vui lòng điền nội dung"
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
										// value={initial.datePay}
										placeholder="Vui lòng chọn ngày mua"
										format="DD/MM/YYYY"
										component={AntDatePicker}
										className="mx-4 mb-16"
										hasFeedback
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
										placeholder="Vui lòng chọn thời gian bảo hành"
										name="dateService"
										type="number"
										component={AntInput}
										className="mx-4 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-3 mb-16 gap-8 ">
									<Field
										label="Nguyên giá "
										autoFocus
										name="price"
										type="number"
										placeholder="Vui lòng điền nguyên giá"
										component={InputCurrency}
										className="mx-4 mb-16"
										variant="outlined"
									/>
									<Field
										label="Thời gian KH "
										autoFocus
										name="time_kh"
										component={AntInput}
										type="number"
										placeholder="Vui lòng chọn thời gian KH"
										className="mx-4 mb-16"
										variant="outlined"
									/>
									<Field
										label="Đơn vị quản lí (*)"
										name="unitManagement"
										component={AntSelect}
										options={[{ value: 1, label: 'text' }]}
										className="mt-8 mb-16"
										hasFeedback
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
							<Button
								variant="contained"
								autoFocus
								onClick={openNotification}
								type="submit"
								color="primary"
							>
								Lưu
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
