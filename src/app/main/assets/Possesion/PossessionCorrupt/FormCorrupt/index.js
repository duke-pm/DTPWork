import React from 'react';
import { Dialog, AppBar, Toolbar, Typography } from '@material-ui/core';
import FormCustomCorruptEdit from './FormCustomCorruptEdit';

export default function FormCustomCorrupt({ handleClose, open }) {
	return (
		<Dialog
			style={{ zIndex: 20 }}
			fullWidth
			maxWidth="md"
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Báo hỏng tài sản
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomCorruptEdit handleClose={handleClose} />
		</Dialog>
	);
}
