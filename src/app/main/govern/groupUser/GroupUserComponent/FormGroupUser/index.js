import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
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
		if (entitiesEdit && entitiesEdit.groupID) {
			dispatch(actions.updatedGroupUser(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig('success', 'Thành công', 'Cập nhật nhóm người dùng thành công.');
					handleCloseFormGroupUser();
				}
			});
		} else {
			dispatch(actions.createdGroupUser(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig('success', 'Thành công', 'Thêm mới nhóm người dùng thành công.');
					handleCloseFormGroupUser();
				}
			});
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
						{entitiesEdit && entitiesEdit.groupID ? 'Chỉnh sửa nhóm người dùng' : 'Thêm nhóm người dùng'}
					</Typography>
				</Toolbar>
			</AppBar>
			<FormGroupUserCustom
				entitiesEdit={entitiesEdit}
				actionLoading={actionLoading}
				handleSubmitFormGroupUser={handleSubmitFormGroupUser}
				handleCloseFormGroupUser={handleCloseFormGroupUser}
			/>
		</Dialog>
	);
}
