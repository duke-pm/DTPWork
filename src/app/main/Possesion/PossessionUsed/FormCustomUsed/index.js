import React from 'react';
import { Dialog, AppBar, Toolbar, Typography } from '@material-ui/core';
import FormCustomUsedEdit from './FormCustomUsedEdit';

export default function FormCustomUsed({ handleClose, open }) {
	return (
		<Dialog
			fullWidth
			style={{ zIndex: 20 }}
			maxWidth="md"
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Thu hồi tải sản
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomUsedEdit handleClose={handleClose} />
		</Dialog>
	);
}
