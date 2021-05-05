import React, { useContext } from 'react';
import { Dialog, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { PossessionContext } from '../../PossessionContext';
import FormCustomCycleEdit from './FormCustomCycleEdit';

export default function FormControlCycle() {
	const possessionContext = useContext(PossessionContext);
	const { formCycle, handleCloseFormCycle } = possessionContext;
	return (
		<Dialog
			fullWidth
			style={{ zIndex: 20 }}
			maxWidth="md"
			aria-labelledby="customized-dialog-title"
			open={formCycle}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleCloseFormCycle} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Đưa vào sử dụng lại
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomCycleEdit handleClose={handleCloseFormCycle} />
		</Dialog>
	);
}
