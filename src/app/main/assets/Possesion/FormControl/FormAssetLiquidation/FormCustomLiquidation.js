import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as moment from 'moment';
import { Spin } from 'antd';
import * as Yup from 'yup';
import { validateField } from '@fuse/core/DtpConfig';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
import AntFileCustom from '@fuse/FormBookingCustom/AntFileCustom';
import Text from 'app/components/Text';

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
									<Text type="subTitle" color="primary" borderBottom>
										THÔNG TIN TÀI SẢN
									</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Text>Mã tài sản:</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Text type="subTitle">
										{entitiesEdit?.assetCode ? entitiesEdit?.assetCode : '-'}
									</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Text>Tên tài sản:</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Text type="subTitle">
										{entitiesEdit?.assetName ? entitiesEdit.assetName : '-'}
									</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Text>Nhóm tài sản:</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Text type="subTitle">
										{entitiesEdit?.groupName ? entitiesEdit.groupName : '-'}
									</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Text>Ngày mua:</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Text type="subTitle">
										{entitiesEdit?.purchaseDate
											? moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY')
											: '-'}
									</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Text>Tình trạng:</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Text type="subTitle">
										{entitiesEdit?.statusName ? entitiesEdit.statusName : '-'}
									</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Text>Mô tả:</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Text type="subTitle">{entitiesEdit?.descr ? entitiesEdit.descr : '-'}</Text>
								</Grid>
								<Grid item xs={12} md={12} lg={12}>
									<Text type="subTitle" color="primary" borderBottom>
										THÔNG TIN NHÂN VIÊN SỬ DỤNG
									</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Text>Nhân viên:</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Text type="subTitle">{entitiesEdit?.empName ? entitiesEdit.empName : '-'}</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Text>Chức vụ:</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Text type="subTitle">{entitiesEdit?.jobTitle ? entitiesEdit.jobTitle : '-'}</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Text>Bộ phận:</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Text type="subTitle">
										{entitiesEdit?.deptNameManager ? entitiesEdit.deptNameManager : '-'}
									</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={4}>
									<Text>Khu vực:</Text>
								</Grid>
								<Grid item xs={6} md={6} lg={8}>
									<Text type="subTitle">
										{entitiesEdit?.regionName ? entitiesEdit.regionName : '-'}
									</Text>
								</Grid>
							</Grid>
						</div>
						<div>
							<div className="mt-16">
								<Text type="subTitle" color="primary" borderBottom>
									THÔNG TIN THANH LÝ
								</Text>
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
									<Text type="button" color="white">
										Lưu
									</Text>
								</Button>
							)}
							<Button
								type="button"
								onClick={handleClose}
								className="h-26"
								variant="contained"
								color="secondary"
							>
								<Text type="button">Huỷ</Text>
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
