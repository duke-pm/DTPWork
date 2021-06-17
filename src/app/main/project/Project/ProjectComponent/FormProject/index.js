import React, { useContext, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import * as moment from 'moment';
import { Drawer, AppBar, IconButton, Toolbar, Typography, SwipeableDrawer } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ProjectContext } from '../../ProjectContext';
import * as actions from '../../../_redux/_projectActions';
import FormCustomProjectTask from './FormProjectDrawer';

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
	file: '',
	fileEdit: '',
	percentage: '',
	version: ''
};
export default function FormProjectDrawer({
	owner,
	gradeGolbal,
	ArrProjectStatus,
	ArrTaskPri,
	ArrTaskComponent,
	taskSub,
	params,
	classes
}) {
	const dispatch = useDispatch();
	const [fileCheck, setFileCheck] = useState(true);
	const [listFile, setListFile] = useState(null);
	const projectContext = useContext(ProjectContext);
	const { formProject, setFormProject } = projectContext;
	const handleCloseFormProject = () => {
		setFormProject({
			open: false,
			title: ''
		});
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
			prjID: '',
			file: '',
			fileEdit: '',
			percentage: '',
			version: ''
		};
		setListFile(null);
		setFileCheck(true);
	};
	const { currentState } = useSelector(
		state => ({
			currentState: state.project
		}),
		shallowEqual
	);
	const { entitiesEdit, actionLoading } = currentState;
	const handleSubmitForm = values => {
		if (entitiesEdit && entitiesEdit.taskID) {
			if (formProject.title === 'Setting task') {
				dispatch(actions.updatedTask(values)).then(data => {
					if (data && !data.isError) {
						notificationConfig('success', 'Success', 'Updated task success');
						handleCloseFormProject();
					}
				});
			} else {
				const TaskType = {
					1: 'Phase',
					2: 'Task',
					3: 'Miltestone'
				};
				dispatch(actions.createdTask(values, params.detail, TaskType[values.taskType])).then(data => {
					if (data && !data.isError) {
						notificationConfig('success', 'Success', 'Created task success');
						handleCloseFormProject();
					}
				});
			}
		} else {
			dispatch(actions.createdTask(values, params.detail, formProject.title)).then(data => {
				if (data && !data.isError) {
					notificationConfig('success', 'Success', 'Created task success');
					handleCloseFormProject();
				}
			});
		}
	};
	const initialEdit = {
		taskID: entitiesEdit && entitiesEdit.taskID,
		taskType: entitiesEdit && entitiesEdit.taskTypeID,
		prjID: entitiesEdit && entitiesEdit.prjID,
		descr: entitiesEdit && entitiesEdit.descr,
		taskName: entitiesEdit && entitiesEdit.taskName,
		startDate: entitiesEdit && entitiesEdit.startDate,
		endDate: entitiesEdit && entitiesEdit.endDate,
		grade: entitiesEdit ? (entitiesEdit.grade === 0 ? null : entitiesEdit.grade) : null,
		author: entitiesEdit && entitiesEdit.author,
		owner: entitiesEdit && entitiesEdit.owner,
		component: entitiesEdit ? (entitiesEdit.component === 0 ? null : entitiesEdit.component) : null,
		originPublisher: entitiesEdit && entitiesEdit.originPublisher,
		ownership: entitiesEdit && entitiesEdit.ownershipDTP,
		priority: entitiesEdit && entitiesEdit.priority,
		project: entitiesEdit ? (entitiesEdit.parentID === 0 ? null : entitiesEdit.parentID) : null,
		status: entitiesEdit && entitiesEdit.statusID,
		fileEdit: entitiesEdit && entitiesEdit.attachFiles,
		percentage: entitiesEdit && entitiesEdit.percentage,
		version: entitiesEdit && entitiesEdit.version
	};
	return (
		<Drawer
			className={classes.Drawer}
			anchor="right"
			title={entitiesEdit && entitiesEdit.taskID ? formProject.title : `New ${formProject.title}`}
			onClose={handleCloseFormProject}
			open={formProject.open}
			classes={{ paper: classes.DrawerFormInput }}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleCloseFormProject} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						{entitiesEdit && entitiesEdit.taskID ? formProject.title : `New ${formProject.title}`}
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomProjectTask
				inititalValues={entitiesEdit && entitiesEdit.taskID ? initialEdit : initial}
				owner={owner}
				listFile={listFile}
				setListFile={setListFile}
				entitiesEdit={entitiesEdit}
				fileCheck={fileCheck}
				setFileCheck={setFileCheck}
				gradeGolbal={gradeGolbal}
				taskSub={taskSub}
				ArrTaskComponent={ArrTaskComponent}
				ArrProjectStatus={ArrProjectStatus}
				ArrTaskPri={ArrTaskPri}
				actionLoading={actionLoading}
				formProject={formProject}
				handleSubmitForm={handleSubmitForm}
				handleCloseFormProject={handleCloseFormProject}
			/>
		</Drawer>
	);
}
