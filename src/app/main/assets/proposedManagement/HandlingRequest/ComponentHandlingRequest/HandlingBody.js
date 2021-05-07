import DateCustom from '@fuse/CustomForm/Date';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import InputTextAreaRequest from '@fuse/CustomForm/InputTextAreaRequest';
import { Formik, Form, Field } from 'formik';
import React, { useState, useEffect } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Spin } from 'antd';
import RadioAntd from '@fuse/CustomForm/RadioAntd';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getDataUserLocalStorage, notificationConfig } from '@fuse/core/DtpConfig';
import FuseAnimate from '@fuse/core/FuseAnimate';
import ContentFormReport from './ContentFormReport';
import * as actions from '../../_redux/confirmAction';
import { validateSchema } from './HandlingRequestConfig';

const useStyles = makeStyles(theme => ({
	widthFont: {
		width: '13rem'
	},
	widthContent: {
		width: '60%'
	}
}));
export default function HandlingBody({ inititalState, handleClose, dataAssets, setDataAssets }) {
	const [disable, setDisable] = useState(true);
	const [user, setUser] = useState(null);
	const dispatch = useDispatch();
	useEffect(() => {
		const data = getDataUserLocalStorage();
		setUser(data);
		dispatch(actions.getAssetsUser());
	}, [dispatch]);
	const { actionLoading, assetsUser } = useSelector(
		state => ({
			assetsUser: state.confirm.assetsUser,
			actionLoading: state.confirm.actionLoading,
			listloading: state.confirm.listloading
		}),
		shallowEqual
	);
	const classes = useStyles();
	const handleChangeAssets = value => {
		const filterAssetUser = assetsUser.reduce((arr, curr) => (curr.value === value ? { ...curr } : arr));
		setDataAssets(filterAssetUser);
		setDisable(false);
	};
	return (
		<Formik
			enableReinitialize
			validationSchema={validateSchema}
			initialValues={inititalState}
			onSubmit={(values, { resetForm }) => {
				dispatch(actions.reportFailurePossesion(values, dataAssets, user)).then(data => {
					if (!data.isError) {
						notificationConfig('success', 'Thành công', 'Gửi yêu cầu thành công');
						dispatch(actions.getAssetsUser());
						resetForm({});
						setDisable(true);
					}
				});
			}}
		>
			{({ handleSubmit, isSubmitting, resetForm }) => (
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Form className="flex flex-col w-full items-center justify-between mb-28 mt-28">
						<div style={{ width: '80%' }} className="shadow-md">
							<div className="px-16 sm:px-24">
								<h5 className="font-extrabold">Chọn tài sản cần báo hỏng/mất.</h5>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-16 ">
									<Field
										name="assets"
										hasFeedback
										label="Chọn tài sản"
										options={assetsUser || []}
										component={SelectAntd}
										handleChangeState={handleChangeAssets}
									/>
									<Field
										label="Tài sản cần báo hỏng/mất "
										name="status"
										hasFeedback
										component={RadioAntd}
										options={[
											{ label: 'Báo hỏng', value: 'Damage' },
											{ label: 'Báo mất', value: 'Lost' }
										]}
										className="mt-8 mb-16"
									/>
								</div>
							</div>
							{!disable && (
								<div className="px-16 w-full sm:px-24">
									<ContentFormReport classes={classes} entitiesEdit={dataAssets} />
								</div>
							)}

							<div className="px-16 sm:px-24">
								<div className="flex flex-row">
									<h5 className="font-extrabold">Thông tin báo hỏng/mất.</h5>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<div className="flex flex-col">
										<Field
											label="Lí do báo hỏng/mất"
											name="note"
											row={4}
											component={InputTextAreaRequest}
											className="mx-4 mb-16"
											variant="outlined"
											hasFeedback
										/>
										<Field
											label="Ngày báo hỏng/mất"
											autoFocus
											name="date"
											hasFeedback
											component={DateCustom}
											className="mx-4 mb-16"
											variant="outlined"
										/>
									</div>
									<Field
										label="File Đính kèm"
										autoFocus
										name="file"
										style={{ height: '49.5px' }}
										component={FileCustomVersion2}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
							</div>
							<div className="px-16 w-full sm:px-24 mb-28 flex justify-end">
								{actionLoading ? (
									<Spin className="mr-23" />
								) : (
									<Button
										type="submit"
										className="h-26 mr-16 font-sans"
										variant="contained"
										color="primary"
									>
										Gửi yêu cầu
									</Button>
								)}
								<Button
									type="button"
									onClick={resetForm}
									className="h-26 font-sans"
									variant="contained"
									color="secondary"
								>
									Đặt lại
								</Button>
							</div>
						</div>
					</Form>
				</FuseAnimate>
			)}
		</Formik>
	);
}
