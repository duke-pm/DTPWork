import React, { useContext } from 'react';
import { Dialog, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, shallowEqual } from 'react-redux';
import FormCustomCorruptEdit from './FormCustomCorruptEdit';
import { ResovleContext } from '../../ResovleRequestContext';

export default function FormCustomCorrupt() {
	const ConfirmContextLose = useContext(ResovleContext);
	const { typeDialogCorrupt, setDialogConfirmGobal, setDialogCorrupt, diaglogCorrupt } = ConfirmContextLose;
	console.log(diaglogCorrupt);
	const { actionLoading, entitiesEdit } = useSelector(
		state => ({
			entitiesEdit: state.confirm.entitiesEdit,
			actionLoading: state.confirm.actionLoading
		}),
		shallowEqual
	);
	const handleOpenFormReject = () => setDialogConfirmGobal(true);
	const handleClose = () => setDialogCorrupt(false);
	return (
		<Dialog
			style={{ zIndex: 20 }}
			fullWidth
			maxWidth="md"
			aria-labelledby="customized-dialog-title"
			open={diaglogCorrupt}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						{typeDialogCorrupt === 'lose' ? 'Báo mất tài sản' : 'Báo hỏng tài sản'}
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomCorruptEdit
				type={typeDialogCorrupt}
				actionLoading={actionLoading}
				setFormControl={setDialogCorrupt}
				entitiesEdit={entitiesEdit}
				handleOpenFormReject={handleOpenFormReject}
				handleClose={handleClose}
			/>
		</Dialog>
	);
}
