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
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { Spin } from 'antd';
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';
import { ResovleContext } from '../../ResovleRequestContext';
import * as actions from '../../../_redux/confirmAction';
// import FormCustomRepairEdit from './FormCustomRepairEdit';
const initial = {
	note: ''
};
export default function FormConfirmGobal() {
	const checkValidate = Yup.object().shape({
		note: Yup.string().required('Lí do không được để trống')
	});
	const dispatch = useDispatch();
	const ConfirmGobalContext = useContext(ResovleContext);
	const { setDialogConfirmGobal, setDialogAllocation, setDialogCorrupt, diaglogConfirmGobal } = ConfirmGobalContext;
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
		dispatch(actions.requestApproveResolve(entitiesEdit, status, values)).then(data => {
			if (!data.isError) {
				notificationConfig('success', 'Thành công', 'Gửi yêu cầu thành công');
				handleClose();
				setDialogAllocation(false);
				setDialogCorrupt(false);
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
						Lí do không xác nhận.
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
										label="Lí do không xác nhận"
										autoFocus
										hasFeedback
										name="note"
										component={InputTextAreaLg}
										className="mx-4 mb-16"
										variant="outlined"
										row={8}
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
										className="h-26 font-sans"
										variant="contained"
										color="secondary"
									>
										Hoàn thành
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