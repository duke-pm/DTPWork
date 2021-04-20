import React from 'react';
import { Dialog, AppBar, Toolbar, Typography } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import FormCustomUnusedEdit from './FormCustomUnusedEdit';
import * as actions from '../../_redux/possesionActions';

export default function FormCustomUnused({ handleClose, open }) {
	const dispatch = useDispatch();
	const { entitiesEdit, actionLoading, entitiesInformation } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading,
			entitiesInformation: state.possesion.entitiesInformation
		}),
		shallowEqual
	);
	const saveAddAsset = values => {
		dispatch(actions.addPersonalPossesion(values)).then(data => {
			if (data && !data.isError) {
				notificationConfig('success', ' Thành công!', 'Thêm nhân viên vào tài sản thành công');
				handleClose();
			} else {
				notificationConfig('warning', 'Thất bại!', 'Thêm nhân viên vào tài sản thất bại vui lòng thử lại');
			}
		});
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
						Cấp phát tài sản
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomUnusedEdit
				actionLoading={actionLoading}
				saveAddAsset={saveAddAsset}
				entitiesInformation={entitiesInformation}
				entitiesEdit={entitiesEdit}
				handleClose={handleClose}
			/>
		</Dialog>
	);
}
