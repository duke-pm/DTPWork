import { validateField } from '@fuse/core/DtpConfig';
import CheckboxAntd from '@fuse/CustomForm/CheckboxAntd';
import { AntInput, AntInputNumber } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import SelectAntdMulti from '@fuse/CustomForm/SelectAntdMulti';
import { Button, DialogActions, DialogContent } from '@material-ui/core';
import { Spin } from 'antd';
import { Field, Formik, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export default function FormListUserCustom({
	actionLoading,
	handleCloseFormGroupUser,
	handleSubmitFormListUser,
	arrCompany,
	arrSales,
	arrManag,
	arrSap,
	arrRegion,
	groupUser,
	arrBizLine,
	entitiesEdit
}) {
	let initialState = {
		userID: '0',
		userName: '',
		lastMiddleName: '',
		salesEmployee: '',
		firstName: '',
		cellPhone: '',
		email: '',
		userGroup: '',
		LineManager: '',
		company: [],
		region: [],
		bizLine: [],
		empSAP: '',
		inactive: false,
		ischangePasswrod: false
	};
	if (entitiesEdit && entitiesEdit.userID) {
		initialState = {
			userID: entitiesEdit && entitiesEdit.userID,
			userName: entitiesEdit && entitiesEdit.userName,
			lastMiddleName: entitiesEdit && entitiesEdit.lastName,
			salesEmployee: entitiesEdit && entitiesEdit.slpCode === -1 ? '' : entitiesEdit.slpCode,
			firstName: entitiesEdit && entitiesEdit.firstName,
			cellPhone: entitiesEdit && entitiesEdit.cellPhone,
			email: entitiesEdit && entitiesEdit.email,
			userGroup: entitiesEdit && entitiesEdit.groupID,
			LineManager: entitiesEdit && entitiesEdit.lineManager === -1 ? '' : entitiesEdit.lineManager,
			company: entitiesEdit && entitiesEdit.legal ? entitiesEdit.legal.split(',').map(Number) : [],
			region: entitiesEdit && entitiesEdit.region ? entitiesEdit.region.split(',').map(Number) : [],
			bizLine: entitiesEdit && entitiesEdit.bizLine ? entitiesEdit.bizLine.split(',').map(Number) : [],
			empSAP: entitiesEdit && entitiesEdit.empCode,
			inactive: entitiesEdit && entitiesEdit.inactive,
			ischangePasswrod: entitiesEdit && entitiesEdit.isChange
		};
	}
	const validationSchema = Yup.object().shape({
		userName: Yup.string().required(`${validateField}`),
		email: Yup.string().required(`${validateField}`),
		lastMiddleName: Yup.string().required(`${validateField}`),
		firstName: Yup.string().required(`${validateField}`),
		userGroup: Yup.string().required(`${validateField}`),
		company: Yup.array().min(1, `${validateField}`),
		region: Yup.array().min(1, `${validateField}`),
		bizLine: Yup.array().min(1, `${validateField}`)
	});

	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={validationSchema}
				initialValues={initialState}
				onSubmit={values => {
					handleSubmitFormListUser(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent>
							<div className="px-16 sm:px-24">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Tài khoản"
										name="userName"
										type="text"
										hasFeedback
										component={AntInput}
										// handleOnChangeBlur={handleOnChange}
										className="mt-8 mb-16"
									/>
									<Field
										label="Email"
										name="email"
										type="text"
										hasFeedback
										component={AntInput}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Họ & Tên Đệm"
										name="lastMiddleName"
										type="text"
										hasFeedback
										component={AntInput}
										className="mt-8 mb-16"
									/>
									<Field
										label="Tên"
										name="firstName"
										type="text"
										hasFeedback
										component={AntInput}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Số điện thoại"
										name="cellPhone"
										// type="number"
										component={AntInputNumber}
										className="mt-8 mb-16"
									/>
									<Field
										label="Nhân viên sales"
										name="salesEmployee"
										component={SelectAntd || []}
										options={arrSales}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Nhóm người dùng"
										name="userGroup"
										hasFeedback
										options={groupUser}
										component={SelectAntd || []}
										className="mt-8 mb-16"
									/>
									<Field
										label="Quản lý"
										name="LineManager"
										options={arrManag}
										component={SelectAntd || []}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 1 sm:grid-cols-1 gap-8">
									<Field
										label="Công ty"
										name="company"
										hasFeedback
										options={arrCompany}
										component={SelectAntdMulti || []}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Khu vực"
										hasFeedback
										name="region"
										options={arrRegion}
										component={SelectAntdMulti || []}
										className="mt-8 mb-16"
									/>
									<Field
										label="Nhân viên SAP"
										name="empSAP"
										options={arrSap}
										component={SelectAntd || []}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<div className="flex flex-col">
										<Field
											label="Is change password"
											name="ischangePasswrod"
											value={initialState.ischangePasswrod}
											component={CheckboxAntd}
										/>
										<Field
											label="Inactive"
											name="inactive"
											type="text"
											value={initialState.inactive}
											component={CheckboxAntd}
											// className="mt-8"
										/>
									</div>

									<Field
										label="Biz line"
										hasFeedback
										name="bizLine"
										options={arrBizLine}
										component={SelectAntdMulti || []}
										className="mt-8 mb-16"
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<>
									<Button variant="contained" type="submit" color="primary">
										{initialState.userID !== '0' ? 'Chỉnh sửa' : 'Thêm mới'}
									</Button>
									<Button
										onClick={handleCloseFormGroupUser}
										variant="contained"
										type="button"
										color="secondary"
									>
										Huỷ
									</Button>
								</>
							)}
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
