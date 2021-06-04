import { AntInput } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import CheckboxAntd from '@fuse/CustomForm/CheckboxAntd';
import SelectAntdMulti from '@fuse/CustomForm/SelectAntdMulti';
import { Button, DialogActions, DialogContent } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import React from 'react';
import { Spin } from 'antd';
import InputTextArea from '@fuse/CustomForm/InputTextArea';
import * as Yup from 'yup';
import { validateField } from '@fuse/core/DtpConfig';
import DateRanger from '@fuse/CustomForm/DateRanger';

export default function FormCustomProject({ actionLoading, handleCloseFormProject, handleSubmitForm }) {
	const initial = {
		descr: '',
		grade: '',
		author: '',
		assign: [],
		component: null,
		originPublisher: '',
		ownership: 0,
		date: [],
		project: null,
		priority: null
	};
	const validateSchema = Yup.object().shape({
		prjName: Yup.string().required(`${validateField}`)
	});
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={validateSchema}
				initialValues={initial}
				onSubmit={values => {
					handleSubmitForm(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent>
							<div className="px-16 sm:px-24">
								<div className="grid grid-cols-1 mb-8 gap-8 ">
									<Field
										label="Description"
										name="descr"
										row={4}
										component={InputTextArea}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Grade"
										hasFeedback
										type="text"
										name="grade"
										component={AntInput}
										className="mx-4"
									/>
									<Field
										label="Author"
										name="author"
										component={AntInput}
										type="text"
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Assignee"
										name="assign"
										component={SelectAntdMulti}
										options={[]}
										className="mx-4"
									/>
									<Field
										label="Component"
										name="component"
										component={SelectAntd}
										options={[]}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Origin publisher"
										component={AntInput}
										type="text"
										name="originPublisher"
										className="mx-4"
									/>
									<Field
										label="Ownership DTP"
										component={AntInput}
										type="number"
										name="ownership"
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field label="Date" name="date" component={DateRanger} className="mx-4" />
									<Field
										label="Project"
										name="project"
										component={SelectAntd}
										options={[]}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Priority"
										name="priority"
										component={SelectAntd}
										options={[]}
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
									Created
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
