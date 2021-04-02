import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import InputCustom from '../../../../../@fuse/CustomForm/Input';
import Select from '../../../../../@fuse/CustomForm/Select';

const initial = {
	name: '',
	select: ''
};
export default function FormCustomEdit({ handleClose }) {
	const checkValidateForm = Yup.object().shape({
		name: Yup.string().required('Số lượng không được để trống'),
		select: Yup.string().required('Số lượng không được để trống')
	});
	const saveForm = values => {
		console.log(values);
	};
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={checkValidateForm}
				initialValues={initial}
				onSubmit={values => {
					saveForm(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<div className="grid grid-cols-2 gap-4">
									<Field
										label="Name"
										autoFocus
										name="name"
										type="number"
										component={InputCustom}
										className="mt-8 mb-16 mx-4"
										// value={form.title}
										// onChange={handleChange}
										variant="outlined"
									/>
									<Field
										label="Name"
										name="select"
										component={Select}
										options={[{ value: 1, label: 'text' }]}
										className="mt-8 mb-16 mx-4"
										// value={form.title}
										// onChange={handleChange}
									/>
								</div>
								{/* <div className="grid grid-cols-12 gap-4">
								<TextField
									label="Notes"
									name="notes"
									multiline
									// rows="6"
									// value={form.notes}
									// onChange={handleChange}
									variant="outlined"
								/>
							</div> */}
								{/* <FormControl className="mt-8 mb-16" required fullWidth>
								<TextField
									label="Notes"
									name="notes"
									multiline
									rows="6"
									// value={form.notes}
									// onChange={handleChange}
									variant="outlined"
								/>
							</FormControl> */}
								{/* <div className="flex">
								<TextField
									name="startDate"
									label="Start Date"
									type="datetime-local"
									className="mt-8 mb-16 mx-4"
									InputLabelProps={{
										shrink: true
									}}
									// inputProps={{
									// 	max: dueDate
									// }}
									// value={startDate}
									// onChange={handleChange}
									variant="outlined"
								/>
								<TextField
									name="dueDate"
									label="Due Date"
									type="datetime-local"
									className="mt-8 mb-16 mx-4"
									InputLabelProps={{
										shrink: true
									}}
									// inputProps={{
									// 	min: startDate
									// }}
									// value={dueDate}
									// onChange={handleChange}
									variant="outlined"
								/>
							</div> */}
							</div>
						</DialogContent>
						<DialogActions>
							<Button autoFocus type="submit" color="primary">
								Lưu
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
