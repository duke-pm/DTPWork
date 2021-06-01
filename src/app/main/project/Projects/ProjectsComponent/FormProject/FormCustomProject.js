import { AntInput } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import CheckboxAntd from '@fuse/CustomForm/CheckboxAntd';
import InputTinyCustom from '@fuse/CustomForm/InputTinyCustom';
import { Button, DialogActions, DialogContent } from '@material-ui/core';
import Form from 'antd/lib/form/Form';
import { Field, Formik } from 'formik';
import React from 'react';
import { Spin } from 'antd';

export default function FormCustomProject({ actionLoading, handleCloseFormProject, entitiesEdit }) {
	const initial = {
		name: '',
		sector: null,
		subProject: null,
		owner: null,
		public: false,
		description: '',
		status: false
	};
	const initialState = entitiesEdit && entitiesEdit.key ? entitiesEdit : initial;
	return (
		<>
			<Formik
				enableReinitialize
				initialValues={initialState}
				onSubmit={values => {
					console.log(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent>
							<div className="px-16 sm:px-24">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Name project"
										hasFeedback
										type="text"
										name="name"
										component={AntInput}
										className="mx-4"
									/>
									<Field
										label="Sector"
										name="sector"
										component={SelectAntd}
										options={[]}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="SubProject of"
										name="subProject"
										component={SelectAntd}
										options={[]}
										className="mx-4"
									/>
									<Field
										label="Owner"
										name="owner"
										component={SelectAntd}
										options={[]}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Public"
										hasFeedback
										name="public"
										component={CheckboxAntd}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Status"
										hasFeedback
										readOnly
										name="status"
										component={CheckboxAntd}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 gap-8 ">
									<Field
										label="Description"
										hasFeedback
										name="description"
										component={InputTinyCustom}
										className="mx-4"
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin />
							) : (
								<Button type="submit" className="h-26 font-sans" variant="contained" color="primary">
									Create
								</Button>
							)}

							<Button
								onClick={handleCloseFormProject}
								type="button"
								className="h-26 font-sans"
								variant="contained"
								color="secondary"
							>
								Cancle
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
