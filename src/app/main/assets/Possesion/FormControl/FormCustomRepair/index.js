import React, { useContext } from 'react';
import { Dialog, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import FormCustomRepairEdit from './FormCustomRepairEdit';
import { PossessionContext } from '../../PossessionContext';
import * as actions from '../../_redux/possesionActions';

export default function FormCustomService() {
	const dispatch = useDispatch();
	const assetSContext = useContext(PossessionContext);
	const { formService, setFormService, typeFormService } = assetSContext;
	const { entitiesEdit, actionLoading } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading
		}),
		shallowEqual
	);
	const handleClose = () => setFormService(false);
	const handleSubmitRepairService = values => {
		dispatch(actions.repairPossesion(values, entitiesEdit, typeFormService)).then(data => {
			if (data && !data.isError) {
				notificationConfig('success', 'Thành công', 'Sửa chữa bảo hành thành công');
				handleClose();
			}
		});
	};
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
			<FormCustomRepairEdit
				actionLoading={actionLoading}
				handleSubmitRepairService={handleSubmitRepairService}
				entitiesEdit={entitiesEdit}
			/>
		</Dialog>
	);
}
