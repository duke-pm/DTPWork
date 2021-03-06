/* eslint-disable no-shadow */
import { Formik, Form, Field } from 'formik';
import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import { Spin } from 'antd';
import * as moment from 'moment';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getDataUserLocalStorage, getToken, notificationConfig, URL } from '@fuse/core/DtpConfig';
import { useHistory } from 'react-router-dom';
import FuseAnimate from '@fuse/core/FuseAnimate';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import AntSelectCustom from '@fuse/FormBookingCustom/AntSelectCustom';
import AntRadioCustom from '@fuse/FormBookingCustom/AntRadioCustom';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
import AntFileCustom from '@fuse/FormBookingCustom/AntFileCustom';
import { validateSchema } from './HandlingRequestConfig';
import * as actions from '../../_redux/confirmAction';
import ContentFormReport from './ContentFormReport';

export default function HandlingBody({ dataAssets, setDataAssets, value }) {
	const history = useHistory();
	const [requestID, setRequestID] = useState(null);
	const [disable, setDisable] = useState(true);
	const [initialstate, setInitialState] = useState({
		note: '',
		status: value === 'bao-hong' ? 'Damage' : 'Lost',
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
	const exportExcel = () => {
		const token = getToken();
		const dataReq = {
			UserToken: token,
			RequestID: requestID
		};
		history.goBack();
		window.location = `${URL}/api/RQAsset/ExportRequestDamage?value=${JSON.stringify(dataReq)}`;
	};
	const { actionLoading, assetsUser } = useSelector(
		state => ({
			assetsUser: state.confirm.assetsUser,
			actionLoading: state.confirm.actionLoading,
			listloading: state.confirm.listloading
		}),
		shallowEqual
	);
	const classes = DtpCustomStyles();
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
						notificationConfig('success', 'Th??nh c??ng', 'G???i y??u c???u th??nh c??ng');
						dispatch(actions.getAssetsUser());
						// history.goBack();
						// setInitialState({
						// 	note: '',
						// 	status: 'Damage',
						// 	date: moment(Date.now()),
						// 	file: '',
						// 	assets: ''
						// });
						// setDisable(true);
						if (values.status === 'Damage') {
							setRequestID(data.data.requestID);
						} else {
							history.goBack();
						}
					}
				});
			}}
		>
			{({ handleSubmit, isSubmitting, resetForm }) => (
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Form>
						<div className="px-16 sm:px-24">
							<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
								<Field
									name="assets"
									hasFeedback
									label="Ch???n t??i s???n"
									options={assetsUser || []}
									component={AntSelectCustom}
									handleChangeState={handleChangeAssets}
								/>
								<Field
									label={`Ng??y b??o ${value === 'bao-hong' ? 'h???ng' : 'm???t'}`}
									name="date"
									hasFeedback
									component={AntDateCustom}
								/>
							</div>
						</div>
						{!disable && (
							<div className="px-16 w-full sm:px-24 mb-16">
								<ContentFormReport classes={classes} entitiesEdit={dataAssets} />
							</div>
						)}

						<div className="px-16 sm:px-24">
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Lo???i y??u c???u"
									name="status"
									readOnly
									hasFeedback
									component={AntRadioCustom}
									options={[
										{ label: 'B??o h???ng', value: 'Damage' },
										{ label: 'B??o m???t', value: 'Lost' }
									]}
								/>
								<Field
									label={`L?? do b??o ${value === 'bao-hong' ? 'h???ng' : 'm???t'}`}
									name="note"
									row={3}
									component={AntDescriptionsCustom}
									hasFeedback
								/>
								<div>
									<Field label="File ????nh k??m" name="file" component={AntFileCustom} />
								</div>
							</div>
						</div>
						<div className="px-16 w-full sm:px-24 mb-28 flex justify-end">
							{requestID && (
								<Button
									onClick={exportExcel}
									className="h-26 mr-16"
									variant="contained"
									color="primary"
								>
									Export
								</Button>
							)}
							{actionLoading ? (
								<Spin style={{ marginRight: '20px' }} />
							) : (
								<Button type="submit" className="h-26 mr-16" variant="contained" color="primary">
									<Typography variant="button">G???i y??u c???u</Typography>
								</Button>
							)}
							<Button
								type="button"
								onClick={() => history.goBack()}
								className="h-26"
								variant="contained"
								color="secondary"
							>
								<Typography variant="button">Quay l???i</Typography>
							</Button>
						</div>
					</Form>
				</FuseAnimate>
			)}
		</Formik>
	);
}
