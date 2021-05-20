/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Button, Link, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { DeleteOutlined } from '@ant-design/icons';
import { Table, Input, Tooltip, Spin } from 'antd';
import NumberFormat from 'react-number-format';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import { AntInput } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import DateCustom from '@fuse/CustomForm/Date';
import RadioAntd from '@fuse/CustomForm/RadioAntd';
import { notificationConfig } from '@fuse/core/DtpConfig';
import InputTextAreaRequest from '@fuse/CustomForm/InputTextAreaRequest';
import FuseAnimate from '@fuse/core/FuseAnimate';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useHistory } from 'react-router-dom';
import * as actions from '../../_redux/confirmAction';
import { validateSchema } from './ConfigRequestProvider';

export default function RequestProviderBody({
	actionLoading,
	entitiesInformation,
	initialState,
	setInitialState,
	dataSource,
	setDataSource
}) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [optionDept, setOptionsDept] = useState([]);
	const [optionRegion, setOptionsRegion] = useState([]);
	const [optionLocation, setOptionsLocation] = useState([]);
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
			title: 'Mô tả',
			width: '40%',
			render: (text, record, index) => <Input value={text} onChange={onInputChange('Descr', index)} />
		},
		{
			dataIndex: 'Qty',
			title: 'Số lượng',
			width: '10%',
			render: (text, record, index) => <Input type="number" value={text} onChange={onInputChange('Qty', index)} />
		},
		{
			dataIndex: 'UnitPrice',
			title: 'Đơn giá',
			width: '20%',
			render: (text, record, index) => (
				<NumberFormat
					customInput={Input}
					value={text}
					onValueChange={onChangeFormatCurr('UnitPrice', index)}
					thousandSeparator
					// prefix="VNĐ "
				/>
			)
		},
		{
			dataIndex: 'TotalAmt',
			title: 'Thành tiền',
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
				<Tooltip placement="bottom" title="Xoá dòng">
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
						notificationConfig('warning', 'Chú ý!', 'Vui lòng nhập tài sản cần yêu cầu !!');
					} else {
						dispatch(actions.requestAssetFromUserAction(values, dataSource)).then(data => {
							if (data && !data.isError) {
								resetForm({});
								history.goBack();
								setDataSource([]);
								notificationConfig('success', 'Thành công!', 'Yêu cầu thành công !!');
							} else {
								// notificationConfig('warning', 'Thất bại!', 'Yêu cầu thất bại vui lòng thử lại');
							}
						});
					}
				}}
			>
				{({ handleSubmit, isSubmitting, resetForm }) => (
					<FuseAnimate animation="transition.slideRightIn" delay={300}>
						<Form className="flex flex-col w-full items-center justify-between mb-28 mt-28">
							<div style={{ width: '90%' }} className="sm">
								<div className="px-16 w-full sm:px-24">
									<div className="flex justify-between flex-row">
										<h5 className="font-extrabold">Thông tin người yêu cầu.</h5>
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-4 gap-8 ">
										<Field
											label="Nhân viên"
											name="nameEmp"
											readOnly
											autoFocus
											hasFeedback
											component={AntInput}
											// options={employees}
											// handleChangeState={onHandleChangeEmployee}
											className="mt-8 mb-16"
										/>
										<Field
											label="Bộ phận"
											hasFeedback
											name="department"
											readOnly
											// value={initialState.department}
											component={SelectAntd}
											// handleChangeState={onChangeDepartment}
											options={optionDept}
											className="mt-8 mb-16"
										/>
										<Field
											label="Khu vực"
											name="region"
											readOnly
											hasFeedback
											value={initialState.region}
											component={SelectAntd}
											// handleChangeState={onChangeRegion}
											options={optionRegion}
											className="mt-8 mb-16"
										/>
										<Field
											label="Ngày yêu cầu "
											autoFocus
											defaultValue={initialState.dateRequest}
											name="dateRequest"
											format="DD/MM/YYYY"
											placeholder="Vui lòng chọn ngày yêu cầu"
											component={DateCustom}
											className="mx-4 mb-16"
											hasFeedback
										/>
									</div>
								</div>
								<div className="px-16 sm:px-24">
									<div className="flex justify-between flex-row">
										<h5 className="font-extrabold">Tài sản yêu cầu.</h5>
									</div>
									<Typography variant="subtitle2" color="inherit" className="mb-16">
										<AddCircleOutlineIcon style={{ color: '#1890ff' }} />
										<Link style={{ color: '#1890ff' }} onClick={handleAdd}>
											Thêm tài sản{' '}
										</Link>
									</Typography>
									<Table
										rowKey="id"
										columns={columns}
										bordered
										locale={{ emptyText: 'Vui lòng nhập tài sản yêu cầu' }}
										pagination={false}
										dataSource={dataSource}
									/>
								</div>
								<div className="px-16 sm:px-24 mt-16">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 ">
										<Field
											label="Nơi dùng"
											hasFeedback
											name="locationUse"
											component={SelectAntd}
											options={optionLocation}
											className="mt-8"
										/>
										<div className="flex flex-row justify-around">
											<Field
												label="Loại yêu cầu "
												hasFeedback
												name="assetsCategory"
												component={RadioAntd}
												options={[
													{ label: 'Mua mới', value: 'N' },
													{ label: 'Bổ sung thêm', value: 'A' }
												]}
												className="mt-8 mb-16"
											/>
											<Field
												label="Khoản mua sắm này có nằm trong kế hoạch"
												name="plan"
												hasFeedback
												component={RadioAntd}
												options={[
													{ label: 'Có', value: true },
													{ label: 'Không', value: false }
												]}
												className="mt-8 mb-16"
											/>
										</div>
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
										<Field
											label="Lí do"
											hasFeedback
											name="reason"
											// value={initialState.reason || ''}
											component={InputTextAreaRequest}
											className="mt-8 mb-16"
											row={3}
										/>
										<Field
											label="Nhà cung cấp đề nghị (nếu có)"
											// value={intialState.note}
											name="supplier"
											row={3}
											component={InputTextAreaRequest}
											className="mx-4 mb-16"
										/>
									</div>
								</div>
								<div className="px-16 w-full sm:px-24 mb-28 flex justify-end">
									{actionLoading ? (
										<Spin size="middle" style={{ marginRight: 12 }} />
									) : (
										<Button variant="contained" type="submit" className="mr-16" color="primary">
											Gửi yêu cầu
										</Button>
									)}
									<Button
										type="button"
										onClick={() => handleResetForm(resetForm)}
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
		</>
	);
}
