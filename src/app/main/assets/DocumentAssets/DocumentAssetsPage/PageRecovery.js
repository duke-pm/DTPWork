/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Button, Grid, Icon, IconButton } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Avatar, Spin, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import Text from 'app/components/Text';
import { Field, Form, Formik } from 'formik';
import * as moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';
import { FileExcelOutlined, FileImageOutlined, FileWordOutlined } from '@ant-design/icons';
import AntDateCustom from '../../../../../@fuse/FormBookingCustom/AntDateCustom';
import AntDescriptionsCustom from '../../../../../@fuse/FormBookingCustom/AntDescriptionsCustom';
import { checkFile, nameFile } from '../../../../../@fuse/core/DtpConfig';
import AntFileCustom from '../../../../../@fuse/FormBookingCustom/AntFileCustom';
import { updateDocumentAssetRevcovery } from '../service/_actionDocumentAssets';
// import AntFileCustom from '../../../../../@fuse/FormBookingCustom/AntFileCustom';
const file = {
	docx: <FileWordOutlined />,
	xlsx: <FileExcelOutlined />,
	xls: <FileExcelOutlined />,
	png: <FileImageOutlined />,
	jpg: <FileImageOutlined />,
	jpge: <FileImageOutlined />
};
export default function PageRecovery() {
	const dispatch = useDispatch();
	const [fileCheck, setFileCheck] = useState(true);
	const [listFile, setListFile] = useState(null);
	const [removeFile, setRemoveFile] = useState(false);
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
			file: ''
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
	const handleClearFile = () => {
		setRemoveFile(true);
		setFileCheck(false);
	};
	const handleClearListFile = () => {
		setListFile(null);
		setFileCheck(false);
	};
	const handleChangeFile = value => {
		setListFile(value.name);
		setFileCheck(false);
		setRemoveFile(false);
	};
	const handleSubmit = values => {
		dispatch(updateDocumentAssetRevcovery(entitiesEdit, values, removeFile)).then(data => {
			if (!data?.isError) history.goBack();
		});
	};
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
					<Formik enableReinitialize initialValues={initial} onSubmit={values => handleSubmit(values)}>
						{({ isSubmitting }) => (
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
											readOnly
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
										{entitiesEdit &&
										entitiesEdit.attachFiles &&
										entitiesEdit.attachFiles.length > 0 &&
										fileCheck ? (
											<div className="flex flex-row justify-between">
												<div className="flex flex-row">
													<Avatar
														shape="square"
														size={54}
														style={{ backgroundColor: '#87d068' }}
														icon={
															entitiesEdit.attachFiles &&
															file[checkFile(entitiesEdit.attachFiles)]
														}
													/>
													<Button
														style={{ backgroundColor: 'none', marginLeft: '10px' }}
														href={`${process.env.REACT_APP_API_URL}/${entitiesEdit.attachFiles}`}
													>
														{' '}
														{nameFile(entitiesEdit.attachFiles)}
													</Button>
												</div>
												<div>
													{' '}
													<IconButton
														edge="start"
														color="inherit"
														onClick={handleClearFile}
														aria-label="close"
													>
														<CloseIcon />
													</IconButton>{' '}
												</div>
											</div>
										) : listFile && listFile.length ? (
											<div className="flex flex-row justify-between">
												<div className="flex flex-row">
													<Avatar
														shape="square"
														size={54}
														style={{ backgroundColor: '#87d068' }}
														icon={listFile && file[checkFile(listFile)]}
													/>
													<Button style={{ backgroundColor: 'none', marginLeft: '10px' }}>
														{' '}
														{nameFile(listFile)}
													</Button>
												</div>
												<div>
													{' '}
													<IconButton
														edge="start"
														color="inherit"
														onClick={handleClearListFile}
														aria-label="close"
													>
														<CloseIcon />
													</IconButton>{' '}
												</div>
											</div>
										) : (
											<Field
												label=""
												handleChangeImage={handleChangeFile}
												style={{ height: '25px' }}
												name="file"
												component={AntFileCustom}
												className="mb-16"
												variant="outlined"
											/>
										)}{' '}
									</div>
								</div>
								<div className="flex justify-end">
									{!actionLoading ? (
										<Button className="mr-8" type="submit" variant="contained" color="primary">
											<Text color="white" type="button">
												Cập nhật
											</Text>
										</Button>
									) : (
										<Spin style={{ marginRight: '20px' }} />
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
