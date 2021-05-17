import DateCustom from '@fuse/CustomForm/Date';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import InputTextAreaRequest from '@fuse/CustomForm/InputTextAreaRequest';
import { Formik, Form, Field } from 'formik';
import React, { useState, useEffect } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Spin } from 'antd';
import * as moment from 'moment';
import RadioAntd from '@fuse/CustomForm/RadioAntd';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getDataUserLocalStorage, notificationConfig } from '@fuse/core/DtpConfig';
import { useHistory } from 'react-router-dom';
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
export default function HandlingBody({ handleClose, dataAssets, setDataAssets }) {
	const history = useHistory();
	const [disable, setDisable] = useState(true);
	const [initialstate, setInitialState] = useState({
		note: '',
		status: 'Damage',
		date: moment(Date.now()),
		file: '',
		assets: ''
	});
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
		setInitialState({
			...initialstate,
			assets: value
		});
		const filterAssetUser = assetsUser.reduce((arr, curr) => (curr.value === value ? { ...curr } : arr));
		setDataAssets(filterAssetUser);
		setDisable(false);
	};
	return (
		<Formik
			enableReinitialize
			validationSchema={validateSchema}
			initialValues={initialstate}
			onSubmit={(values, { resetForm }) => {
				dispatch(actions.reportFailurePossesion(values, dataAssets, user)).then(data => {
					if (data && !data.isError) {
						notificationConfig('success', 'Thành công', 'Gửi yêu cầu thành công');
						dispatch(actions.getAssetsUser());
						history.goBack();
						setInitialState({
							note: '',
							status: 'Damage',
							date: moment(Date.now()),
							file: '',
							assets: ''
						});
						setDisable(true);
						resetForm({});
					}
				});
			}}
		>
			{({ handleSubmit, isSubmitting, resetForm }) => (
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Form className="flex flex-col w-full items-center justify-between mb-28 mt-28">
						<div style={{ width: '80%' }} className="shadow-md">
							<div className="px-16 sm:px-24">
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
										label="Loại báo hỏng/mất "
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
									onClick={() => history.goBack()}
									className="h-26 font-sans"
									variant="contained"
									color="secondary"
								>
									Quay lại
								</Button>
							</div>
						</div>
					</Form>
				</FuseAnimate>
			)}
		</Formik>
	);
}
