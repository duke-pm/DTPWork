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

const initial = {
	date: moment(),
	note: '',
	file: ''
};

export default function FormCustomUsedEdit({ entitiesEdit, saveWithDraw, actionLoading, handleClose }) {
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
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<Grid alignItems="flex-start" container item spacing={2}>
									<Grid container item xs={12} sm={6} md={6} lg={6}>
										<div className="flex flex-row">
											<Typography variant="subtitle2">Thông tin tài sản.</Typography>
										</div>
										<Grid container item>
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
													Ngày mua
												</Typography>
											</Grid>
											<Grid item xs={7} md={8} lg={9}>
												<Typography className="p-6" variant="subtitle2">
													{entitiesEdit &&
														moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY')}{' '}
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
									</Grid>
									<Grid container item xs={12} sm={6} md={6} lg={6}>
										<div className="flex flex-row">
											<Typography variant="subtitle2">Thông tin nhân viên sử dụng.</Typography>
										</div>
										<Grid container item>
											<Grid item xs={5} md={4} lg={3}>
												<Typography className="p-6 text-left truncate" variant="body1">
													Nhân viên
												</Typography>
											</Grid>
											<Grid item xs={7} md={8} lg={9}>
												<Typography className="p-6" variant="subtitle2">
													{entitiesEdit?.empName}
												</Typography>
											</Grid>
											<Grid item xs={5} md={4} lg={3}>
												<Typography className="p-6 text-left truncate" variant="body1">
													Chức vụ
												</Typography>
											</Grid>
											<Grid item xs={7} md={8} lg={9}>
												<Typography className="p-6" variant="subtitle2">
													{entitiesEdit?.jobTitle}
												</Typography>
											</Grid>
											<Grid item xs={5} md={4} lg={3}>
												<Typography className="p-6 text-left truncate" variant="body1">
													Bộ phận
												</Typography>
											</Grid>
											<Grid item xs={7} md={8} lg={9}>
												<Typography className="p-6" variant="subtitle2">
													{entitiesEdit?.deptNameManager}
												</Typography>
											</Grid>
											<Grid item xs={5} md={4} lg={3}>
												<Typography className="p-6 text-left truncate" variant="body1">
													Khu vực
												</Typography>
											</Grid>
											<Grid item xs={7} md={8} lg={9}>
												<Typography className="p-6" variant="subtitle2">
													{entitiesEdit?.regionName}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex flex-row">
									<Typography variant="subtitle2">Thông tin thu hồi.</Typography>
								</div>
								<div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mb-16 gap-8 ">
									<div className="flex flex-col">
										<Field
											label="Lý do thu hồi"
											autoFocus
											name="note"
											row={4}
											component={InputTextAreaLg}
											className="mb-16"
											variant="outlined"
										/>
										<Field
											label="Ngày thu hồi "
											name="date"
											hasFeedback
											component={DateCustom}
											className="mb-16"
										/>
									</div>
									<Field
										label="File đính kèm"
										style={{ height: '4.5rem' }}
										name="file"
										component={FileCustomVersion2}
										className="mb-16"
										variant="outlined"
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<Button type="submit" className="h-26" variant="contained" color="primary">
									Lưu
								</Button>
							)}
							<Button
								type="button"
								onClick={handleClose}
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
