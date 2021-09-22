import React, { useContext } from 'react';
import {
	Dialog,
	AppBar,
	Toolbar,
	Typography,
	DialogContent,
	DialogActions,
	Button,
	IconButton
} from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig, validateField } from '@fuse/core/DtpConfig';
import { Spin } from 'antd';
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';
import { requestApproveResolve } from 'app/main/assets/proposedManagement/_redux/confirmAction';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import { useHistory } from 'react-router';
import { CustomAllocationContext } from '../PageCustomAllocation';
// import FormCustomRepairEdit from './FormCustomRepairEdit';
const initial = {
	note: ''
};
export default function FormConfirmGobal() {
	const history = useHistory();
	const checkValidate = Yup.object().shape({
		note: Yup.string().required(`${validateField}`)
	});
	const dispatch = useDispatch();
	const ConfirmContextLose = useContext(CustomAllocationContext);
	const { setDialogConfirmGobal, diaglogConfirmGobal } = ConfirmContextLose;
	const handleClose = () => {
		setDialogConfirmGobal(false);
	};
	const { actionLoading, entitiesEdit } = useSelector(
		state => ({
			entitiesEdit: state.confirm.entitiesEdit,
			actionLoading: state.confirm.actionLoading
		}),
		shallowEqual
	);
	const handleSubmitApprove = values => {
		const status = false;
		dispatch(requestApproveResolve(entitiesEdit, status, values)).then(data => {
			if (!data.isError) {
				notificationConfig('success', 'Thành công', 'Xác nhận không phê duyệt');
				handleClose();
				history.goBack();
			}
		});
	};
	return (
		<Dialog fullWidth maxWidth="sm" aria-labelledby="customized-dialog-title" open={diaglogConfirmGobal}>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						Lý do không duyệt.
					</Typography>
				</Toolbar>
			</AppBar>
			<Formik
				enableReinitialize
				validationSchema={checkValidate}
				initialValues={initial}
				onSubmit={values => {
					handleSubmitApprove(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<div className="grid grid-cols-1 mb-16 gap-8 ">
									<Field
										label="Lý do không duyệt"
										hasFeedback
										name="note"
										component={AntDescriptionsCustom}
										row={4}
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<>
									<Button
										autoFocus
										type="submit"
										className="h-26"
										variant="contained"
										color="primary"
									>
										Xác nhận
									</Button>
								</>
							)}
						</DialogActions>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
}
