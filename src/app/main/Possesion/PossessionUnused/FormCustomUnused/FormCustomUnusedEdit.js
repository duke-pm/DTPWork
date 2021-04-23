/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
// import Select from '@fuse/CustomForm/Select';
// import InputCustom from '@fuse/CustomForm/Input';
import DateCustom from '@fuse/CustomForm/Date';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import * as moment from 'moment';
import * as Yup from 'yup';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import { AntInput } from '@fuse/CustomForm/CreateAntField';
import { Spin } from 'antd';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
// import SelectAntd from '@fuse/CustomForm/SelectAntd';

export default function FormCustomUnusedEdit({
	entitiesEdit,
	entitiesInformation,
	saveAddAsset,
	actionLoading,
	handleClose
}) {
	const [intialState, setInitialState] = useState({
		customer: '',
		position: '',
		department: '',
		location: '',
		date: moment(Date.now()),
		file: '',
		note: ''
	});
	const checkValidateForm = Yup.object().shape({
		customer: Yup.string().required('Nhân viên không được để trống'),
		department: Yup.string().required('Bộ phận không được để trống').nullable(),
		location: Yup.string().required('Khu vực không được để trống')
	});
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
				...intialState,
				customer: newDataEmployee.value,
				position: newDataEmployee.jobTitle,
				department: newDataEmployee.deptCode,
				location: newDataEmployee.regionCode,
				date: moment(Date.now()),
				file: '',
				note: ''
			});
		}
	};
	// console.log(initial);
	const onChangeDepartment = value => {
		setInitialState({
			...intialState,
			department: value
		});
	};
	const onChangeRegion = value => {
		setInitialState({
			...intialState,
			location: value
		});
	};
	const handleInputChangeNote = e => {
		setInitialState({
			...intialState,
			note: e.target.value
		});
	};
	const handleChangeImage = file => {
		setInitialState({
			...intialState,
			file
		});
	};
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={checkValidateForm}
				initialValues={intialState}
				onSubmit={values => {
					saveAddAsset(values);
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
											<p className="p-6"> Mã tài sản </p>
											<p className="p-6"> Tên tài sản </p>
											<p className="p-6"> Nhóm tài sản </p>
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
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Nhân viên được cấp phát (*)"
										name="customer"
										component={SelectAntd}
										options={employees}
										handleChangeState={onHandleChangeEmployee}
										className="mt-8 mb-16"
									/>
									<Field
										label="Vị trí công việc"
										autoFocus
										type="text"
										// value={intialState.position}
										name="position"
										// handleInputChange={handleInputChangePostion}
										component={AntInput}
										className="mx-4 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Bộ phận (*)"
										name="department"
										value={intialState.department}
										component={SelectAntd}
										handleChangeState={onChangeDepartment}
										options={department}
										className="mt-8 mb-16"
									/>
									<Field
										label="khu vực (*)"
										autoFocus
										name="location"
										component={SelectAntd}
										value={intialState.location}
										options={regionEmployee}
										handleChangeState={onChangeRegion}
										className="mx-4 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<div className="flex flex-col">
										<Field
											label="Ngày Cấp (*) "
											defaultValue={intialState.date}
											name="date"
											format="DD-MM-YYYY"
											placeholder="Vui lòng chọn ngày mua"
											component={DateCustom}
											className="mx-4 mb-16"
											hasFeedback
										/>
										<Field
											label="Lí do phát"
											// value={intialState.note}
											name="note"
											row={3}
											handleInputChangeNote={handleInputChangeNote}
											component={InputTextAreaLg}
											className="mx-4 mb-16"
										/>
									</div>
									<Field
										label="File đính kèm"
										name="file"
										style={{ height: '35.5px' }}
										component={FileCustomVersion2}
										className="mx-4 mb-16"
										handleChangeImage={handleChangeImage}
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<Button type="submit" className="h-26 font-sans" variant="contained" color="secondary">
									Lưu
								</Button>
							)}
							<Button
								onClick={() => handleClose()}
								type="button"
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
