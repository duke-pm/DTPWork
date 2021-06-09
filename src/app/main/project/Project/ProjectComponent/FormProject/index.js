import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import FormCustomProject from './FormCustomProject';
import { ProjectContext } from '../../ProjectContext';
import * as actions from '../../../_redux/_projectActions';

export default function FormProject({
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
		<Dialog
			fullWidth
			style={{ zIndex: 20 }}
			maxWidth="md"
			aria-labelledby="customized-dialog-title"
			open={formProject.open}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleCloseFormProject} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						{formProject.title}
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomProject
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
		</Dialog>
	);
}
