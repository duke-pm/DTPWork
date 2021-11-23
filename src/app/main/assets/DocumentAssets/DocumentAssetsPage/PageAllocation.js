/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Button, Icon } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Spin, Tooltip } from 'antd';
import { useHistory } from 'react-router';
import Text from 'app/components/Text';
import { Field, Form, Formik } from 'formik';
import * as moment from 'moment';
import * as actions from '../../Possesion/_redux/possesionActions';
import { checkValidateForm } from '../../Possesion/PossessionUnused/ConfigPossessionUnused';
import ContentForm from '../../Possesion/PossessionUnused/FormCustomUnused/ContentForm';
import AntSelectCustom from '../../../../../@fuse/FormBookingCustom/AntSelectCustom';
import AntInputCustom from '../../../../../@fuse/FormBookingCustom/AntInputCustom';
import AntDateCustom from '../../../../../@fuse/FormBookingCustom/AntDateCustom';
import AntDescriptionsCustom from '../../../../../@fuse/FormBookingCustom/AntDescriptionsCustom';
import AntFileCustom from '../../../../../@fuse/FormBookingCustom/AntFileCustom';

export default function PageAllocation() {
	const dispatch = useDispatch();
	const history = useHistory();
	const ExitPage = () => history.goBack();
	const params = 'Region,Department,Employee,Supplier,Company,AssetType,AssetGroup,AssetGroupDetail';
	useEffect(() => {
		dispatch(actions.getInformationCompany(params));
	}, [dispatch]);
	const { entitiesEdit, actionLoading, entitiesInformation, listloading } = useSelector(
		state => ({
			entitiesEdit: state.documentAsset.entitiesEdit,
			actionLoading: state.documentAsset.actionLoading,
			listloading: state.documentAsset.listloading,
			entitiesInformation: state.possesion.entitiesInformation
		}),
		shallowEqual
	);
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
	useEffect(() => {
		if (entitiesEdit) {
			setInitialState({
				customer: entitiesEdit?.empCode,
				position: entitiesEdit?.jobTitle,
				department: entitiesEdit?.deptCode,
				location: entitiesEdit?.regionCode,
				date: entitiesEdit?.transDate,
				file: entitiesEdit?.attachFiles,
				note: entitiesEdit?.reasons
			});
		} else {
			history.goBack();
		}
	}, [entitiesEdit, history]);
	// const ExportExcel = assetID => {
	// 	const token = getToken();
	// 	const dataReq = {
	// 		UserToken: token,
	// 		AssetID: assetID
	// 	};
	// 	window.location = `${URL}/api/RQAsset/ExportAllocation?value=${JSON.stringify(dataReq)}`;
	// };
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
	const handleClose = () => history.goBack();
	return (
		<div className="container assets">
			<div className="assets__header px-16 shadow-lg">
				<Text color="primary" type="title">
					Cấp phát tài sản
				</Text>
				<div className="assets__header--action">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="assets__content mt-8">
				<Spin spinning={listloading}>
					<div className="assets__form">
						<Formik enableReinitialize validationSchema={checkValidateForm} initialValues={intialState}>
							{({ handleSubmit, isSubmitting }) => (
								<Form>
									<div className="mb-20">
										<div>
											<Text type="subTitle" color="primary" borderBottom>
												THÔNG TIN TÀI SẢN
											</Text>
										</div>
										<ContentForm entitiesEdit={entitiesEdit} />
									</div>
									<div>
										<div>
											<Text type="subTitle" color="primary" borderBottom>
												THÔNG TIN CẤP PHÁT TÀI SẢN
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
												component={AntSelectCustom}
												options={department}
											/>
											<Field
												label="Khu vực"
												readOnly
												hasFeedback
												name="location"
												component={AntSelectCustom}
												options={regionEmployee}
											/>
										</div>
										<div className="grid grid-cols-2">
											<Field
												label="Ngày cấp"
												name="date"
												format="DD/MM/YYYY"
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
												component={AntDescriptionsCustom}
											/>
											<Field label="File đính kèm" name="file" component={AntFileCustom} />
										</div>
									</div>
									<div className="flex justify-end">
										<Button
											onClick={handleClose}
											type="button"
											variant="contained"
											color="secondary"
										>
											<Text type="button">Quay lại</Text>
										</Button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</Spin>
			</div>
		</div>
	);
}
