import React from 'react';
import { Dialog, AppBar, Toolbar, Typography } from '@material-ui/core';
import FormCustomEdit from './FormCustomEdit';

export default function FormCustomAll({ handleClose, open }) {
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
						Ghi gia tăng tài sản theo lô
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomEdit handleClose={handleClose} />
		</Dialog>
	);
}
