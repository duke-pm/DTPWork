import React from 'react';
import { Dialog, AppBar, Toolbar } from '@material-ui/core';
import Text from 'app/components/Text';
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
					<Text type="subTitle" color="primary">
						Báo hỏng tài sản
					</Text>
				</Toolbar>
			</AppBar>
			<FormCustomCorruptEdit handleClose={handleClose} />
		</Dialog>
	);
}
