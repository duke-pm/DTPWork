/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import DateCustom from '@fuse/CustomForm/Date';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import * as moment from 'moment';
import { AntInput } from '@fuse/CustomForm/CreateAntField';
import { Spin } from 'antd';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import { checkValidateForm } from '../ConfigPossessionUnused';
import ContentForm from './ContentForm';

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
	const employees = entitiesInformation?.employees
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
	const department = entitiesInformation?.department
		? entitiesInformation.department.reduce(
				(arr, curr) => [...arr, { value: curr.deptCode, label: curr.deptName }],
				[]
		  )
		: [];
	const regionEmployee = entitiesInformation?.region
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
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin tài sản.</h5>
								</div>
								<ContentForm entitiesEdit={entitiesEdit} />
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin cấp phát tài sản.</h5>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Cấp phát cho"
										name="customer"
										hasFeedback
										component={SelectAntd}
										options={employees}
										handleChangeState={onHandleChangeEmployee}
										className="mt-8 mb-16"
									/>
									<Field
										label="Vị trí công việc"
										readOnly
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
										label="Bộ phận"
										name="department"
										hasFeedback
										readOnly
										value={intialState.department}
										component={SelectAntd}
										handleChangeState={onChangeDepartment}
										options={department}
										className="mt-8 mb-16"
									/>
									<Field
										label="Khu vực"
										readOnly
										hasFeedback
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
											label="Ngày cấp"
											defaultValue={intialState.date}
											name="date"
											hasFeedback
											format="DD-MM-YYYY"
											placeholder="Vui lòng chọn ngày mua"
											component={DateCustom}
											className="mx-4 mb-16"
										/>
										<Field
											label="Lý do cấp phát"
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
										style={{ height: '26.5px' }}
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
								<Button type="submit" className="h-26 font-sans" variant="contained" color="primary">
									Lưu
								</Button>
							)}
							<Button
								onClick={() => handleClose()}
								type="button"
								className="h-26 font-sans"
								variant="contained"
								color="secondary"
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
