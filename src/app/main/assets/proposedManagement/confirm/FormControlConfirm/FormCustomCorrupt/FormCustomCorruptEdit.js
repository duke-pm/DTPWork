import React from 'react';
import { DialogContent, Grid, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import * as momemt from 'moment';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import InputTextArea from '@fuse/CustomForm/InputTextArea';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
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
							<Grid className="mb-8" item xs={12} sm={12} md={12} lg={12}>
								<Typography color="primary" variant="subtitle2" className="label--form--title mb-8">
									THÔNG TIN TÀI SẢN.
								</Typography>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Typography variant="subtitle2" color="primary">
									{' '}
									Mã tài sản :
								</Typography>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								{' '}
								<Typography variant="body2"> {entitiesEdit?.assetID}</Typography>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Typography variant="subtitle2" color="primary">
									{' '}
									Tên tài sản :
								</Typography>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								{' '}
								<Typography variant="body2"> {entitiesEdit?.assetName}</Typography>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Typography variant="subtitle2" color="primary">
									{' '}
									Nhóm tài sản :
								</Typography>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								{' '}
								<Typography variant="body2"> </Typography>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Typography variant="subtitle2" color="primary">
									{' '}
									Quy cách tài sản :
								</Typography>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								{' '}
								<Typography variant="body2"> </Typography>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Typography variant="subtitle2" color="primary">
									{' '}
									Ngày mua :
								</Typography>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								{' '}
								<Typography variant="body2">
									{' '}
									{momemt(entitiesEdit?.purchaseDate).format('DD/MM/YYYY') || ''}{' '}
								</Typography>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Typography variant="subtitle2" color="primary">
									{' '}
									Nguyên giá :
								</Typography>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Typography variant="body2">
									{currencyFormat(entitiesEdit?.originalPrice) || ''}{' '}
								</Typography>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Typography variant="subtitle2" color="primary">
									Tình trạng :
								</Typography>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<Typography variant="body2">{entitiesEdit?.assetStatusName}</Typography>
							</Grid>
							<Grid className="mb-8" item xs={12} sm={12} md={12} lg={12}>
								<Typography color="primary" variant="subtitle2" className="label--form--title mb-8">
									THÔNG TIN TÀI SẢN BỊ{' '}
									{type === 'allocation' ? null : type === 'bao-mat' ? 'MẤT' : 'HỎNG'}.
								</Typography>
							</Grid>
							<Grid className="mb-8" item xs={12} sm={12} md={12} lg={12}>
								<div className={`grid grid-cols-1 gap-8 `}>
									<Field
										readOnly
										label="Lý do"
										name="reason"
										component={AntDescriptionsCustom}
										className="mt-8 mb-16"
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
