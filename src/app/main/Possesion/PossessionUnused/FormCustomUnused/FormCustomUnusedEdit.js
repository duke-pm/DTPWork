/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import Select from '@fuse/CustomForm/Select';
import InputCustom from '@fuse/CustomForm/Input';
import DateCustom from '@fuse/CustomForm/Date';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import * as moment from 'moment';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import { AntSelect, AntInput } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';

export default function FormCustomUnusedEdit({ entitiesEdit, entitiesInformation }) {
	const [arrDepartment, setArrDepartmentDepartment] = useState([]);
	const [intialState, setInitialState] = useState({
		customer: '',
		position: '',
		department: '',
		location: '',
		date: moment(Date.now()),
		file: '',
		note: ''
	});
	const [region, setRegion] = useState([]);
	const employees =
		entitiesInformation && entitiesInformation.employees
			? entitiesInformation.employees.reduce(
					(arr, curr) => [
						...arr,
						{
							value: curr.empCode,
							label: curr.empName,
							deptCode: curr.deptCode,
							jobTitle: curr.jobTitle,
							regionCode: curr.regionCode
						}
					],
					[]
			  )
			: [];
	const department =
		entitiesInformation && entitiesInformation.department
			? entitiesInformation.department.reduce(
					(arr, curr) => [...arr, { value: curr.deptCode, label: curr.deptName }],
					[]
			  )
			: [];
	const regionEmployee =
		entitiesInformation && entitiesInformation.region
			? entitiesInformation.region.reduce(
					(arr, curr) => [...arr, { value: curr.regionCode, label: curr.regionName }],
					[]
			  )
			: [];
	const onHandleChangeEmployee = value => {
		const newDataEmployee = employees.reduce((arr, curr) => (curr.value === value ? curr : arr));
		if (newDataEmployee) {
			setInitialState({
				customer: newDataEmployee.value,
				position: newDataEmployee.jobTitle,
				department: newDataEmployee.deptCode,
				location: newDataEmployee.regionCode
				// date: moment(Date.now()),
				// file: '',
				// note: ''
			});

			const Depar = entitiesInformation.department.reduce((arr, curr) =>
				curr.deptCode === newDataEmployee.deptCode ? { label: curr.deptName, value: curr.deptCode } : arr
			);
			setArrDepartmentDepartment(Depar.value);
		}
	};
	// console.log(initial);
	console.log(arrDepartment);
	return (
		<>
			<Formik
				enableReinitialize
				// validationSchema={checkValidateForm}
				initialValues={intialState}
				onSubmit={values => {
					// saveForm(values);
					console.log(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin tài sản.</h5>
									<span className="border-b-1 mt-3 ml-6 border-fuchsia w-auto sm:w-5/6 h-10" />
								</div>
								<div className=" grid grid-cols-1 sm:grid-cols-2 gap-48">
									<div className="flex-row justify-between flex ">
										<div className="flex flex-col">
											<p className="p-6"> Mã sản phẩm </p>
											<p className="p-6"> Tên sản phẩm </p>
											<p className="p-6"> Nhóm sản phẩm </p>
											<p className="p-6"> Mô tả </p>
										</div>
										<div className="flex sm:mr-96 mr-auto flex-col">
											<p className="p-6 font-extrabold">
												{entitiesEdit && entitiesEdit.assetCode}
											</p>
											<p className="p-6 font-extrabold">
												{entitiesEdit && entitiesEdit.assetName}
											</p>
											<p className="p-6 font-extrabold">
												{entitiesEdit && entitiesEdit.groupName}
											</p>
											<p className="p-6 font-extrabold"> {entitiesEdit && entitiesEdit.descr}</p>
										</div>
									</div>
									<div className="flex-row justify-between flex ">
										<div className="flex flex-col">
											<p className="p-6">Ngày mua </p>
											<p className="p-6"> Nguyên giá </p>
											<p className="p-166"> Tình trạng </p>
										</div>
										<div className="flex sm:mr-96 mr-auto flex-col">
											<p className="p-6 font-extrabold">
												{entitiesEdit && moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY')}
											</p>
											<p className="p-6 font-extrabold">
												{' '}
												{entitiesEdit && currencyFormat(entitiesEdit.originalPrice)}
											</p>
											<p className="p-6 font-extrabold"> Chưa sử dụng </p>
										</div>
									</div>
								</div>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin cấp phát tài sản.</h5>
									<span className="border-b-1 mt-3 ml-6 border-fuchsia w-auto sm:w-9/12 h-10" />
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<Field
										label="Nhân viên được cấp phát (*)"
										name="customer"
										component={AntSelect}
										options={employees}
										handleChangeState={onHandleChangeEmployee}
										className="mt-8 mb-16"
									/>
									<Field
										label="Vị trí công việc (*)"
										autoFocus
										type="text"
										component={AntInput}
										value={intialState.position}
										name="position"
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<Field
										label="Bộ phận (*)"
										name="department"
										value={intialState.department}
										component={AntSelect}
										options={department}
										className="mt-8 mb-16"
									/>
									<Field
										label="khu vực (*)"
										autoFocus
										name="location"
										component={AntSelect}
										value={intialState.location}
										options={regionEmployee}
										className="mx-4 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<Field
										label="Ngày Cấp (*) "
										autoFocus
										defaultValue={intialState.date}
										name="date"
										format="DD-MM-YYYY"
										placeholder="Vui lòng chọn ngày mua"
										component={DateCustom}
										className="mx-4 mb-16"
										hasFeedback
									/>
									<Field
										label="File đính kèm"
										autoFocus
										name="date"
										type="text"
										component={FileCustomVersion2}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
								<div className="grid mb-16 gap-8 ">
									<Field
										label="Lí do phát"
										autoFocus
										name="note"
										row={2}
										component={InputTextAreaLg}
										className="mx-4 mb-16"
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							<Button
								autoFocus
								type="submit"
								className="h-26 font-sans"
								variant="contained"
								color="secondary"
							>
								Lưu
							</Button>
							<Button
								autoFocus
								type="submit"
								className="h-26 font-sans"
								variant="contained"
								color="primary"
							>
								Hủy
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
