import React from 'react';
import { DialogContent, DialogActions, Button, Grid, Typography } from '@material-ui/core';
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
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntInputCurrency from '@fuse/FormBookingCustom/AntInputCurrency';
import AntFileCustom from '@fuse/FormBookingCustom/AntFileCustom';
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';

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
						<Grid container item spacing={2}>
							<Grid item xs={12} md={12} lg={12}>
								<Typography variant="subtitle2" color="primary">
									THÔNG TIN TÀI SẢN.
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Typography variant="subtitle2">Mã tài sản</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Typography variant="body1">{entitiesEdit?.assetCode}</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Typography variant="subtitle2">Tên tài sản</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Typography variant="body1">{entitiesEdit?.assetName}</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Typography variant="subtitle2">Nhóm tài sản</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Typography variant="body1">{entitiesEdit?.groupName}</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Typography variant="subtitle2">Mô tả</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Typography variant="body1">{entitiesEdit?.descr}</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Typography variant="subtitle2">Ngày mua</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Typography variant="body1">
									{entitiesEdit?.purchaseDate
										? moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY')
										: ' '}
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Typography variant="subtitle2">Nguyên giá</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Typography variant="body1">
									{currencyFormat(entitiesEdit?.originalPrice) || ''}
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Typography variant="subtitle2">Tình trạng</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Typography variant="body1">{entitiesEdit?.statusName}</Typography>
							</Grid>
						</Grid>
						<div>
							<div className="flex justify-between flex-row mt-8 mb-8">
								<Typography variant="subtitle2" color="primary">
									THÔNG TIN SỬA CHỮA BẢO HÀNH.
								</Typography>
							</div>
							<div className="grid lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1 sm:grid-cols-2 gap-8 ">
								<Field
									label="Tên đơn vị sửa chữa, bảo hành"
									name="nameService"
									hasFeedback
									component={AntInputCustom}
								/>
								<Field label="Chi phí dự kiến" hasFeedback name="price" component={AntInputCurrency} />
							</div>
							<div className="grid grid-cols-2 gap-8">
								<Field
									label="Ngày sửa chữa, bảo hành"
									name="date"
									hasFeedback
									component={AntDateCustom}
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Lý do sửa chữa, bảo hành"
									name="note"
									row={3}
									component={AntDescriptionsCustom}
									className="mb-16"
									variant="outlined"
								/>
								<Field label="File đính kèm" name="file" component={AntFileCustom} />
							</div>
						</div>
						<div className="flex justify-end">
							{actionLoading ? (
								<Spin />
							) : (
								<Button type="submit" className="mr-8" variant="contained" color="primary">
									Lưu
								</Button>
							)}
							<Button
								onClick={handleClose}
								type="button"
								className="h-26"
								variant="contained"
								color="secondary"
							>
								Hủy
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
