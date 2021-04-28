import React from 'react';
import { Dialog, AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
// import FormCustomUsedEdit from './FormCustomUsedEdit';
import CloseIcon from '@material-ui/icons/Close';
import * as action from '../../_redux/possesionActions';
import FormCustomEdit from './FormCustomEdit';

const useStyles = makeStyles({
	scrollPaper: {
		alignItems: 'baseline' // default center
	}
});

export default function FormRequest({ handleClose, open }) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const { actionLoading, entitiesInformation } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading,
			entitiesInformation: state.possesion.entitiesInformation
		}),
		shallowEqual
	);
	const handleSubmitForm = (values, assets) => {
		dispatch(action.requestAssetFromUserAction(values, assets)).then(data => {
			if (data && !data.isError) {
				notificationConfig('success', 'Thành công!', 'Yêu cầu thành công !!');
				handleClose();
			} else {
				// notificationConfig('warning', 'Thất bại!', 'Yêu cầu thất bại vui lòng thử lại');
			}
		});
	};
	return (
		<Dialog
			fullWidth
			style={{ zIndex: 20 }}
			maxWidth="lg"
			classes={{ scrollPaper: classes.scrollPaper }}
			// fullScreen
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Yêu cầu cấp phát tài sản
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomEdit
				actionLoading={actionLoading}
				entitiesInformation={entitiesInformation}
				handleSubmitForm={handleSubmitForm}
			/>
		</Dialog>
	);
}
