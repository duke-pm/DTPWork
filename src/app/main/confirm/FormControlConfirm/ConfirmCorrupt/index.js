import React, { useContext } from 'react';
import { Dialog, AppBar, Toolbar, Typography, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import { ConfirmContext } from '../../ConfirmContext';
// import FormCustomRepairEdit from './FormCustomRepairEdit';
const initial = {
	note: ''
};
export default function FormConfirmGobal({ open }) {
	const ConfirmGobalContext = useContext(ConfirmContext);
	const { setReasonReject } = ConfirmGobalContext;
	const handleClose = () => {
		setReasonReject(false);
	};
	console.log(open);
	return (
		<Dialog fullWidth maxWidth="sm" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Xác nhận báo cáo hỏng
					</Typography>
				</Toolbar>
			</AppBar>
			<Formik
				enableReinitialize
				// validationSchema={checkValidateForm}
				initialValues={initial}
				onSubmit={values => {
					// saveForm(values);
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
							<Button
								autoFocus
								type="submit"
								className="h-26 font-sans"
								variant="contained"
								color="secondary"
							>
								Hoàn thành
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
}
