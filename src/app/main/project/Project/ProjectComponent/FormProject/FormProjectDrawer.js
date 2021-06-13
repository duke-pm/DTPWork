import { AntInput } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import DateCustom from '@fuse/CustomForm/Date';
import { Divider, Button, DialogActions, DialogContent } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import React from 'react';
import { Spin } from 'antd';
import InputTextArea from '@fuse/CustomForm/InputTextArea';
import * as Yup from 'yup';
import { validateField } from '@fuse/core/DtpConfig';
import * as moment from 'moment';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import FileCustomVersion2Eng from '@fuse/CustomForm/FileCustomVersion2Eng';

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
	prjID: '',
	file: ''
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
						<div className="px-16 sm:px-24">
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
							<div className="grid grid-cols-1 gap-8 mb-16 ">
								<Field
									label="Description"
									name="descr"
									row={4}
									component={InputTextArea}
									className="mx-4"
								/>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-1 gap-8 ">
								<Field
									label="Subtask of"
									name="project"
									width="100%"
									component={SelectAntd}
									options={taskSub}
									className="mx-4"
								/>
							</div>
							<div className="flex justify-between flex-row">
								<h5 className="font-extrabold">PEOPLE AND TIME</h5>
							</div>
							<Divider className="mb-16" />
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Owner"
									name="owner"
									hasFeedback
									component={SelectAntd}
									options={owner}
									className="mx-4"
									position="right"
								/>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 ">
								<Field
									label="Start Date"
									name="startDate"
									width="60%"
									component={DateCustom}
									className="mx-4"
									position="right"
								/>
								<Field
									label="End Date"
									width="60%"
									position="right"
									name="endDate"
									component={DateCustom}
									className="mx-4"
								/>
							</div>
							<div className="flex justify-between flex-row">
								<h5 className="font-extrabold">DETAIL</h5>
							</div>
							<Divider className="mb-16" />
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 ">
								<Field
									label="Grade"
									name="grade"
									width="60%"
									options={gradeGolbal}
									component={SelectAntd}
									position="right"
									className="mx-4"
								/>
								<Field
									label="Component"
									width="60%"
									name="component"
									component={SelectAntd}
									options={ArrTaskComponent}
									className="mx-4"
									position="right"
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Author"
									name="author"
									component={AntInput}
									type="text"
									position="right"
									className="mx-4"
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Origin publisher"
									component={AntInput}
									type="text"
									name="originPublisher"
									position="right"
									className="mx-4"
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Ownership DTP"
									component={AntInput}
									type="text"
									name="ownership"
									position="right"
									className="mx-4"
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Priority"
									name="priority"
									hasFeedback
									component={SelectAntd}
									options={ArrTaskPri}
									position="right"
									className="mx-4"
								/>
							</div>
							{entitiesEdit && entitiesEdit.taskID && (
								<div className="grid grid-cols-1 gap-8">
									<Field
										label="Status"
										name="status"
										position="right"
										component={SelectAntd}
										options={ArrProjectStatus}
										className="mx-4"
									/>
								</div>
							)}
							<div className="flex justify-between flex-row">
								<h5 className="font-extrabold">FILES</h5>
							</div>
							<Divider className="mb-16" />
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label=""
									autoFocus
									style={{ height: '25px' }}
									name="file"
									component={FileCustomVersion2Eng}
									className="mx-4 mb-16"
									variant="outlined"
								/>
							</div>
							<Divider className="mb-16 mt-16" />
						</div>
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
