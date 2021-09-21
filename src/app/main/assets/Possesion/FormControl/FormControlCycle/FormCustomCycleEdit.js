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
import Text from 'app/components/Text';

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
								<Text type="subTitle" color="primary" borderBottom>
									THÔNG TIN TÀI SẢN.
								</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Text type="body">Mã tài sản:</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Text type="body">{entitiesEdit?.assetCode ? entitiesEdit?.assetCode : '-'}</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Text type="body">Tên tài sản:</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Text type="body">{entitiesEdit?.assetName ? entitiesEdit.assetName : '-'}</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Text type="body">Nhóm tài sản:</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Text type="body">{entitiesEdit?.groupName ? entitiesEdit.groupName : '-'}</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Text type="body">Mô tả:</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Text type="body">{entitiesEdit?.descr ? entitiesEdit.descr : '-'}</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Text type="body">Ngày mua:</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Text type="body">
									{entitiesEdit?.purchaseDate
										? moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY')
										: ''}
								</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Text type="body">Nguyên giá:</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Text type="body">{entitiesEdit && currencyFormat(entitiesEdit.originalPrice)}</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={4}>
								<Text type="body">Tình trạng:</Text>
							</Grid>
							<Grid item xs={6} md={6} lg={8}>
								<Text type="body">{entitiesEdit?.statusName ? entitiesEdit.statusName : '-'}</Text>
							</Grid>
						</Grid>
						<div className="mt-16">
							<div>
								<Text type="subTitle" color="primary" borderBottom>
									THÔNG TIN SỬA CHỮA TÀI SẢN.
								</Text>
							</div>
							<div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mb-16 gap-8 ">
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
								<Field label="Chi phí thực tế" name="price" hasFeedback component={AntInputCurrency} />
							</div>
							<div>
								<Field
									label="File đính kèm"
									name="file"
									component={AntFileCustom}
									className="mb-16"
									variant="outlined"
								/>
							</div>
						</div>
						<div className="mt-16">
							<div>
								<Text type="subTitle" color="primary" borderBottom>
									THÔNG TIN ĐƯA VÀO SỬ DỤNG LẠI.
								</Text>
							</div>
							<div className="grid grid-cols-2 gap-8 ">
								<Field
									label="Ngày đưa vào sử dụng lại"
									name="date"
									hasFeedback
									component={AntDateCustom}
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Lý do đưa vào sử dụng lại"
									name="note"
									row={2}
									component={AntDescriptionsCustom}
								/>
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
