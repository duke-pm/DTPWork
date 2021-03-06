import React, { useContext } from 'react';
import { Dialog, AppBar, Toolbar, DialogContent, IconButton, Typography } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import { notificationConfig, validateField } from '@fuse/core/DtpConfig';
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';
import { ConfirmContext } from '../../ConfirmContext';
import * as actions from '../../../_redux/confirmAction';
// import FormCustomRepairEdit from './FormCustomRepairEdit';
const initial = {
	note: ''
};
export default function FormConfirmGobal({ open }) {
	const checkValidate = Yup.object().shape({
		note: Yup.string().required(`${validateField}`)
	});
	const dispatch = useDispatch();
	const ConfirmGobalContext = useContext(ConfirmContext);
	const { setReasonReject, setFormAllocation } = ConfirmGobalContext;
	const handleClose = () => {
		setReasonReject(false);
	};
	const { entitiesEdit } = useSelector(
		state => ({
			entitiesEdit: state.confirm.entitiesEdit,
			actionLoading: state.confirm.actionLoading
		}),
		shallowEqual
	);
	const handleSubmitApprove = values => {
		const status = false;
		dispatch(actions.requestApprove(entitiesEdit, status, values)).then(data => {
			if (!data.isError) {
				notificationConfig('success', 'Thành công', 'Gửi yêu cầu thành công');
				handleClose();
				setFormAllocation(false);
			}
		});
	};
	return (
		<Dialog fullWidth maxWidth="sm" aria-labelledby="customized-dialog-title" open={open}>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle2" color="inherit">
						Lí do không duyệt
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
										autoFocus
										hasFeedback
										name="note"
										component={InputTextAreaLg}
										className="mb-16"
										variant="outlined"
										row={8}
									/>
								</div>
							</div>
						</DialogContent>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
}
