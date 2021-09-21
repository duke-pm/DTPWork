import React from 'react';
import { DialogContent, DialogActions, Button, Grid, Typography } from '@material-ui/core';
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
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntInputCurrency from '@fuse/FormBookingCustom/AntInputCurrency';
import AntFileCustom from '@fuse/FormBookingCustom/AntFileCustom';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';

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
						<Grid item spacing={2} container>
							<Grid item xs={12} md={12} lg={12}>
								<Typography variant="subtitle2" color="primary">
									THÔNG TIN TÀI SẢN.
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Typography className="p-6 text-left truncate" variant="body1">
									Mã tài sản
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Typography className="p-6" variant="subtitle2">
									{entitiesEdit?.assetCode}
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Typography className="p-6 text-left truncate" variant="body1">
									Tên tài sản
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Typography className="p-6" variant="subtitle2">
									{entitiesEdit?.assetName}
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Typography className="p-6 text-left truncate" variant="body1">
									Nhóm tài sản
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Typography className="p-6" variant="subtitle2">
									{entitiesEdit?.groupName}
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Typography className="p-6 text-left truncate" variant="body1">
									Mô tả
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Typography className="p-6" variant="subtitle2">
									{entitiesEdit?.descr}
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Typography className="p-6 text-left truncate" variant="body1">
									Ngày mua
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Typography className="p-6" variant="subtitle2">
									{entitiesEdit?.purchaseDate
										? moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY')
										: ''}
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Typography className="p-6 text-left truncate" variant="body1">
									Nguyên giá
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Typography className="p-6" variant="subtitle2">
									{entitiesEdit && currencyFormat(entitiesEdit.originalPrice)}
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Typography className="p-6 text-left truncate" variant="body1">
									Tình trạng
								</Typography>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Typography className="p-6" variant="subtitle2">
									{entitiesEdit?.statusName}
								</Typography>
							</Grid>
						</Grid>
						<div>
							<div className="flex justify-between flex-row">
								<Typography variant="subtitle2" color="primary">
									THÔNG TIN SỬA CHỮA TÀI SẢN.
								</Typography>
							</div>
							<div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mb-16 gap-8 ">
								<div className="flex flex-col">
									<Field
										label="Ngày kết thúc sửa chữa, bảo hành"
										name="dateEnd"
										hasFeedback
										component={AntDateCustom}
									/>
									<Field
										label="Tên đơn vị sửa chữa, bảo hành"
										hasFeedback
										name="nameService"
										component={AntInputCustom}
									/>
									<Field
										label="Chi phí thực tế"
										name="price"
										hasFeedback
										component={AntInputCurrency}
									/>
								</div>
								<Field
									label="File đính kèm"
									name="file"
									component={AntFileCustom}
									className="mb-16"
									variant="outlined"
								/>
							</div>
						</div>
						<div className="px-16 sm:px-24">
							<div className="flex justify-between flex-row">
								<Typography variant="subtitle2" color="primary">
									THÔNG TIN ĐƯA VÀO SỬ DỤNG LẠI.
								</Typography>
							</div>
							<div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mb-16 gap-8 ">
								<div className="flex flex-col">
									<Field
										label="Lý do đưa vào sử dụng lại"
										name="note"
										row={2}
										component={AntDescriptionsCustom}
									/>
									<Field
										label="Ngày đưa vào sử dụng lại"
										name="date"
										hasFeedback
										component={AntDateCustom}
									/>
								</div>
							</div>
						</div>
						<div className="flex justify-end">
							{actionLoading ? (
								<Spin />
							) : (
								<Button type="submit" className="mr-8" variant="contained" color="primary">
									<Typography variant="button"> Lưu</Typography>
								</Button>
							)}

							<Button onClick={handleClose} type="button" variant="contained" color="secondary">
								<Typography variant="button"> Huỷ</Typography>
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
