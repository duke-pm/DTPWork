import React from 'react';
import {
	Dialog,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	makeStyles,
	DialogContent,
	DialogActions,
	Button
} from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
// import FormCustomUsedEdit from './FormCustomUsedEdit';
import CloseIcon from '@material-ui/icons/Close';
import { Spin } from 'antd';
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
	const { entitiesEdit, actionLoading } = useSelector(
		state => ({
			entitiesEdit: state.possesion.entitiesEdit,
			actionLoading: state.possesion.actionLoading
		}),
		shallowEqual
	);
	const saveWithDraw = values => {
		dispatch(action.withdrawPossesion(values, entitiesEdit)).then(data => {
			if (data && !data.isError) {
				notificationConfig('success', 'Thành công!', 'Cập nhật thành công');
				handleClose();
			} else {
				notificationConfig('warning', 'Thất bại!', 'Cập nhật thất bại vui lòng thử lại');
			}
		});
	};
	const handleSubmitForm = values => {
		console.log(values);
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
			<FormCustomEdit handleSubmitForm={handleSubmitForm} />
		</Dialog>
	);
}
