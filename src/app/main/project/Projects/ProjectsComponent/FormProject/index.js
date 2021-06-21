import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import FormCustomProject from './FormCustomProject';
import { ProjectContext } from '../../ProjectContext';
import * as actions from '../../../_redux/_projectActions';

export default function FormProject({ owner, sectorArr, ArrProjectStatus, projectSub }) {
	const dispatch = useDispatch();
	const projectContext = useContext(ProjectContext);
	const { formProject, setFormProject, title, rowPage, page, status, ownerFilter, dateStart, search } =
		projectContext;
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
			if (title === 'Settings') {
				dispatch(actions.updatedProject(values)).then(data => {
					if (data && !data.isError) {
						notificationConfig(
							'success',
							notificationContent.content.en.success,
							notificationContent.description.project.projects.updatedProject
						);
						handleCloseFormProject();
						dispatch(actions.fetchsProjectFilter(rowPage, page, status, ownerFilter, dateStart, search));
					}
				});
			} else {
				dispatch(actions.createdProject(values)).then(data => {
					if (data && !data.isError) {
						notificationConfig(
							'success',
							notificationContent.content.en.success,
							notificationContent.description.project.projects.cloneProject
						);
						handleCloseFormProject();
						dispatch(actions.fetchsProjectFilter(rowPage, page, status, ownerFilter, dateStart, search));
					}
				});
			}
		} else {
			dispatch(actions.createdProject(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.project.projects.createdProject
					);
					handleCloseFormProject();
					dispatch(actions.fetchsProjectFilter(rowPage, page, status, ownerFilter, dateStart, search));
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
						{entitiesEdit && entitiesEdit.prjID
							? title === 'Settings'
								? 'Project Information'
								: 'New Project'
							: 'New Project'}
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomProject
				title={title}
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
