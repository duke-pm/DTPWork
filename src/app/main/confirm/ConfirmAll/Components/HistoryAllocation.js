import { AppBar, Dialog, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

export default function HistoryAllocation({ handleCloseHistory, open }) {
	return (
		<Dialog
			style={{ zIndex: 20 }}
			fullWidth
			maxWidth="lg"
			onClose={handleCloseHistory}
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Chi tiết lịch sử
					</Typography>
				</Toolbar>
			</AppBar>
		</Dialog>
	);
}
