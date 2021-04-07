import React, { useContext } from 'react';
import { Dialog, AppBar, Toolbar, Typography } from '@material-ui/core';
import { PossessionContext } from '../../PossessionContext';
import FormControlReportEdit from './FormControlReportEdit';

export default function FormControlReport() {
	const possessionContext = useContext(PossessionContext);
	const { handleCloseFormReport, typeReport, formReport } = possessionContext;
	return (
		<Dialog
			style={{ zIndex: 20 }}
			fullWidth
			maxWidth="md"
			onClose={handleCloseFormReport}
			aria-labelledby="customized-dialog-title"
			open={formReport}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{`${typeReport === 'service' ? 'Báo hỏng tài sản' : 'Báo mất tài sản'}`}
					</Typography>
				</Toolbar>
			</AppBar>
			<FormControlReportEdit typeReport={typeReport} handleClose={handleCloseFormReport} />
		</Dialog>
	);
}
