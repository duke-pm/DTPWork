import React from 'react';
import { Dialog, AppBar, Toolbar, Typography } from '@material-ui/core';
import FormControlReportEdit from './FormControlReportEdit';

export default function FormControlReport({ handleClose, open }) {
	return (
		<Dialog fullWidth maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Báo hỏng tài sản/Báo mất tài sản
					</Typography>
				</Toolbar>
			</AppBar>
			<FormControlReportEdit handleClose={handleClose} />
		</Dialog>
	);
}
