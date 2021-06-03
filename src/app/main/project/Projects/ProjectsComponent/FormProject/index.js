import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import FormCustomProject from './FormCustomProject';
import { ProjectContext } from '../../ProjectContext';
import * as actions from '../../../_redux/_projectActions';

export default function FormProject({ owner, sectorArr, ArrProjectStatus, projectSub }) {
	const dispatch = useDispatch();
	const projectContext = useContext(ProjectContext);
	const { formProject, setFormProject } = projectContext;
	const handleCloseFormProject = () => setFormProject(false);
	const { currentState } = useSelector(
		state => ({
			currentState: state.project
		}),
		shallowEqual
	);
	const { entitiesEdit, actionLoading } = currentState;
	const handleSubmitForm = values => {
		if (entitiesEdit && entitiesEdit.prjID) {
			dispatch(actions.updatedProject(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig('success', 'Success', 'Updated project success');
					handleCloseFormProject();
				}
			});
		} else {
			dispatch(actions.createdProject(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig('success', 'Success', 'Created project success');
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
			open={formProject}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleCloseFormProject} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						New Project
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomProject
				actionLoading={actionLoading}
				handleSubmitForm={handleSubmitForm}
				projectSub={projectSub}
				owner={owner}
				sectorArr={sectorArr}
				ArrProjectStatus={ArrProjectStatus}
				entitiesEdit={entitiesEdit}
				handleCloseFormProject={handleCloseFormProject}
			/>
		</Dialog>
	);
}
