import { AntInput } from '@fuse/CustomForm/CreateAntField';
import { Button, DialogActions, DialogContent, Divider } from '@material-ui/core';
import Form from 'antd/lib/form/Form';
import { Field, Formik } from 'formik';
import React from 'react';

export default function FormLineCustom({ handleCloseForm }) {
	const initial = {
		id: '',
		code: '',
		roleName: '',
		description: ''
	};
	const handleSubmitForm = values => {
		console.log(values);
	};
	return (
		<>
			<Formik
				enableReinitialize
				initialValues={initial}
				onSubmit={values => {
					handleSubmitForm(values);
				}}
			>
				{({ handleSubmit, isSubmit }) => (
					<Form>
						<DialogContent>
							<div className="px-16 sm:px-24">
								<div className="grid grid-cols-1 gap-8">
									<Field hasFeedback label="Code" name="code" type="text" component={AntInput} />
								</div>
								<div className="grid grid-cols-1 gap-8">
									<Field
										hasFeedback
										label="Tên mã"
										name="codeName"
										type="text"
										component={AntInput}
									/>
								</div>
								<div className="grid grid-cols-1 gap-8">
									<Field
										hasFeedback
										label="Mô tả"
										name="description"
										type="text"
										component={AntInput}
									/>
								</div>
							</div>
						</DialogContent>
						<Divider />

						<DialogActions>
							<Button type="submit" className="h-26" variant="contained" color="primary">
								<span>Tạo mới</span>
							</Button>

							<Button
								onClick={handleCloseForm}
								type="button"
								className="h-26"
								variant="contained"
								color="secondary"
							>
								<span>Huỷ</span>
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
