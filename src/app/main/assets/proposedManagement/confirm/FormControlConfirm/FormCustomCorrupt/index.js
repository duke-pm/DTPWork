import React, { useContext } from 'react';
import { Dialog, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, shallowEqual } from 'react-redux';
import FormCustomCorruptEdit from './FormCustomCorruptEdit';
import { ConfirmContext } from '../../ConfirmContext';

export default function FormCustomCorrupt({ handleClose, open }) {
	const ConfirmContextLose = useContext(ConfirmContext);
	const { type, setReasonReject, setTypeReasonReject, setFormControl } = ConfirmContextLose;
	const { actionLoading, entitiesEdit } = useSelector(
		state => ({
			entitiesEdit: state.confirm.entitiesEdit,
			actionLoading: state.confirm.actionLoading
		}),
		shallowEqual
	);
	const handleOpenFormReject = () => {
		setReasonReject(true);
		setTypeReasonReject(type);
	};
	return (
		<Dialog style={{ zIndex: 20 }} fullWidth maxWidth="md" aria-labelledby="customized-dialog-title" open={open}>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						{type === 'lose' ? 'Báo mất tài sản' : 'Báo hỏng tài sản'}
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomCorruptEdit
				type={type}
				actionLoading={actionLoading}
				setFormControl={setFormControl}
				entitiesEdit={entitiesEdit}
				handleOpenFormReject={handleOpenFormReject}
				handleClose={handleClose}
			/>
		</Dialog>
	);
}
