import React, { useContext } from 'react';
import { Dialog, AppBar, Toolbar, Typography } from '@material-ui/core';
import FormCustomCorruptEdit from './FormCustomCorruptEdit';
import { ConfirmContext } from '../../ConfirmContext';

export default function FormCustomCorrupt({ handleClose, open }) {
	const ConfirmContextLose = useContext(ConfirmContext);
	const { type, setReasonReject, setTypeReasonReject } = ConfirmContextLose;
	const handleOpenFormReject = () => {
		setReasonReject(true);
		setTypeReasonReject(type);
	};
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
						{type === 'lose' ? 'Báo mất tài sản' : 'Báo hỏng tài sản'}
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomCorruptEdit handleOpenFormReject={handleOpenFormReject} handleClose={handleClose} />
		</Dialog>
	);
}
