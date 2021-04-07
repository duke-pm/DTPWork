import React, { useContext } from 'react';
import { Dialog, AppBar, Toolbar, Typography } from '@material-ui/core';
import { PossessionContext } from '../../PossessionContext';
import FormCustomCycleEdit from './FormCustomCycleEdit';
// import FormControlReportEdit from './FormControlReportEdit';

export default function FormControlCycle() {
	const possessionContext = useContext(PossessionContext);
	const { formCycle, typeCycle, handleCloseFormCycle } = possessionContext;
	return (
		<Dialog
			fullWidth
			style={{ zIndex: 20 }}
			maxWidth="md"
			onClose={handleCloseFormCycle}
			aria-labelledby="customized-dialog-title"
			open={formCycle}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Đưa vào sử dụng lại
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomCycleEdit handleClose={handleCloseFormCycle} />
		</Dialog>
	);
}
