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
									<Typography variant="subtitle2">Thông tin tài sản.</Typography>
								</div>
								<Grid alignItems="flex-start" container item>
									<Grid container item xs={12} sm={6} md={6} lg={6}>
										<Grid item xs={5} md={4} lg={3}>
											<Typography className="p-6 text-left truncate" variant="body1">
												Mã tài sản
											</Typography>
										</Grid>
										<Grid item xs={7} md={8} lg={9}>
											<Typography className="p-6" variant="subtitle2">
												{entitiesEdit?.assetCode}
											</Typography>
										</Grid>
										<Grid item xs={5} md={4} lg={3}>
											<Typography className="p-6 text-left truncate" variant="body1">
												Tên tài sản
											</Typography>
										</Grid>
										<Grid item xs={7} md={8} lg={9}>
											<Typography className="p-6" variant="subtitle2">
												{entitiesEdit?.assetName}
											</Typography>
										</Grid>
										<Grid item xs={5} md={4} lg={3}>
											<Typography className="p-6 text-left truncate" variant="body1">
												Nhóm tài sản
											</Typography>
										</Grid>
										<Grid item xs={7} md={8} lg={9}>
											<Typography className="p-6" variant="subtitle2">
												{entitiesEdit?.groupName}
											</Typography>
										</Grid>
										<Grid item xs={5} md={4} lg={3}>
											<Typography className="p-6 text-left truncate" variant="body1">
												Mô tả
											</Typography>
										</Grid>
										<Grid item xs={7} md={8} lg={9}>
											<Typography className="p-6" variant="subtitle2">
												{entitiesEdit?.descr}
											</Typography>
										</Grid>
									</Grid>
									<Grid container item xs={12} sm={6} md={6} lg={6}>
										<Grid item xs={5} md={4} lg={3}>
											<Typography className="p-6 text-left truncate" variant="body1">
												Ngày mua
											</Typography>
										</Grid>
										<Grid item xs={7} md={8} lg={9}>
											<Typography className="p-6" variant="subtitle2">
												{entitiesEdit?.purchaseDate
													? moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY')
													: ' '}
											</Typography>
										</Grid>
										<Grid item xs={5} md={4} lg={3}>
											<Typography className="p-6 text-left truncate" variant="body1">
												Nguyên giá
											</Typography>
										</Grid>
										<Grid item xs={7} md={8} lg={9}>
											<Typography className="p-6" variant="subtitle2">
												{currencyFormat(entitiesEdit.originalPrice) || ''}
											</Typography>
										</Grid>
										<Grid item xs={5} md={4} lg={3}>
											<Typography className="p-6 text-left truncate" variant="body1">
												Tình trạng
											</Typography>
										</Grid>
										<Grid item xs={7} md={8} lg={9}>
											<Typography className="p-6" variant="subtitle2">
												{entitiesEdit?.statusName}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<Typography variant="subtitle2">Thông tin sửa chữa bảo hành.</Typography>
								</div>
								<div className="grid lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Tên đơn vị sửa chữa, bảo hành"
										name="nameService"
										type="text"
										hasFeedback
										component={AntInput}
										className="mb-16"
										variant="outlined"
									/>
									<Field
										label="Chi phí dự kiến"
										hasFeedback
										name="price"
										component={InputCurrency}
										className="mb-16"
										variant="outlined"
									/>
								</div>
								<div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mb-16 gap-8 ">
									<div className="flex flex-col">
										<Field
											label="Lý do sửa chữa, bảo hành"
											name="note"
											row={4}
											component={InputTextAreaLg}
											className="mb-16"
											variant="outlined"
										/>
										<Field
											label="Ngày sửa chữa, bảo hành"
											name="date"
											hasFeedback
											component={DateCustom}
											className="mb-16"
											variant="outlined"
										/>
									</div>
									<Field
										label="File đính kèm"
										autoFocus
										name="file"
										style={{ height: '4.5rem' }}
										component={FileCustomVersion2}
										className="mb-16"
										variant="outlined"
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin />
							) : (
								<Button type="submit" className="h-26" variant="contained" color="primary">
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
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
