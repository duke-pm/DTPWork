import React from 'react';
import { DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import DateCustom from '@fuse/CustomForm/Date';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import * as moment from 'moment';
import { Spin } from 'antd';
import * as Yup from 'yup';
import ContentFormReport from './ContentFormReport';

const useStyles = makeStyles(theme => ({
	widthFont: {
		width: '13rem'
	},
	widthContent: {
		width: '60%'
	}
}));
const initial = {
	date: moment(Date.now()),
	note: '',
	file: ''
};
export default function FormControlReportEdit({ typeReport, entitiesEdit, reportFromUser, actionLoading }) {
	const checkValidateForm = Yup.object().shape({
		date: Yup.string().required('Ngày không được để trống').nullable(),
		note: Yup.string().required('Nội dung không được để trống')
	});
	const classes = useStyles();
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={checkValidateForm}
				initialValues={initial}
				onSubmit={values => {
					reportFromUser(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<ContentFormReport classes={classes} entitiesEdit={entitiesEdit} />
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex flex-row">
									<h5 className="font-extrabold">
										Thông tin báo {typeReport === 'service' ? 'hỏng' : 'mất'}.
									</h5>
									<span className="border-b-1 mt-3 ml-6 border-fuchsia w-3/6 sm:w-5/6 h-10" />
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<div className="flex flex-col">
										<Field
											label={`Lí do báo ${typeReport === 'service' ? 'hỏng' : 'mất'}`}
											autoFocus
											name="note"
											row={4}
											component={InputTextAreaLg}
											className="mx-4 mb-16"
											variant="outlined"
											hasFeedback
										/>
										<Field
											label={`Ngày báo ${typeReport === 'service' ? 'hỏng' : 'mất'}`}
											autoFocus
											name="date"
											hasFeedback
											component={DateCustom}
											className="mx-4 mb-16"
											variant="outlined"
										/>
									</div>
									<Field
										label="File Đính kèm"
										autoFocus
										name="file"
										style={{ height: '58.5px' }}
										component={FileCustomVersion2}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin />
							) : (
								<Button
									autoFocus
									type="submit"
									className="h-26 font-sans"
									variant="contained"
									color="secondary"
								>
									Gửi yêu cầu
								</Button>
							)}
							<Button
								autoFocus
								type="submit"
								className="h-26 font-sans"
								variant="contained"
								color="primary"
							>
								Hủy bỏ
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
