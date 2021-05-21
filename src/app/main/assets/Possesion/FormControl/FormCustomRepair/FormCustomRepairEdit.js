import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import DateCustom from '@fuse/CustomForm/Date';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import InputCurrency from '@fuse/CustomForm/InputCurrency';
import { AntInput } from '@fuse/CustomForm/CreateAntField';
import * as moment from 'moment';
import * as Yup from 'yup';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import { Spin } from 'antd';
import { validateField } from '@fuse/core/DtpConfig';

const initial = {
	date: moment(Date.now()),
	nameService: '',
	note: '',
	price: '',
	file: ''
};
export default function FormCustomRepairEdit({ entitiesEdit, handleSubmitRepairService, actionLoading, handleClose }) {
	const checkValidateForm = Yup.object().shape({
		nameService: Yup.string().required(`${validateField}`),
		price: Yup.string().required(`${validateField}`),
		date: Yup.date().required(`${validateField}`)
	});
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={checkValidateForm}
				initialValues={initial}
				onSubmit={values => {
					handleSubmitRepairService(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin tài sản.</h5>
								</div>
								<div className=" grid grid-cols-1 sm:grid-cols-2 ">
									<div className="flex-row flex ">
										<div className="flex flex-col" style={{ width: '40rem' }}>
											<p className="p-6"> Mã sản phẩm </p>
											<p className="p-6"> Tên sản phẩm </p>
											<p className="p-6"> Nhóm sản phẩm </p>
											<p className="p-6"> Mô tả </p>
										</div>
										<div className="flex flex-col sm:mr-96 mr-auto" style={{ width: '600px' }}>
											<p className="p-6 font-extrabold"> {entitiesEdit.assetCode || ''} </p>
											<p className="p-6 font-extrabold"> {entitiesEdit.assetName || ''} </p>
											<p className="p-6 font-extrabold"> {entitiesEdit.groupName || ''} </p>
											<p className="p-6 font-extrabold"> {entitiesEdit.reasons || ''} </p>
										</div>
									</div>
									<div className="flex-row flex">
										<div className="flex flex-col" style={{ width: '27rem' }}>
											<p className="p-6">Ngày mua </p>
											<p className="p-6"> Nguyên giá </p>
											<p className="p-6"> Tình trạng </p>
										</div>
										<div className="flex flex-col sm:mr-96 mr-auto" style={{ width: '600px' }}>
											<p className="p-6 font-extrabold">
												{' '}
												{moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY') || ''}{' '}
											</p>
											<p className="p-6 font-extrabold">
												{currencyFormat(entitiesEdit.originalPrice) || ''}{' '}
											</p>
											<p className="p-6 font-extrabold"> {entitiesEdit.statusName || ''} </p>
										</div>
									</div>
								</div>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin sửa chữa bảo hành.</h5>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<Field
										label="Tên đơn vị sửa chữa, bảo hành"
										name="nameService"
										type="text"
										hasFeedback
										component={AntInput}
										className="mx-4 mb-16"
										variant="outlined"
									/>
									<Field
										label="Chi phí dự kiến"
										hasFeedback
										name="price"
										component={InputCurrency}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<div className="flex flex-col">
										<Field
											label="Lý do sửa chữa,bảo hành"
											name="note"
											row={4}
											component={InputTextAreaLg}
											className="mx-4 mb-16"
											variant="outlined"
										/>
										<Field
											label="Ngày sửa chữa, bảo hành"
											name="date"
											hasFeedback
											component={DateCustom}
											className="mx-4 mb-16"
											variant="outlined"
										/>
									</div>
									<Field
										label="File Đính kèm"
										autoFocus
										name="file"
										style={{ height: '48px' }}
										component={FileCustomVersion2}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin />
							) : (
								<Button type="submit" className="h-26 font-sans" variant="contained" color="primary">
									Lưu
								</Button>
							)}
							<Button
								onClick={handleClose}
								type="button"
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
