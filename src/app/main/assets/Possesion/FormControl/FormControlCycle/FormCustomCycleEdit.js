import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import DateCustom from '@fuse/CustomForm/Date';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import InputCurrency from '@fuse/CustomForm/InputCurrency';
import { AntInput } from '@fuse/CustomForm/CreateAntField';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import * as Yup from 'yup';
import * as moment from 'moment';
import { Spin } from 'antd';
import { validateField } from '@fuse/core/DtpConfig';

const initial = {
	date: moment(Date.now()),
	nameService: '',
	note: '',
	price: '',
	file: '',
	dateEnd: moment(Date.now())
};
export default function FormCustomCycleEdit({ handleClose, entitiesEdit, handleSubmitCycle, actionLoading }) {
	const validationSchema = Yup.object().shape({
		dateEnd: Yup.string().required(`${validateField}`),
		date: Yup.string().required(`${validateField}`),
		nameService: Yup.string().required(`${validateField}`),
		price: Yup.string().required(`${validateField}`)
	});
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={validationSchema}
				initialValues={initial}
				onSubmit={values => {
					handleSubmitCycle(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin tài sản.</h5>
								</div>
								<div className=" grid grid-cols-1 sm:grid-cols-2 gap-48">
									<div className="flex-row flex ">
										<div className="flex flex-col" style={{ width: '27rem' }}>
											<p className="p-6"> Mã tài sản </p>
											<p className="p-6"> Tên tài sản </p>
											<p className="p-6"> Nhóm tài sản </p>
											<p className="p-6"> Mô tả </p>
										</div>
										<div className="flex flex-col sm:mr-98 mr-auto" style={{ width: '600px' }}>
											<p className="p-6 font-extrabold"> {entitiesEdit.assetCode || ''} </p>
											<p className="p-6 font-extrabold"> {entitiesEdit.assetName || ''} </p>
											<p className="p-6 font-extrabold"> {entitiesEdit.groupName || ''} </p>
											<p className="p-6 font-extrabold"> {entitiesEdit.reasons || ''} </p>
										</div>
									</div>
									<div className="flex-row justify-between  flex ">
										<div className="flex flex-col" style={{ width: '27rem' }}>
											<p className="p-6">Ngày mua </p>
											<p className="p-6"> Nguyên giá </p>
											<p className="p-6"> Tình trạng </p>
										</div>
										<div className="flex flex-col sm:mr-98 mr-auto" style={{ width: '600px' }}>
											<p className="p-6 font-extrabold">
												{' '}
												{moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY') || ''}{' '}
											</p>
											<p className="p-6 font-extrabold">
												{' '}
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
									<div className="flex flex-col">
										<Field
											label="Ngày kết thúc sửa chữa, bảo hành"
											name="dateEnd"
											hasFeedback
											component={DateCustom}
											className="mx-4 mb-16"
											variant="outlined"
										/>
										<Field
											label="Tên đơn vị sửa chữa, bảo hành"
											hasFeedback
											type="text"
											name="nameService"
											component={AntInput}
											className="mx-4 mb-16"
										/>
										<Field
											label="Chi phí thực tế"
											name="price"
											hasFeedback
											component={InputCurrency}
											className="mx-4 mb-16"
											variant="outlined"
										/>
									</div>
									<Field
										label="File Đính kèm"
										style={{ height: '58px' }}
										name="file"
										component={FileCustomVersion2}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin đưa vào sử dụng lại.</h5>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<div className="flex flex-col">
										<Field
											label="Lý do đưa vào sử dụng lại"
											name="note"
											row={2}
											component={InputTextAreaLg}
											className="mx-4 mb-16"
											variant="outlined"
										/>
										<Field
											label="Ngày đưa vào sử dụng lại"
											name="date"
											hasFeedback
											component={DateCustom}
											className="mx-4 mb-16"
											variant="outlined"
										/>
									</div>
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
