import CheckboxAntd from '@fuse/CustomForm/CheckboxAntd';
import { AntInput, AntInputNumber } from '@fuse/CustomForm/CreateAntField';
import InputTextArea from '@fuse/CustomForm/InputTextArea';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import SelectAntdMulti from '@fuse/CustomForm/SelectAntdMulti';
import { Button, DialogActions, DialogContent } from '@material-ui/core';
import { Spin } from 'antd';
import { Field, Formik, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export default function FormListUserCustom({ actionLoading, handleCloseFormGroupUser, handleSubmitFormGroupUser }) {
	const initialState = {
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
		inactive: false,
	};
	const validationSchema = Yup.object().shape({
		nameGroup: Yup.string().required('Tên nhóm không được để trống !!!')
	});
	return (
		<>
			<Formik
				enableReinitialize
				// validationSchema={validationSchema}
				initialValues={initialState}
				onSubmit={values => {
					console.log(values);
					// handleSubmitFormGroupUser(values);
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
										className="mt-8 mb-16"
									/>
									<Field
										label="Nhân viên sales"
										name="salesEmployee"
										hasFeedback
										component={SelectAntd}
										options={[]}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Họ & Tên Đệm"
										name="lastMiddleName"
										type="text"
										component={AntInput}
										className="mt-8 mb-16"
									/>
									<Field
										label="Tên"
										name="firstName"
										type="text"
										component={AntInput}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Số điện thoại"
										name="cellPhone"
										type="number"
										component={AntInputNumber}
										className="mt-8 mb-16"
									/>
									<Field
										label="Email"
										name="email"
										type="text"
										component={AntInput}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Nhóm người dùng"
										name="userGroup"
										options={[]}
										component={SelectAntd}
										className="mt-8 mb-16"
									/>
									<Field
										label="Quản lý"
										name="LineManager"
										options={[]}
										component={SelectAntd}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Công ty"
										name="company"
										options={[
											{label:"DTP Education",value:"1"},
											{label:"DTP Cambodia",value:"2"},
											{label:"DTP Laos",value:"3"},
										]}
										component={SelectAntdMulti}
										className="mt-8 mb-16"
									/>
									<Field
										label="Khu vực"
										name="region"
										options={[]}
										component={SelectAntdMulti}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Inactive"
										name="inactive"
										type="text"
										value={initialState.inactive}
										component={CheckboxAntd}
										className="mt-8 mb-16"
									/>
									<Field
										label="Biz line"
										name="bizLine"
										options={[]}
										component={SelectAntdMulti}
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
										{/* {initial.menuID !== '0' ? 'Chỉnh sửa' : 'Thêm mới'} */}
										Thêm mới
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
