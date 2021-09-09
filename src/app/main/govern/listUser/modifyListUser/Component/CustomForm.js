import { validateField, validateFieldEN } from '@fuse/core/DtpConfig';
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
import AntdCustomCheckbox from '@fuse/FormBookingCustom/AntdCustomCheckbox';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntSelectCustom from '@fuse/FormBookingCustom/AntSelectCustom';
import AntSelectMultiCustom from '@fuse/FormBookingCustom/AntSelectMultiCustom';
import { Button, Typography } from '@material-ui/core';
import { Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export default function CustomForm({
	actionLoading,
	handleCloseFormListUser,
	handleSubmitFormListUser,
	entitiesEdit,
	arrCompany,
	arrSales,
	arrManag,
	arrSap,
	arrRegion,
	groupUser,
	arrBizLine
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
	return (
		<Formik
			validationSchema={validationSchema}
			enableReinitialize
			initialValues={initialState}
			onSubmit={values => {
				handleSubmitFormListUser(values);
			}}
		>
			{({ handleSubmit, isSubmitting }) => (
				<Form>
					<div className="mt-8 px-16 sm:px-24">
						<div>
							<Field label="Tên đăng nhập" name="userName" hasFeedback component={AntInputCustom} />{' '}
						</div>
						<div>
							<Field
								label="Nhân viên Sales"
								name="salesEmployee"
								options={arrSales}
								component={AntSelectCustom}
							/>
						</div>
						<div>
							<Field label="Họ & tên đệm" name="lastMiddleName" hasFeedback component={AntInputCustom} />
						</div>
						<div>
							<Field label="Tên" name="firstName" hasFeedback component={AntInputCustom} />
						</div>
						<div>
							<Field
								label="Điện thoại"
								name="cellPhone"
								type="number"
								hasFeedback
								component={AntInputCustom}
							/>
						</div>
						<div>
							<Field label="Email" name="email" hasFeedback component={AntInputCustom} />
						</div>
						<div>
							<Field
								label="Nhóm người dùng"
								name="userGroup"
								options={groupUser}
								hasFeedback
								component={AntSelectCustom}
							/>
						</div>
						<div>
							<Field
								label="Quản lý trực tiếp"
								name="LineManager"
								options={arrManag}
								hasFeedback
								component={AntSelectCustom}
							/>
						</div>
						<div>
							<Field
								label="Công ty"
								name="company"
								options={arrCompany}
								hasFeedback
								component={AntSelectMultiCustom}
							/>
						</div>
						<div>
							<Field
								label="Biz Line"
								name="bizLine"
								options={arrBizLine}
								hasFeedback
								component={AntSelectMultiCustom}
							/>
						</div>
						<div>
							<Field
								label="Khu vực"
								name="region"
								options={arrRegion}
								hasFeedback
								component={AntSelectMultiCustom}
							/>
						</div>
						<div>
							<Field
								label="Mã nhân viên"
								name="empSAP"
								options={arrSap}
								hasFeedback
								component={AntSelectCustom}
							/>
						</div>
						<div>
							<Field
								label="Inactive"
								name="inactive"
								top="10px"
								position="right"
								value={initialState.isPublic}
								component={AntdCustomCheckbox}
							/>
						</div>
						<div>
							<Field
								label="Người dùng phải thay đổi mật khẩu ở lần đăng nhập tiếp theo"
								name="ischangePasswrod"
								top="10px"
								position="right"
								value={initialState.ischangePasswrod}
								component={AntdCustomCheckbox}
							/>
						</div>
					</div>
					<div className="flex items-center justify-end">
						{actionLoading ? (
							<Spin className="ml-20" />
						) : (
							<Button type="submit" className="button__cancle mr-8" variant="contained" color="primary">
								{' '}
								<Typography variant="body2"> Save </Typography>
							</Button>
						)}
						<Button
							onClick={handleCloseFormListUser}
							className="button__cancle mr-8"
							variant="contained"
							color="secondary"
						>
							<Typography variant="body2"> Cancle </Typography>
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
