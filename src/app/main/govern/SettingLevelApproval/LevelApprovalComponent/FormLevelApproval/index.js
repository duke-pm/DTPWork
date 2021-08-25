import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import FormLevelApprovalCustom from './FormLevelApprovalCustom';
import { LevelApprovalContext } from '../../LevelApprovalContext';

export default function FormLevelApproval() {
	const levelApprovalContext = useContext(LevelApprovalContext);
	const { form, setForm } = levelApprovalContext;
	const handleCloseForm = () => setForm(false);
	return (
		<Dialog fullWidth style={{ zIndex: 20 }} maxWidth="md" aria-labelledby="customized-dialog-title" open>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton onClick={handleCloseForm} edge="start" color="inherit" aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Add New Role
					</Typography>
				</Toolbar>
			</AppBar>
			<FormLevelApprovalCustom handleCloseForm={handleCloseForm} />
		</Dialog>
	);
}
