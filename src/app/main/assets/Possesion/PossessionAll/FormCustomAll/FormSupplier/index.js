import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import FormCustomSupplier from './FormCustomSupplier';
import * as action from '../../../_redux/possesionActions';

export default function FormSupplier({ open, handleCloseFormSupplier }) {
	const dispatch = useDispatch();
	const handleSaveFormSupplier = values => {
		dispatch(action.addNewsSupplier(values)).then(data => {
			if (data && !data.isError) {
				notificationConfig('success', 'Thành công', 'Thêm nhà cung cấp thành công. Vui lòng chọn nhà cung cấp');
				handleCloseFormSupplier(data.data);
			}
		});
	};
	return (
		<Dialog style={{ zIndex: 21 }} fullWidth maxWidth="sm" aria-labelledby="customized-dialog-title" open={open}>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton onClick={handleCloseFormSupplier} edge="start" color="inherit" aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Tạo mới nhà cung cấp
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomSupplier
				handleCloseFormSupplier={handleCloseFormSupplier}
				handleSaveFormSupplier={handleSaveFormSupplier}
			/>
		</Dialog>
	);
}
