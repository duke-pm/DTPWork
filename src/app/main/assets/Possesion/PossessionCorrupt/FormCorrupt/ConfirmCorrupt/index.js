import React from 'react';
import { Dialog, AppBar, Toolbar, Typography, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
// import FormCustomRepairEdit from './FormCustomRepairEdit';
const initial = {
	note: ''
};
export default function FormConfirm({ handleClose, open, type }) {
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
									{type === 'confirm' ? (
										<div className="flex flex-col">
											<Field
												label="Thông tin xác nhận báo hỏng tài sản"
												autoFocus
												name="note"
												component={InputTextAreaLg}
												className="mb-16"
												variant="outlined"
												row={8}
											/>
										</div>
									) : (
										<Field
											label="Lý do không xác nhận"
											autoFocus
											name="note"
											component={InputTextAreaLg}
											className="mb-16"
											variant="outlined"
											row={8}
										/>
									)}
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
