import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import FormGroupUserCustom from './FormGroupUserCustom';
import * as actions from '../../_reduxGroupUser/groupUserActions';

export default function FormGroupUser({ open, handleCloseFormGroupUser }) {
	const { currentState } = useSelector(
		state => ({
			currentState: state.govern.groupUser
		}),
		shallowEqual
	);
	const dispatch = useDispatch();
	const { entitiesEdit, actionLoading } = currentState;
	const handleSubmitFormGroupUser = values => {
		if (entitiesEdit && entitiesEdit.id) {
			dispatch(actions.updatedGroupUser(values));
		} else {
			dispatch(actions.updatedGroupUser(values));
		}
	};
	return (
		<Dialog fullWidth style={{ zIndex: 20 }} maxWidth="sm" aria-labelledby="customized-dialog-title" open={open}>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleCloseFormGroupUser} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Thêm nhóm người dùng
					</Typography>
				</Toolbar>
			</AppBar>
			<FormGroupUserCustom
				handleSubmitFormGroupUser={handleSubmitFormGroupUser}
				handleCloseFormGroupUser={handleCloseFormGroupUser}
			/>
		</Dialog>
	);
}
