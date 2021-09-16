import { Button, Grid, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import { Formik, Form, Field } from 'formik';
import { requestApproveResolve } from 'app/main/assets/proposedManagement/_redux/confirmAction';
import { notificationConfig } from '@fuse/core/DtpConfig';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import { Spin } from 'antd';
import { useHistory } from 'react-router';
import { CustomCorruptContext } from '../PageCustomCorruptContext';

const initial = {
	note: ''
};
export default function FormCorrupt({ entitiesEdit, actionLoading, params }) {
	const history = useHistory();
	const ConfirmContextLose = useContext(CustomCorruptContext);
	const { setDialogConfirmGobal } = ConfirmContextLose;
	const handleOpenFormReject = () => setDialogConfirmGobal(true);
	const dispatch = useDispatch();
	return (
		<Grid container item spacing={2}>
			<Grid className="mb-8" item sm={12} md={12} lg={12}>
				<Typography color="primary" variant="body1" className="mb-8">
					Thông tin tài sản
				</Typography>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Mã tài sản :
				</Typography>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				{' '}
				<Typography variant="body2"> {entitiesEdit?.assetID}</Typography>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Tên tài sản :
				</Typography>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				{' '}
				<Typography variant="body2"> {entitiesEdit?.assetName}</Typography>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Nhóm tài sản :
				</Typography>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				{' '}
				<Typography variant="body2"> {entitiesEdit?.groupName}</Typography>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Quy cách tài sản :
				</Typography>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				{' '}
				<Typography variant="body2"> </Typography>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Ngày mua :
				</Typography>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				{' '}
				<Typography variant="body2"> {moment(entitiesEdit?.purchaseDate).format('DD/MM/YYYY')} </Typography>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Nguyên giá :
				</Typography>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				{' '}
				<Typography variant="body2"> {currencyFormat(entitiesEdit?.originalPrice) || ''} </Typography>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Tình trạng :
				</Typography>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				{' '}
				<Typography variant="body2"> {entitiesEdit?.assetStatusName} </Typography>
			</Grid>
			<Grid className="mb-16" item sm={12} md={12} lg={12}>
				<Typography color="primary" variant="body1" className="mb-8">
					Thông tin tài sản bị {params?.corrupt === 'lost' ? 'mất' : 'hỏng'}
				</Typography>
			</Grid>
			<Grid item sm={12} md={12} lg={12}>
				<Formik
					enableReinitialize
					// validationSchema={checkValidateForm}
					initialValues={initial}
					onSubmit={values => {
						const status = true;
						dispatch(requestApproveResolve(entitiesEdit, status, values)).then(data => {
							if (!data.isError) {
								notificationConfig('success', 'Thành công', 'Phê duyệt thành công');
								history.goBack();
							}
						});
					}}
				>
					{({ handleSubmit, isSubmitting }) => (
						<Form>
							<div className="">
								<Field label="Nội dung" name="note" component={AntDescriptionsCustom} row={3} />
							</div>
							<div className="flex justify-end">
								{actionLoading ? (
									<Spin size="middle" />
								) : (
									<>
										<Button
											type="submit"
											className="button__cancle mr-8"
											variant="contained"
											color="primary"
										>
											{' '}
											<Typography variant="body2"> Duyệt </Typography>
										</Button>
										<Button
											onClick={handleOpenFormReject}
											autoFocus
											className="button__form"
											variant="contained"
											color="secondary"
										>
											<Typography variant="body2"> Không duyệt </Typography>
										</Button>
									</>
								)}
							</div>
						</Form>
					)}
				</Formik>
			</Grid>
		</Grid>
	);
}
