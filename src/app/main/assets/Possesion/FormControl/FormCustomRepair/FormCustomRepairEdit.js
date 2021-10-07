import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
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
import Text from 'app/components/Text';

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
								<Text type="subTitle" color="primary" borderBottom>
									THÔNG TIN TÀI SẢN
								</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Text>Mã tài sản:</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Text type="subTitle">{entitiesEdit?.assetCode ? entitiesEdit?.assetCode : '-'}</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Text>Tên tài sản:</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Text type="subTitle">{entitiesEdit?.assetName ? entitiesEdit.assetName : '-'}</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Text>Nhóm tài sản:</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Text type="subTitle">{entitiesEdit?.groupName ? entitiesEdit.groupName : '-'}</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Text>Mô tả:</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Text type="subTitle">{entitiesEdit?.descr ? entitiesEdit.descr : '-'}</Text>
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
								<Text>Nguyên giá:</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Text type="subTitle">{currencyFormat(entitiesEdit?.originalPrice) || '-'}</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Text>Tình trạng:</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Text type="subTitle">{entitiesEdit?.statusName ? entitiesEdit.statusName : '-'}</Text>
							</Grid>
						</Grid>
						<div className="mt-16">
							<div>
								<Text type="subTitle" color="primary" borderBottom>
									THÔNG TIN SỬA CHỮA BẢO HÀNH
								</Text>
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
								<Spin style={{ marginRight: '20px' }} />
							) : (
								<Button type="submit" className="mr-8" variant="contained" color="primary">
									<Text type="button" color="white">
										Lưu
									</Text>
								</Button>
							)}
							<Button
								onClick={handleClose}
								type="button"
								className="h-26"
								variant="contained"
								color="secondary"
							>
								<Text type="button">Hủy</Text>
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
