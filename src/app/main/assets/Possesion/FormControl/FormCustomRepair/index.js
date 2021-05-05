import React, { useContext } from 'react';
import { Dialog, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FormCustomRepairEdit from './FormCustomRepairEdit';
import { PossessionContext } from '../../PossessionContext';

export default function FormCustomService() {
	const assetSContext = useContext(PossessionContext);
	const { formService, setFormService } = assetSContext;
	const handleClose = () => setFormService(false);
	return (
		<Dialog
			style={{ zIndex: 20 }}
			fullWidth
			maxWidth="md"
			open={formService}
			aria-labelledby="customized-dialog-title"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Sửa chữa bảo hành tài sản
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomRepairEdit />
		</Dialog>
	);
}
