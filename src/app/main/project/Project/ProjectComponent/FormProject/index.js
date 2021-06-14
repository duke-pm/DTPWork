import React, { useContext, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import * as moment from 'moment';
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
	fileEdit: ''
};
export default function FormProjectDrawer({
	owner,
	gradeGolbal,
	ArrProjectStatus,
	ArrTaskPri,
	ArrTaskComponent,
	taskSub,
	params
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
			fileEdit: ''
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
			dispatch(actions.updatedTask(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig('success', 'Success', 'Updated task success');
					handleCloseFormProject();
				}
			});
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
		fileEdit: entitiesEdit && entitiesEdit.attachFiles
	};
	return (
		<div className="site-drawer-render-in-current-wrapper">
			<Drawer
				width={780}
				placement="right"
				title={entitiesEdit && entitiesEdit.taskID ? formProject.title : `New ${formProject.title}`}
				closeIcon={<CloseOutlined />}
				closable
				onClose={handleCloseFormProject}
				visible={formProject.open}
				getContainer={false}
				contentWrapperStyle={{ padding: '0 !important' }}
				style={{ position: 'absolute', display: !formProject.open && 'none' }}
			>
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
					handleSubmitForm={handleSubmitForm}
					handleCloseFormProject={handleCloseFormProject}
				/>
			</Drawer>
		</div>
	);
}
