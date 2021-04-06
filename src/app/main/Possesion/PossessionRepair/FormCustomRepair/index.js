import React from 'react';
import { Dialog, AppBar, Toolbar, Typography } from '@material-ui/core';
import FormCustomRepairEdit from './FormCustomRepairEdit';

export default function FormCustomRepair({ handleClose, open }) {
	return (
		<Dialog fullWidth maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Sửa chữa bảo hành tài sản
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomRepairEdit handleClose={handleClose} />
		</Dialog>
	);
}
