import React from 'react';
import { DialogContent, DialogActions, Button, Grid, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import DateCustom from '@fuse/CustomForm/Date';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import * as moment from 'moment';
import { Spin } from 'antd';
import * as Yup from 'yup';
import { validateField } from '@fuse/core/DtpConfig';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
import AntFileCustom from '@fuse/FormBookingCustom/AntFileCustom';

const initial = {
	date: moment(Date.now()),
	note: '',
	file: ''
};
export default function FormCustomLiquidation({ entitiesEdit, saveWithDraw, actionLoading, handleClose }) {
	const checkValidateForm = Yup.object().shape({
		date: Yup.string().required(`${validateField}`)
	});
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={checkValidateForm}
				initialValues={initial}
				onSubmit={values => {
					saveWithDraw(values);
					// saveForm(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<div className="mt-8">
							<Grid spacing={2} container item>
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
									<Typography variant="subtitle2">Ngày mua</Typography>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Typography variant="body1">
										{entitiesEdit?.purchaseDate
											? moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY')
											: ''}{' '}
									</Typography>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Typography variant="subtitle2">Tình trạng</Typography>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Typography variant="body1">{entitiesEdit?.statusName}</Typography>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Typography variant="subtitle2">Mô tả</Typography>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Typography variant="body1">{entitiesEdit?.descr}</Typography>
								</Grid>
								<Grid item xs={12} md={12} lg={12}>
									<Typography variant="subtitle2" color="primary">
										THÔNG TIN NHÂN VIÊN SỬ DỤNG.
									</Typography>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Typography variant="subtitle2">Nhân viên</Typography>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Typography variant="body1">{entitiesEdit?.empName}</Typography>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Typography variant="subtitle2">Chức vụ</Typography>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Typography variant="body1">{entitiesEdit?.jobTitle}</Typography>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Typography variant="subtitle2">Bộ phận</Typography>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Typography variant="body1">{entitiesEdit?.deptNameManager}</Typography>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Typography variant="subtitle2">Khu vực</Typography>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Typography variant="body1">{entitiesEdit?.regionName}</Typography>
								</Grid>
							</Grid>
						</div>
						<div>
							<div className="flex flex-row mb-8 mt-8">
								<Typography variant="subtitle2" color="primary">
									THÔNG TIN THANH LÝ.
								</Typography>
							</div>
							<div className="grid grid-cols-2  gap-8 ">
								<Field
									label="Ngày thanh lý "
									name="date"
									hasFeedback
									format="DD/MM/YYYY"
									component={AntDateCustom}
								/>
							</div>
							<div className="grid  gap-8 ">
								<Field label="Lý do " name="note" row={3} component={AntDescriptionsCustom} />
								<Field label="File đính kèm" name="file" component={AntFileCustom} />
							</div>
						</div>
						<div className="flex justify-end">
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<Button type="submit" className="mr-8" variant="contained" color="primary">
									<Typography variant="button">Lưu</Typography>
								</Button>
							)}
							<Button
								type="button"
								onClick={handleClose}
								className="h-26"
								variant="contained"
								color="secondary"
							>
								<Typography variant="button">Huỷ</Typography>
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
