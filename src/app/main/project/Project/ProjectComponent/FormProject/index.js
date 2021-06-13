import React, { useContext } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ProjectContext } from '../../ProjectContext';
import * as actions from '../../../_redux/_projectActions';
import FormCustomProjectTask from './FormProjectDrawer';

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
	const projectContext = useContext(ProjectContext);
	const { formProject, setFormProject } = projectContext;
	const handleCloseFormProject = () =>
		setFormProject({
			open: false,
			title: ''
		});
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
					entitiesEdit={entitiesEdit}
					owner={owner}
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
