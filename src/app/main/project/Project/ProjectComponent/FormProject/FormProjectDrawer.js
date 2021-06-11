import { AntInput } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import DateCustom from '@fuse/CustomForm/Date';
import { Button, DialogActions, DialogContent } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import React from 'react';
import { Spin } from 'antd';
import InputTextArea from '@fuse/CustomForm/InputTextArea';
import * as Yup from 'yup';
import { validateField } from '@fuse/core/DtpConfig';
import * as moment from 'moment';

let initial = {
	TaskID: '',
	descr: '',
	taskName: '',
	startDate: moment(),
	endDate: moment(),
	grade: null,
	author: '',
	owner: null,
	component: null,
	originPublisher: '',
	ownership: '',
	project: null,
	priority: null,
	status: 1,
	taskType: '',
	prjID: ''
};
export default function FormCustomProjectTask({
	actionLoading,
	handleCloseFormProject,
	handleSubmitForm,
	owner,
	gradeGolbal,
	ArrProjectStatus,
	ArrTaskPri,
	ArrTaskComponent,
	taskSub,
	entitiesEdit
}) {
	if (entitiesEdit && entitiesEdit.taskID) {
		initial = {
			taskID: entitiesEdit && entitiesEdit.taskID,
			taskType: entitiesEdit && entitiesEdit.taskTypeID,
			prjID: entitiesEdit && entitiesEdit.prjID,
			descr: entitiesEdit && entitiesEdit.descr,
			taskName: entitiesEdit && entitiesEdit.taskName,
			startDate: entitiesEdit && entitiesEdit.startDate,
			endDate: entitiesEdit && entitiesEdit.endDate,
			grade: entitiesEdit && entitiesEdit.grade === 0 ? null : entitiesEdit.grade,
			author: entitiesEdit && entitiesEdit.author,
			owner: entitiesEdit && entitiesEdit.owner,
			component: entitiesEdit && entitiesEdit.component === 0 ? null : entitiesEdit.component,
			originPublisher: entitiesEdit && entitiesEdit.originPublisher,
			ownership: entitiesEdit && entitiesEdit.ownershipDTP,
			priority: entitiesEdit && entitiesEdit.priority,
			project: entitiesEdit && entitiesEdit.parentID === 0 ? null : entitiesEdit.parentID,
			status: entitiesEdit && entitiesEdit.statusID
		};
	} else {
		initial = {
			TaskID: '',
			descr: '',
			taskName: '',
			startDate: moment(),
			endDate: moment(),
			grade: null,
			author: '',
			owner: null,
			component: null,
			originPublisher: '',
			ownership: '',
			project: null,
			priority: null,
			status: 1,
			taskType: '',
			prjID: ''
		};
	}
	const validateSchema = Yup.object().shape({
		taskName: Yup.string().required(`${validateField}`),
		owner: Yup.string().required(`${validateField}`).nullable(),
		priority: Yup.string().required(`${validateField}`).nullable()
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
								<div className="grid grid-cols-1 gap-8 mb-16 ">
									<Field
										label="Description"
										name="descr"
										row={4}
										component={InputTextArea}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 gap-8 ">
									<Field
										label="Task name"
										name="taskName"
										type="text"
										hasFeedback
										component={AntInput}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Grade"
										name="grade"
										options={gradeGolbal}
										component={SelectAntd}
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
										label="Owner"
										name="owner"
										hasFeedback
										component={SelectAntd}
										options={owner}
										className="mx-4"
									/>
									<Field
										label="Component"
										name="component"
										component={SelectAntd}
										options={ArrTaskComponent}
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
										type="text"
										name="ownership"
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-1 gap-8 ">
									<Field
										label="Project"
										name="project"
										component={SelectAntd}
										options={taskSub}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Start Date"
										name="startDate"
										component={DateCustom}
										className="mx-4"
									/>
									<Field label="End Date" name="endDate" component={DateCustom} className="mx-4" />
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Priority"
										name="priority"
										hasFeedback
										component={SelectAntd}
										options={ArrTaskPri}
										className="mx-4"
									/>
									<Field
										label="Status"
										name="status"
										component={SelectAntd}
										options={ArrProjectStatus}
										className="mx-4"
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin />
							) : entitiesEdit && entitiesEdit.taskID ? (
								<Button
									disabled={!entitiesEdit.isModified}
									type="submit"
									className="h-26 font-sans"
									variant="contained"
									color="primary"
								>
									Save
								</Button>
							) : (
								<Button type="submit" className="h-26 font-sans" variant="contained" color="primary">
									Save
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