import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { useParams, useHistory } from 'react-router';
import moment from 'moment';
import CustomForm from './CustomForm';
import * as actions from '../../../_redux/_projectActions';
import { badgeText } from '../../ProjectComponent/TableProject/ConfigTableProject';

export default function FormComponent({
	owner,
	ArrProjectStatus,
	role,
	taskSub,
	sectorArr,
	ArrTaskPri,
	ArrTaskComponent,
	gradeGolbal
}) {
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
	const { currentState } = useSelector(
		state => ({
			currentState: state.project
		}),
		shallowEqual
	);
	const { entitiesEdit, actionLoading } = currentState;
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
	const history = useHistory();
	const params = useParams();
	const [fileCheck, setFileCheck] = useState(true);
	const [listFile, setListFile] = useState(null);
	const handleCancle = () => history.goBack();
	useEffect(() => {
		if (params.category === 'settingtask' && !entitiesEdit) {
			history.goBack();
		} else if (params.category === 'newtask' && !entitiesEdit) {
			history.goBack();
		}
	}, [params.category, entitiesEdit, history]);
	const handleCloseFormProject = () => {
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
	const dispatch = useDispatch();
	const handleSubmitForm = values => {
		if (entitiesEdit && entitiesEdit.taskID) {
			if (params.category === 'settingtask') {
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
						history.goBack();
						handleCloseFormProject();
					}
				});
			} else {
				const TaskType = {
					1: 'Phase',
					2: 'Task',
					3: 'Miltestone'
				};
				dispatch(actions.createdTask(values, params.id, TaskType[values.taskType])).then(data => {
					if (data && !data.isError) {
						notificationConfig(
							'success',
							notificationContent.content.en.success,
							notificationContent.description.project.task.createdTask
						);
						history.goBack();
						handleCloseFormProject();
					}
				});
			}
		} else {
			dispatch(actions.createdTask(values, params.id, params.type)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.project.task.createdTask
					);
					history.goBack();
					handleCloseFormProject();
				}
			});
		}
	};
	const userInviteNoPermiss = entitiesEdit?.lstUserInvited
		? entitiesEdit.lstUserInvited?.reduce((arr, curr) => [...arr, curr.fullName], [])
		: [];
	return (
		<CustomForm
			handleSubmitForm={handleSubmitForm}
			initialState={entitiesEdit?.taskID ? initialEdit : initial}
			role={role}
			owner={owner}
			taskSub={taskSub}
			ArrProjectStatus={ArrProjectStatus}
			actionLoading={actionLoading}
			handleCancle={handleCancle}
			sectorArr={sectorArr}
			ArrTaskPri={ArrTaskPri}
			ArrTaskComponent={ArrTaskComponent}
			userInviteNoPermiss={userInviteNoPermiss}
			gradeGolbal={gradeGolbal}
			listFile={listFile}
			setListFile={setListFile}
			fileCheck={fileCheck}
			setFileCheck={setFileCheck}
			entitiesEdit={entitiesEdit}
			params={params}
		/>
	);
}
