import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import FormCustomMenu from './FormCustomMenu';

export default function FormMenuComponent({ openSettingMenu, handleCloseFormMenu }) {
	return (
		<Dialog
			fullWidth
			style={{ zIndex: 20 }}
			maxWidth="sm"
			// fullScreen
			aria-labelledby="customized-dialog-title"
			open={openSettingMenu}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" onClick={handleCloseFormMenu} color="inherit" aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Thêm menu mới
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomMenu />
		</Dialog>
	);
}
