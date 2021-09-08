// import { AntInput } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import { Button, DialogActions, DialogContent, Divider, Typography } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import React from 'react';

export default function FormLevelApprovalCustom({ handleCloseForm }) {
	const initial = {
		id: '',
		group: null,
		role: null,
		level: [
			{ level: 1, name: '', value: '' },
			{ level: 2, name: '', value: '' }
		]
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
								<div className="flex justify-between flex-row">
									<Typography variant="subtitle2">Quyền </Typography>
								</div>
								<Divider className="mb-32" />
								<div className="grid grid-cols-2 gap-8">
									<Field
										position="right"
										hasFeedback
										label="Nhóm"
										name="group"
										options={[]}
										component={SelectAntd}
									/>
									<Field
										position="right"
										label="Quyền"
										name="role"
										options={[]}
										component={SelectAntd}
									/>
								</div>
								<div className="flex justify-between flex-row">
									<Typography variant="subtitle2">Cấp độ chi tiết </Typography>
								</div>
								<Divider className="mb-32" />
								<div className="grid grid-cols-2 gap-8">
									<Field
										hasFeedback
										position="right"
										label="Cấp 1"
										name="level[0].name"
										options={[]}
										component={SelectAntd}
									/>
									<Field name="level[0].value" component={SelectAntd} options={[]} />
								</div>
								<div className="grid grid-cols-2 gap-8">
									<Field
										position="right"
										label="Cấp 2"
										name="level[1].name"
										options={[]}
										component={SelectAntd}
									/>
									<Field name="level[1].value" component={SelectAntd} options={[]} />
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
