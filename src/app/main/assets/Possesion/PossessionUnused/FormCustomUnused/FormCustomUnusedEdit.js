/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import * as moment from 'moment';
import { Spin } from 'antd';
import AntSelectCustom from '@fuse/FormBookingCustom/AntSelectCustom';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntFileCustom from '@fuse/FormBookingCustom/AntFileCustom';
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import Text from 'app/components/Text';
import ContentForm from './ContentForm';
import { checkValidateForm } from '../ConfigPossessionUnused';

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
						<div className="mb-20">
							<div>
								<Text type="subTitle" color="primary" borderBottom>
									THÔNG TIN TÀI SẢN.
								</Text>
							</div>
							<ContentForm entitiesEdit={entitiesEdit} />
						</div>
						<div>
							<div>
								<Text type="subTitle" color="primary" borderBottom>
									THÔNG TIN CẤP PHÁT TÀI SẢN.
								</Text>
							</div>
							<div className="grid lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-8 ">
								<Field
									label="Cấp phát cho"
									name="customer"
									hasFeedback
									component={AntSelectCustom}
									options={employees}
									handleChangeState={onHandleChangeEmployee}
								/>
								<Field
									label="Vị trí công việc"
									readOnly
									// value={intialState.position}
									name="position"
									// handleInputChange={handleInputChangePostion}
									component={AntInputCustom}
								/>
							</div>
							<div className="grid lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-8 ">
								<Field
									label="Bộ phận"
									name="department"
									hasFeedback
									readOnly
									value={intialState.department}
									component={AntSelectCustom}
									handleChangeState={onChangeDepartment}
									options={department}
								/>
								<Field
									label="Khu vực"
									readOnly
									hasFeedback
									name="location"
									component={AntSelectCustom}
									value={intialState.location}
									options={regionEmployee}
									handleChangeState={onChangeRegion}
								/>
							</div>
							<div className="grid grid-cols-2">
								<Field
									label="Ngày cấp"
									defaultValue={intialState.date}
									name="date"
									hasFeedback
									format="DD-MM-YYYY"
									placeholder="Vui lòng chọn ngày mua"
									component={AntDateCustom}
								/>
							</div>
							<div className="grid lg:grid-cols-1 gap-8 ">
								<Field
									label="Lý do cấp phát"
									// value={intialState.note}
									name="note"
									row={3}
									handleInputChangeNote={handleInputChangeNote}
									component={AntDescriptionsCustom}
								/>
								<Field
									label="File đính kèm"
									name="file"
									component={AntFileCustom}
									handleChangeImage={handleChangeImage}
								/>
							</div>
						</div>
						<div className="flex justify-end">
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<Button type="submit" className="mr-8" variant="contained" color="primary">
									<Typography variant="button">Lưu</Typography>
								</Button>
							)}
							<Button onClick={handleClose} type="button" variant="contained" color="secondary">
								<Typography variant="button">Hủy</Typography>
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
