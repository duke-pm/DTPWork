import React, { useContext } from 'react';
import { Dialog, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { PossessionContext } from '../../PossessionContext';
import FormCustomCycleEdit from './FormCustomCycleEdit';
import * as actions from '../../_redux/possesionActions';

export default function FormControlCycle() {
	const dispatch = useDispatch();
	const possessionContext = useContext(PossessionContext);
	const { formCycle, handleCloseFormCycle } = possessionContext;
	const { entitiesEdit, actionLoading } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading
		}),
		shallowEqual
	);
	const handleSubmitCycle = values => {
		dispatch(actions.assetReuse(values, entitiesEdit)).then(data => {
			if (data && !data.isError) {
				notificationConfig('success', 'Thành công', 'Tài sản được đưa vào để tái sử dụng.');
				handleCloseFormCycle();
			}
		});
	};
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
			<FormCustomCycleEdit
				actionLoading={actionLoading}
				handleSubmitCycle={handleSubmitCycle}
				entitiesEdit={entitiesEdit}
				handleClose={handleCloseFormCycle}
			/>
		</Dialog>
	);
}
