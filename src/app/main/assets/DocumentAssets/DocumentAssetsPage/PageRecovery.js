/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { Button, Grid, Icon } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Spin, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import Text from 'app/components/Text';
import { Field, Form, Formik } from 'formik';
import * as moment from 'moment';
import AntDateCustom from '../../../../../@fuse/FormBookingCustom/AntDateCustom';
import AntDescriptionsCustom from '../../../../../@fuse/FormBookingCustom/AntDescriptionsCustom';
// import AntFileCustom from '../../../../../@fuse/FormBookingCustom/AntFileCustom';

export default function PageRecovery() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { entitiesEdit, actionLoading } = useSelector(
		state => ({
			entitiesEdit: state.documentAsset.entitiesEdit,
			actionLoading: state.documentAsset.actionLoading
		}),
		shallowEqual
	);
	let initial = {
		date: moment(),
		note: '',
		file: ''
	};
	if (entitiesEdit) {
		initial = {
			date: entitiesEdit?.transDate,
			note: entitiesEdit?.reasons,
			file: entitiesEdit?.attachFiles
		};
	}

	const ExitPage = () => history.goBack();
	useEffect(() => {
		if (!entitiesEdit) history.goBack();
	}, [entitiesEdit, history]);
	// const ExportExcel = assetID => {
	// 	const token = getToken();
	// 	const dataReq = {
	// 		UserToken: token,
	// 		AssetID: assetID
	// 	};
	// 	window.location = `${URL}/api/RQAsset/ExportRequestRecovery?value=${JSON.stringify(dataReq)}`;
	// };
	return (
		<div className="container assets">
			<div className="assets__header px-16 shadow-lg">
				<Text color="primary" type="title">
					Thu hồi tài sản.
				</Text>
				<div className="assets__header--action">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="assets__content mt-8">
				<div className="assets__form">
					<Formik enableReinitialize initialValues={initial}>
						{({ handleSubmit, isSubmitting }) => (
							<Form>
								<div className="mb-20">
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
											<Text type="subTitle">
												{entitiesEdit?.assetCode ? entitiesEdit.assetCode : '-'}
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
											<Text type="subTitle">
												{entitiesEdit?.descr ? entitiesEdit.descr : '-'}
											</Text>
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
											<Text type="subTitle">
												{entitiesEdit?.empName ? entitiesEdit.empName : '-'}
											</Text>
										</Grid>
										<Grid item xs={6} md={6} lg={4}>
											<Text>Chức vụ:</Text>
										</Grid>
										<Grid item xs={6} md={6} lg={8}>
											<Text type="subTitle">
												{entitiesEdit?.jobTitle ? entitiesEdit.jobTitle : '-'}
											</Text>
										</Grid>
										<Grid item xs={6} md={6} lg={4}>
											<Text>Bộ phận:</Text>
										</Grid>
										<Grid item xs={6} md={6} lg={8}>
											<Text type="subTitle">
												{entitiesEdit?.deptName ? entitiesEdit.deptName : '-'}
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
									<div>
										<Text type="subTitle" color="primary" borderBottom>
											THÔNG TIN THU HỒI
										</Text>
									</div>
									<div className="grid grid-cols-3 mt-8">
										<Field
											label="Ngày thu hồi "
											name="date"
											hasFeedback
											component={AntDateCustom}
										/>
									</div>
									<div className="grid grid-cols-1 gap-8 ">
										<Field
											label="Lý do thu hồi"
											name="note"
											row={3}
											component={AntDescriptionsCustom}
										/>
										{/* <Field label="File đính kèm" name="file" component={AntFileCustom} /> */}
									</div>
								</div>
								<div className="flex justify-end">
									{actionLoading ? (
										<Spin size="middle" />
									) : (
										<Button type="submit" variant="contained" className="mr-8" color="primary">
											<Text type="button" color="white">
												Lưu
											</Text>
										</Button>
									)}
									<Button type="button" onClick={ExitPage} variant="contained" color="secondary">
										<Text type="button">Quay lại</Text>
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}
