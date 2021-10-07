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
import Text from 'app/components/Text';
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
				<Text color="primary" type="subTitle" borderBottom>
					THÔNG TIN TÀI SẢN
				</Text>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				<Text type="body"> Mã tài sản:</Text>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				{' '}
				<Text type="subTitle"> {entitiesEdit?.assetID}</Text>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				<Text type="body"> Tên tài sản:</Text>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				{' '}
				<Text type="subTitle"> {entitiesEdit?.assetName}</Text>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				<Text type="body"> Nhóm tài sản :</Text>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				{' '}
				<Text type="subTitle"> {entitiesEdit?.groupName}</Text>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				<Text type="body"> Quy cách tài sản :</Text>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				{' '}
				<Text type="subTitle"> </Text>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				<Text type="body"> Ngày mua :</Text>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				{' '}
				<Text type="subTitle"> {moment(entitiesEdit?.purchaseDate).format('DD/MM/YYYY')} </Text>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				<Text type="body"> Nguyên giá :</Text>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				{' '}
				<Text type="subTitle"> {currencyFormat(entitiesEdit?.originalPrice) || ''} </Text>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				<Text type="body"> Tình trạng :</Text>
			</Grid>
			<Grid item sm={6} md={6} lg={6}>
				{' '}
				<Text type="subTitle"> {entitiesEdit?.assetStatusName} </Text>
			</Grid>
			<Grid item sm={12} md={12} lg={12}>
				<Text color="primary" type="subTitle" borderBottom>
					THÔNG TIN TÀI SẢN BỊ {params?.corrupt === 'lost' ? 'MẤT' : 'HỎNG'}
				</Text>
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
											<Typography variant="button"> Duyệt </Typography>
										</Button>
										<Button
											onClick={handleOpenFormReject}
											autoFocus
											className="button__form"
											variant="contained"
											color="secondary"
										>
											<Typography variant="button"> Không duyệt </Typography>
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
