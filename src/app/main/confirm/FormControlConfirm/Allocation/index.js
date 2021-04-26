import React from 'react';
import { Dialog, AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core';
import { useSelector, shallowEqual } from 'react-redux';
// import FormCustomUsedEdit from './FormCustomUsedEdit';
import CloseIcon from '@material-ui/icons/Close';
import FormCustomEdit from './FormCustomEdit';

const useStyles = makeStyles({
	scrollPaper: {
		alignItems: 'baseline' // default center
	}
});

export default function FormAllocation({ handleClose, open, setReasonReject }) {
	const classes = useStyles();
	const { actionLoading, entitiesInformation } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading,
			entitiesInformation: state.possesion.entitiesInformation
		}),
		shallowEqual
	);
	const handleOpenReject = () => {
		setReasonReject(true);
	};
	// const handleSubmitForm = (values, assets) => {};
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
						Thôn tin yêu cầu cấp phát tài sản
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomEdit
				handleOpenReject={handleOpenReject}
				actionLoading={actionLoading}
				entitiesInformation={entitiesInformation}
				// handleSubmitForm={handleSubmitForm}
			/>
		</Dialog>
	);
}
