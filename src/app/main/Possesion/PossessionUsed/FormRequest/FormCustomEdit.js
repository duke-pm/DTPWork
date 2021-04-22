/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState, useEffect, useRef } from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Field } from 'formik';
import { Table, Input, Popconfirm, Form, Spin } from 'antd';
import NumberFormat from 'react-number-format';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import { AntInput } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import DateCustom from '@fuse/CustomForm/Date';
import * as moment from 'moment';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import CheckboxAntd from '@fuse/CustomForm/CheckboxAntd';
import RadioAntd from '@fuse/CustomForm/RadioAntd';

export default function FormCustomEdit({ handleClose, saveAsset, initialValue, actionLoading }) {
	const [dataSource, setDataSource] = useState([]);
	const initialState = {
		name: '',
		department: null,
		dateRequest: moment(Date.now()),
		region: '',
		locationUse: '',
		reason: '',
		assetsCategory: '',
		plan: '',
		supplier: ''
	};
	const onInputChange = (key, index) => e => {
		const newData = [...dataSource];
		newData[index][key] = e.target.value;
		setTotal(newData, index);
		setDataSource(newData);
	};
	const setTotal = (data, index) => {
		data[index].totalCount = data[index].count * data[index].bill;
	};
	const columns = [
		{
			dataIndex: 'desc',
			title: 'Mô tả',
			render: (text, record, index) => <Input value={text} onChange={onInputChange('desc', index)} />
		},
		{
			dataIndex: 'count',
			title: 'Số lượng',
			render: (text, record, index) => <Input value={text} onChange={onInputChange('count', index)} />
		},
		{
			dataIndex: 'bill',
			title: 'Đơn giá',
			render: (text, record, index) => <Input value={text} onChange={onInputChange('bill', index)} />
		},
		{
			dataIndex: 'totalCount',
			title: 'Thành tiền',
			render: (text, record, index) => <h4>{currencyFormat(text)}</h4>
		},
		{
			dataIndex: 'totalCount',
			title: 'Thành tiền',
			render: (text, record, index) => (
				<Popconfirm title="Bạn có chắc xóa tài sản không?" onConfirm={() => handleDeleteRow(record.id)}>
					<a>Xóa tài sản</a>
				</Popconfirm>
			)
		}
	];
	const handleAdd = () => {
		const newData = {
			id: dataSource.length + 1,
			desc: '',
			count: 1,
			bill: '',
			totalCount: ''
		};
		setDataSource([...dataSource, newData]);
	};
	const handleDeleteRow = id => {
		const newArr = dataSource.filter(item => item.id !== id);
		setDataSource(newArr);
	};
	const onConfirm = () => {
		console.log(dataSource);
	};
	return (
		<>
			<Formik
				enableReinitialize
				initialValues={initialState}
				onSubmit={values => {
					console.log(dataSource);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin cấp phát tài sản.</h5>
									<span className="border-b-1 mt-3 ml-6 border-fuchsia w-auto sm:w-10/12 h-10" />
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-4 gap-8 ">
									<Field
										label="Nhân viên (*)"
										name="name"
										component={AntInput}
										// options={employees}
										// handleChangeState={onHandleChangeEmployee}
										className="mt-8 mb-16"
									/>
									<Field
										label="Bộ phận (*)"
										name="department"
										value={initialState.department}
										component={SelectAntd}
										// handleChangeState={onChangeDepartment}
										options={[]}
										className="mt-8 mb-16"
									/>
									<Field
										label="Khu vực (*)"
										name="region"
										value={initialState.region}
										component={SelectAntd}
										// handleChangeState={onChangeDepartment}
										options={[]}
										className="mt-8 mb-16"
									/>
									<Field
										label="Ngày yêu cầu (*) "
										autoFocus
										defaultValue={initialState.dateRequest}
										name="date"
										format="DD-MM-YYYY"
										placeholder="Vui lòng chọn ngày yêu cầu"
										component={DateCustom}
										className="mx-4 mb-16"
										hasFeedback
									/>
								</div>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Danh sách tài sản yêu cầu.</h5>
									<span className="border-b-1 mt-3 ml-6 border-fuchsia w-auto sm:w-10/12 h-10" />
								</div>
								<Button onClick={handleAdd} className="mb-16" variant="contained" color="primary">
									{' '}
									<svg
										className="h-16 w-16"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									Thêm tài sản
								</Button>
								<Table
									rowKey="id"
									rowClassName={() => 'editable-row'}
									columns={columns}
									bordered
									dataSource={dataSource}
								/>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Nội dung.</h5>
									<span className="border-b-1 mt-3 ml-6 border-fuchsia w-auto sm:w-11/12 h-10" />
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-1 gap-8 ">
									<Field
										label="Nơi dùng (*)"
										name="locationUse"
										value={initialState.locationUse}
										component={SelectAntd}
										// handleChangeState={onChangeDepartment}
										options={[]}
										className="mt-8"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-1 gap-8 ">
									<Field
										label="Lí do (*)"
										name="reason"
										value={initialState.reason}
										component={InputTextAreaLg}
										// handleChangeState={onChangeDepartment}
										className="mt-8 mb-16"
										row={3}
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16 ">
									<div className="flex flex-col">
										<Field
											label="Loại tài sản (*)"
											name="assetsCategory"
											// value={initialState.assetsCategory}
											component={CheckboxAntd}
											options={[
												{ label: 'Mua mới', value: 'new' },
												{ label: 'Bổ sung thêm', value: 'bosung' }
											]}
											// handleChangeState={onChangeDepartment}
											className="mt-8 mb-16"
										/>
										<Field
											label="Khoản mua sắm này có nằm trong kế hoạch (*)"
											name="plan"
											// value={initialState.assetsCategory}
											component={RadioAntd}
											options={[
												{ label: 'Có', value: true },
												{ label: 'Không', value: false }
											]}
											// handleChangeState={onChangeDepartment}
											className="mt-8 mb-16"
										/>
									</div>
									<Field
										label="Nhà cung cấp đề nghị (nếu có)"
										autoFocus
										// value={intialState.note}
										name="supplier"
										row={3}
										// handleInputChangeNote={handleInputChangeNote}
										component={InputTextAreaLg}
										className="mx-4 mb-16"
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<Button variant="contained" autoFocus onClick={onConfirm} color="primary">
									Gửi yêu cầu
								</Button>
							)}
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
