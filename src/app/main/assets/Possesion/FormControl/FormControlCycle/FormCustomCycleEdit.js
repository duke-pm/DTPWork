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
import { Spin, Tooltip } from 'antd';
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
								<Grid alignItems="flex-start" container item>
									<Grid container item xs={12} sm={6} md={6} lg={6}>
										<Grid item xs={5} md={4} lg={3}>
											<Typography className="p-6 text-left truncate" variant="body1">
												Mã tài sản
											</Typography>
										</Grid>
										<Grid item xs={7} md={8} lg={9}>
											<Typography className="p-6 font-extrabold " variant="body1">
												{entitiesEdit?.assetCode}
											</Typography>
										</Grid>
										<Grid item xs={5} md={4} lg={3}>
											<Typography className="p-6 text-left truncate" variant="body1">
												Tên tài sản
											</Typography>
										</Grid>
										<Grid item xs={7} md={8} lg={9}>
											<Typography className="p-6 font-extrabold " variant="body1">
												{entitiesEdit?.assetName}
											</Typography>
										</Grid>
										<Grid item xs={5} md={4} lg={3}>
											<Typography className="p-6 text-left truncate" variant="body1">
												Nhóm tài sản
											</Typography>
										</Grid>
										<Grid item xs={7} md={8} lg={9}>
											<Typography className="p-6 font-extrabold " variant="body1">
												{entitiesEdit?.groupName}
											</Typography>
										</Grid>
										<Grid item xs={5} md={4} lg={3}>
											<Typography className="p-6 text-left truncate" variant="body1">
												Mô tả
											</Typography>
										</Grid>
										<Grid item xs={7} md={8} lg={9}>
											<Typography className="p-6 font-extrabold " variant="body1">
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
											<Typography className="p-6 font-extrabold " variant="body1">
												{entitiesEdit && moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY')}
											</Typography>
										</Grid>
										<Grid item xs={5} md={4} lg={3}>
											<Typography className="p-6 text-left truncate" variant="body1">
												Nguyên giá
											</Typography>
										</Grid>
										<Grid item xs={7} md={8} lg={9}>
											<Typography className="p-6 font-extrabold " variant="body1">
												{entitiesEdit && currencyFormat(entitiesEdit.originalPrice)}
											</Typography>
										</Grid>
										<Grid item xs={5} md={4} lg={3}>
											<Typography className="p-6 text-left truncate" variant="body1">
												Tình trạng
											</Typography>
										</Grid>
										<Grid item xs={7} md={8} lg={9}>
											<Typography className="p-6 font-extrabold " variant="body1">
												{entitiesEdit?.statusName}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin sửa chữa bảo hành.</h5>
								</div>
								<div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mb-16 gap-8 ">
									<div className="flex flex-col">
										<Field
											label="Ngày kết thúc sửa chữa, bảo hành"
											name="dateEnd"
											hasFeedback
											component={DateCustom}
											className="mb-16"
											variant="outlined"
										/>
										<Field
											label="Tên đơn vị sửa chữa, bảo hành"
											hasFeedback
											type="text"
											name="nameService"
											component={AntInput}
											className="mb-16"
										/>
										<Field
											label="Chi phí thực tế"
											name="price"
											hasFeedback
											component={InputCurrency}
											className="mb-16"
											variant="outlined"
										/>
									</div>
									<Field
										label="File đính kèm"
										style={{ height: '53px' }}
										name="file"
										component={FileCustomVersion2}
										className="mb-16"
										variant="outlined"
									/>
								</div>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin đưa vào sử dụng lại.</h5>
								</div>
								<div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mb-16 gap-8 ">
									<div className="flex flex-col">
										<Field
											label="Lý do đưa vào sử dụng lại"
											name="note"
											row={2}
											component={InputTextAreaLg}
											className="mb-16"
											variant="outlined"
										/>
										<Field
											label="Ngày đưa vào sử dụng lại"
											name="date"
											hasFeedback
											component={DateCustom}
											className="mb-16"
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
