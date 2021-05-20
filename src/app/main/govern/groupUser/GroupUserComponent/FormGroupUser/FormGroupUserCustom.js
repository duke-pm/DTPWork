import CheckboxAntd from '@fuse/CustomForm/CheckboxAntd';
import { AntInput } from '@fuse/CustomForm/CreateAntField';
import InputTextArea from '@fuse/CustomForm/InputTextArea';
import { Button, DialogActions, DialogContent } from '@material-ui/core';
import { Spin } from 'antd';
import { Field, Formik, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export default function FormGroupUserCustom({
	actionLoading,
	handleCloseFormGroupUser,
	handleSubmitFormGroupUser,
	entitiesEdit
}) {
	const initial = {
		groupID: '0',
		groupName: '',
		description: '',
		inactive: false
	};
	const validationSchema = Yup.object().shape({
		groupName: Yup.string().required('Tên nhóm không được để trống !!!')
	});
	const initialState = entitiesEdit && entitiesEdit.groupID ? entitiesEdit : initial;
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={validationSchema}
				initialValues={initialState}
				onSubmit={values => {
					handleSubmitFormGroupUser(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent>
							<div className="px-16 sm:px-24">
								<div className="grid grid-cols-1 sm:grid-cols-1 gap-8">
									<Field
										label="Tên nhóm"
										name="groupName"
										type="text"
										hasFeedback
										component={AntInput}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-1 gap-8">
									<Field
										label="Mô tả"
										name="description"
										type="text"
										component={InputTextArea}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-1 gap-8">
									<Field
										label="Inactive"
										name="inactive"
										type="text"
										value={initialState.inactive}
										component={CheckboxAntd}
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
										{initialState.groupID !== '0' ? 'Chỉnh sửa' : 'Thêm mới'}
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
