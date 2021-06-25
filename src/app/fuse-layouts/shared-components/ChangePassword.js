import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import ChangePassworForm from './ChangePassworForm';

export default function ChangePassword({ formChange, setFormChange }) {
	const handleClose = () => setFormChange(false);
	return (
		<Dialog
			fullWidth
			style={{ zIndex: 20 }}
			maxWidth="sm"
			aria-labelledby="customized-dialog-title"
			open={formChange}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton onClick={handleClose} edge="start" color="inherit" aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Reset your password
					</Typography>
				</Toolbar>
			</AppBar>
			<ChangePassworForm />
		</Dialog>
	);
}
