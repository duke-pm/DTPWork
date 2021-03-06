/* eslint-disable new-cap */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Button, Link, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { DeleteOutlined } from '@ant-design/icons';
import { Table, Input, Tooltip, Spin } from 'antd';
import NumberFormat from 'react-number-format';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import { getToken, notificationConfig, URL } from '@fuse/core/DtpConfig';
import FuseAnimate from '@fuse/core/FuseAnimate';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntSelectCustom from '@fuse/FormBookingCustom/AntSelectCustom';
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
import AntRadioCustom from '@fuse/FormBookingCustom/AntRadioCustom';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import Text from 'app/components/Text';
import { validateSchema } from './ConfigRequestProvider';
import * as actions from '../../_redux/confirmAction';

export default function RequestProviderBody({
	actionLoading,
	entitiesInformation,
	initialState,
	setInitialState,
	dataSource,
	setDataSource
}) {
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
	const dispatch = useDispatch();
	const history = useHistory();
	const [requestID, setRequestID] = useState(null);
	const [optionDept, setOptionsDept] = useState([]);
	const [optionRegion, setOptionsRegion] = useState([]);
	const [optionLocation, setOptionsLocation] = useState([]);
	const ExportExcel = () => {
		const token = getToken();
		const dataReq = {
			UserToken: token,
			RequestID: requestID
		};
		history.goBack();
		window.location = `${URL}/api/RQAsset/ExportRequestAllocation?value=${JSON.stringify(dataReq)}`;
	};
	useEffect(() => {
		if (entitiesInformation) {
			const newInformation = entitiesInformation.employees.reduce((arr, curr) =>
				curr.empCode === initialState.name ? curr : arr
			);
			const OptionLocation = entitiesInformation.department.reduce(
				(arr, curr) => [...arr, { label: curr.deptName, value: curr.deptCode }],
				[]
			);
			const OptionDepart = entitiesInformation.department.reduce(
				(arr, curr) => [...arr, { value: curr.deptCode, label: curr.deptName }],
				[]
			);
			const OptionRegion = entitiesInformation.region.reduce(
				(arr, curr) => [...arr, { value: curr.regionCode, label: curr.regionName }],
				[]
			);
			setOptionsLocation(OptionLocation);
			setOptionsDept(OptionDepart);
			setOptionsRegion(OptionRegion);
			setInitialState({
				...initialState,
				department: newInformation.deptCode,
				region: newInformation.regionCode,
				jobTitle: newInformation.jobTitle
			});
		}
	}, [entitiesInformation]);
	const onInputChange = (key, index) => e => {
		const newData = [...dataSource];
		newData[index][key] = e.target.value;
		setTotal(newData, index);
		setDataSource(newData);
	};
	const onChangeFormatCurr = (key, index) => value => {
		const newData = [...dataSource];
		newData[index][key] = value.floatValue;
		setDataSource(newData);
		setTotal(newData, index);
	};
	const setTotal = (data, index) => {
		data[index].TotalAmt = data[index].Qty * data[index].UnitPrice;
	};
	const columns = [
		{
			dataIndex: 'Descr',
			title: 'M?? t???',
			width: '40%',
			render: (text, record, index) => <Input value={text} onChange={onInputChange('Descr', index)} />
		},
		{
			dataIndex: 'Qty',
			title: 'S??? l?????ng',
			width: '10%',
			render: (text, record, index) => (
				<Input className="text-right" min={0} type="number" value={text} onChange={onInputChange('Qty', index)} />
			)
		},
		{
			dataIndex: 'UnitPrice',
			title: '????n gi??',
			width: '20%',
			render: (text, record, index) => (
				<NumberFormat
					className="text-right"
					customInput={Input}
					value={text}
					onValueChange={onChangeFormatCurr('UnitPrice', index)}
					thousandSeparator
					// prefix="VN?? "
				/>
			)
		},
		{
			dataIndex: 'TotalAmt',
			title: 'Th??nh ti???n',
			width: '20%',
			render: (text, record, index) => <h4 className="text-right">{currencyFormat(text)}</h4>
		},
		{
			dataIndex: 'action',
			// title: (
			// 	<IconButton aria-label="delete">
			// 		<AppsIcon />
			// 	</IconButton>
			// ),
			align: 'center',
			width: '10%',
			render: (text, record, index) => (
				<Tooltip placement="bottom" title="Xo?? d??ng">
					<DeleteOutlined
						onClick={() => handleDeleteRow(record.id)}
						className="text-xl text-center "
						style={{ color: 'red' }}
					/>
				</Tooltip>
			)
		}
	];

	const handleAdd = () => {
		const newData = {
			id: dataSource.length + 1,
			Descr: '',
			Qty: 1,
			UnitPrice: '',
			TotalAmt: ''
		};
		setDataSource([...dataSource, newData]);
	};
	const handleDeleteRow = id => {
		const newArr = dataSource.filter(item => item.id !== id);
		setDataSource(newArr);
	};
	const handleResetForm = resetForm => {
		history.goBack();
	};
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={validateSchema}
				initialValues={initialState}
				onSubmit={(values, { resetForm }) => {
					if (dataSource.length === 0) {
						notificationConfig('warning', 'Ch?? ??!', 'Vui l??ng nh???p t??i s???n c???n y??u c???u !!');
					} else {
						dispatch(actions.requestAssetFromUserAction(values, dataSource)).then(data => {
							if (data && !data.isError) {
								// setDataSource([]);
								notificationConfig('success', 'Th??nh c??ng!', 'Y??u c???u th??nh c??ng !!');
								setRequestID(data.data.requestID);
							} else {
								// notificationConfig('warning', 'Th???t b???i!', 'Y??u c???u th???t b???i vui l??ng th??? l???i');
							}
						});
					}
				}}
			>
				{({ handleSubmit, isSubmitting, resetForm }) => (
					<FuseAnimate animation="transition.slideRightIn" delay={300}>
						<Form className="flex flex-col items-center justify-between mb-28">
							<div style={{ width: '90%' }} className="sm" id="content">
								{/* <button onClick={DemoExport}> Exexl </button> */}
								<div className="">
									<div>
										<Text type="subTitle" color="primary" borderBottom>
											TH??NG TIN NG?????I Y??U C???U.
										</Text>{' '}
									</div>
									<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 ">
										<Field
											label="Nh??n vi??n"
											name="nameEmp"
											readOnly
											autoFocus
											hasFeedback
											component={AntInputCustom}
											// options={employees}
											// handleChangeState={onHandleChangeEmployee}
										/>
										<Field
											label="B??? ph???n"
											hasFeedback
											name="department"
											readOnly
											// value={initialState.department}
											component={AntSelectCustom}
											// handleChangeState={onChangeDepartment}
											options={optionDept}
											className="mt-8 mb-16"
										/>
										<Field
											label="Khu v???c"
											name="region"
											readOnly
											hasFeedback
											value={initialState.region}
											component={AntSelectCustom}
											// handleChangeState={onChangeRegion}
											options={optionRegion}
											className="mt-8 mb-16"
										/>
										<Field
											label="Ng??y y??u c???u "
											autoFocus
											defaultValue={initialState.dateRequest}
											name="dateRequest"
											format="DD/MM/YYYY"
											placeholder="Vui l??ng ch???n ng??y y??u c???u"
											component={AntDateCustom}
											className="mb-16"
											hasFeedback
										/>
									</div>
								</div>
								<div className="table-form">
									<div>
										<Text type="subTitle" color="primary" borderBottom>
											T??I S???N Y??U C???U.
										</Text>{' '}
									</div>
									<Typography variant="subtitle2" color="inherit" className="mb-16">
										<AddCircleOutlineIcon style={{ color: '#1890ff' }} />
										<Link style={{ color: '#1890ff' }} onClick={handleAdd}>
											Th??m t??i s???n{' '}
										</Link>
									</Typography>
									<Table
										scroll={{ x: matchesSM && 720 }}
										rowKey="id"
										columns={columns}
										bordered
										locale={{ emptyText: 'Vui l??ng nh???p t??i s???n y??u c???u' }}
										pagination={false}
										dataSource={dataSource}
									/>
								</div>
								<div className="mt-16">
									<div className="grid sm:grid-cols-1 md:grid-cols-1 gap-8 ">
										<Field
											label="N??i d??ng"
											hasFeedback
											name="locationUse"
											component={AntSelectCustom}
											options={optionLocation}
											className="mt-8"
										/>
										<Field
											label="Lo???i y??u c???u "
											hasFeedback
											name="assetsCategory"
											component={AntRadioCustom}
											options={[
												{ label: 'Mua m???i', value: 'N' },
												{ label: 'B??? sung th??m', value: 'A' }
											]}
											className="mt-8 mb-16"
										/>
										<Field
											label="Kho???n mua n??y c?? n???m trong k??? ho???ch"
											name="plan"
											hasFeedback
											component={AntRadioCustom}
											options={[
												{ label: 'C??', value: true },
												{ label: 'Kh??ng', value: false }
											]}
											className="mt-8 mb-16"
										/>
									</div>
									<div className="grid grid-cols-1 gap-8 ">
										<Field
											label="L?? do"
											name="reason"
											// value={initialState.reason || ''}
											component={AntDescriptionsCustom}
											row={3}
										/>
										<Field
											label="Nh?? cung c???p ????? ngh??? (n???u c??)"
											// value={intialState.note}
											name="supplier"
											row={3}
											component={AntDescriptionsCustom}
										/>
									</div>
								</div>
								<div className="w-full flex justify-end">
									{requestID && (
										<Button
											onClick={ExportExcel}
											className="h-26 mr-16"
											variant="contained"
											color="primary"
										>
											Export
										</Button>
									)}
									{actionLoading ? (
										<Spin size="middle" style={{ marginRight: 12 }} />
									) : (
										<Button variant="contained" type="submit" className="mr-16" color="primary">
											<Typography variant="button">G???i y??u c???u</Typography>
										</Button>
									)}
									<Button
										type="button"
										onClick={() => handleResetForm(resetForm)}
										className="h-26"
										variant="contained"
										color="secondary"
									>
										<Typography variant="button">Quay l???i</Typography>
									</Button>
								</div>
							</div>
						</Form>
					</FuseAnimate>
				)}
			</Formik>
		</>
	);
}
