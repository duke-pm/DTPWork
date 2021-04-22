import React from 'react';
import { Dialog, AppBar, Toolbar, Typography } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
// import FormCustomUsedEdit from './FormCustomUsedEdit';
import * as action from '../../_redux/possesionActions';
import FormCustomEdit from './FormCustomEdit';

export default function FormRequest({ handleClose, open }) {
	const dispatch = useDispatch();
	const { entitiesEdit, actionLoading } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading
		}),
		shallowEqual
	);
	const saveWithDraw = values => {
		dispatch(action.withdrawPossesion(values, entitiesEdit)).then(data => {
			if (data && !data.isError) {
				notificationConfig('success', 'Thành công!', 'Cập nhật thành công');
				handleClose();
			} else {
				notificationConfig('warning', 'Thất bại!', 'Cập nhật thất bại vui lòng thử lại');
			}
		});
	};
	return (
		<Dialog
			fullWidth
			style={{ zIndex: 20 }}
			maxWidth="lg"
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Yêu cầu cấp phát tài sản
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomEdit />
		</Dialog>
	);
}
