import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, shallowEqual } from 'react-redux';
import FormCustomProject from './FormCustomProject';
import { ProjectContext } from '../../ProjectContext';

export default function FormProject() {
	const projectContext = useContext(ProjectContext);
	const { formProject, setFormProject } = projectContext;
	const handleCloseFormProject = () => setFormProject(false);
	const { currentState } = useSelector(
		state => ({
			currentState: state.project
		}),
		shallowEqual
	);
	const { entitiesEdit } = currentState;
	console.log(entitiesEdit);
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
			<FormCustomProject entitiesEdit={entitiesEdit} handleCloseFormProject={handleCloseFormProject} />
		</Dialog>
	);
}
