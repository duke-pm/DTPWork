import React from 'react';
import { Grid } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import * as momemt from 'moment';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import Text from 'app/components/Text';
import * as actions from '../../../_redux/confirmAction';

export default function FormCustomCorruptEdit({ entitiesEdit, handleClose, setFormControl, type }) {
	let initialState = {
		reason: '',
		reasonReject: ''
	};
	if (entitiesEdit) {
		initialState = {
			reason: entitiesEdit.reason,
			reasonReject: entitiesEdit.reasonReject
		};
	}
	const dispatch = useDispatch();
	return (
		<>
			<Formik
				enableReinitialize
				// validationSchema={checkValidateForm}
				initialValues={initialState}
				onSubmit={values => {
					const status = true;
					dispatch(actions.requestApprove(entitiesEdit, status, values)).then(data => {
						if (!data.isError) {
							notificationConfig('success', 'Thành công', 'Gửi xác nhận thành công');
							handleClose();
							setFormControl(false);
						}
					});
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<Grid container item spacing={2}>
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<Text type="subTitle" color="primary" borderBottom>
									THÔNG TIN TÀI SẢN.
								</Text>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Text type="body"> Mã tài sản :</Text>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								{' '}
								<Text type="subTitle"> {entitiesEdit?.assetID}</Text>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Text type="body"> Tên tài sản :</Text>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								{' '}
								<Text type="subTitle"> {entitiesEdit?.assetName}</Text>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Text type="body"> Nhóm tài sản :</Text>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								{' '}
								<Text type="subTitle"> </Text>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Text type="body"> Quy cách tài sản :</Text>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								{' '}
								<Text type="subTitle"> </Text>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Text type="body"> Ngày mua :</Text>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								{' '}
								<Text type="subTitle">
									{' '}
									{momemt(entitiesEdit?.purchaseDate).format('DD/MM/YYYY') || ''}{' '}
								</Text>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Text type="body"> Nguyên giá :</Text>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Text type="subTitle">{currencyFormat(entitiesEdit?.originalPrice) || ''} </Text>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Text type="body">Tình trạng :</Text>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Text type="subTitle">{entitiesEdit?.assetStatusName}</Text>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<Text type="subTitle" color="primary" borderBottom>
									THÔNG TIN TÀI SẢN BỊ{' '}
									{type === 'allocation' ? null : type === 'bao-mat' ? 'MẤT' : 'HỎNG'}.
								</Text>
							</Grid>
							<Grid className="mb-8" item xs={12} sm={12} md={12} lg={12}>
								<div className={`grid grid-cols-1 gap-8 `}>
									<Field
										readOnly
										label="Lý do"
										name="reason"
										component={AntDescriptionsCustom}
										row={2}
									/>
									{entitiesEdit && entitiesEdit.statusID === 4 && (
										<Field
											readOnly
											label="Lý do từ chối "
											name="reasonReject"
											component={AntDescriptionsCustom}
											row={2}
										/>
									)}
								</div>
							</Grid>
						</Grid>
						{/* <DialogActions>
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<>
									<Button
										autoFocus
										type="submit"
										className="h-26 font-sans"
										variant="contained"
										color="primary"
									>
										Duyệt
									</Button>
									<Button
										onClick={handleOpenFormReject}
										autoFocus
										className="h-26 font-sans"
										variant="contained"
										color="secondary"
									>
										Không duyệt
									</Button>
								</>
							)}
						</DialogActions> */}
					</Form>
				)}
			</Formik>
		</>
	);
}
