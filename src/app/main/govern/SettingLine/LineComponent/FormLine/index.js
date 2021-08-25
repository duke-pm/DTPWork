import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import FormLineCustom from './FormLineCustom';
import { SettingLineContext } from '../../SettingLineContext';

export default function FormLine() {
	const settingLineContext = useContext(SettingLineContext);
	const { form, setForm } = settingLineContext;
	const handleCloseForm = () => setForm(false);
	return (
		<Dialog fullWidth style={{ zIndex: 20 }} maxWidth="sm" aria-labelledby="customized-dialog-title" open={form}>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton onClick={handleCloseForm} edge="start" color="inherit" aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Tạo quyền mới
					</Typography>
				</Toolbar>
			</AppBar>
			<FormLineCustom handleCloseForm={handleCloseForm} />
		</Dialog>
	);
}
