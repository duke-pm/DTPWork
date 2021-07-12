import React, { useContext, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import * as moment from 'moment';
import { Drawer, AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { ProjectContext } from '../../ProjectContext';
import * as actions from '../../../_redux/_projectActions';
import FormCustomProjectTask from './FormProjectDrawer';
import { badgeText } from '../TableProject/ConfigTableProject';

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
	priority: 'N',
	sectorID: null,
	status: 1,
	taskType: '',
	prjID: '',
	file: '',
	fileEdit: '',
	percentage: '',
	version: '',
	userInvite: [],
	ownerName: ''
};
export default function FormProjectDrawer({
	owner,
	gradeGolbal,
	ArrProjectStatus,
	ArrTaskPri,
	ArrTaskComponent,
	taskSub,
	params,
	classes,
	sectorArr
}) {
	const dispatch = useDispatch();
	const [fileCheck, setFileCheck] = useState(true);
	const [listFile, setListFile] = useState(null);
	const projectContext = useContext(ProjectContext);
	const { formProject, setFormProject, rowPage, page, ownerFilter, status, dateStart, sector, search } =
		projectContext;
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
			priority: 'N',
			sectorID: null,
			status: 1,
			taskType: '',
			prjID: '',
			file: '',
			fileEdit: '',
			percentage: '',
			version: '',
			userInvite: []
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
						notificationConfig(
							'success',
							notificationContent.content.en.success,
							notificationContent.description.project.task.updatedTask
						);
						let str = '';
						if (entitiesEdit.statusID !== values.status)
							str = `${str} *TRẠNG THÁI được thay đổi từ ${badgeText[entitiesEdit.statusID]} đến ${
								badgeText[values.status]
							}.`;
						if (entitiesEdit.percentage !== values.percentage)
							str = `${str} *TIẾN ĐỘ (%) được thay đổi từ ${entitiesEdit.percentage} đến ${values.percentage}.`;
						if (values.startDate !== entitiesEdit.startDate || values.endDate !== entitiesEdit.endDate)
							str = `${str} *THỜI GIAN được thay đổi từ ${moment(entitiesEdit.startDate).format(
								'DD/MM/YYYYY'
							)} - ${moment(entitiesEdit.endDate).format('DD/MM/YYYYY')} đến ${moment(
								values.startDate
							).format('DD/MM/YYYY')} - ${moment(values.endDate).format('DD/MM/YYYY')}.`;
						if (str !== '') dispatch(actions.addTaskActivity(entitiesEdit.taskID, str, 'type'));
						handleCloseFormProject();
						dispatch(
							actions.fetchProjectDetailFilter(
								params.detail,
								rowPage,
								page,
								ownerFilter,
								status,
								dateStart,
								sector,
								search
							)
						);
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
						notificationConfig(
							'success',
							notificationContent.content.en.success,
							notificationContent.description.project.task.createdTask
						);
						handleCloseFormProject();
					}
				});
			}
		} else {
			dispatch(actions.createdTask(values, params.detail, formProject.title)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.project.task.createdTask
					);
					handleCloseFormProject();
				}
			});
		}
	};
	const initialEdit = {
		taskID: entitiesEdit?.taskID,
		taskType: entitiesEdit?.taskTypeID,
		prjID: entitiesEdit?.prjID,
		descr: entitiesEdit?.descr,
		taskName: entitiesEdit?.taskName,
		startDate: entitiesEdit?.startDate,
		endDate: entitiesEdit?.endDate,
		grade: entitiesEdit ? (entitiesEdit.grade === 0 ? null : entitiesEdit.grade) : null,
		author: entitiesEdit?.author,
		owner: entitiesEdit?.owner,
		component: entitiesEdit ? (entitiesEdit.component === 0 ? null : entitiesEdit.component) : null,
		originPublisher: entitiesEdit?.originPublisher,
		ownership: entitiesEdit?.ownershipDTP,
		priority: entitiesEdit?.priority,
		project: entitiesEdit ? (entitiesEdit.parentID === 0 ? null : entitiesEdit.parentID) : null,
		sectorID: entitiesEdit ? (entitiesEdit.sectorID === 0 ? null : entitiesEdit.sectorID) : null,
		status: entitiesEdit?.statusID,
		fileEdit: entitiesEdit?.attachFiles,
		percentage: entitiesEdit?.percentage,
		version: entitiesEdit?.version,
		ownerName: entitiesEdit?.ownerName,
		userInvite: entitiesEdit?.listUserIDInvited ? entitiesEdit.listUserIDInvited.split(',').map(Number) : []
	};
	const userInviteNoPermiss = entitiesEdit?.lstUserInvited
		? entitiesEdit.lstUserInvited?.reduce((arr, curr) => [...arr, curr.fullName], [])
		: [];
	return (
		<Drawer
			className={classes.Drawer}
			anchor="right"
			title={entitiesEdit?.taskID ? formProject.title : `New ${formProject.title}`}
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
						{entitiesEdit?.taskID ? formProject.title : `New ${formProject.title}`}
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomProjectTask
				inititalValues={entitiesEdit?.taskID ? initialEdit : initial}
				owner={owner}
				userInviteNoPermiss={userInviteNoPermiss}
				sectorArr={sectorArr}
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
