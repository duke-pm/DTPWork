import { AntInput } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import CheckboxAntd from '@fuse/CustomForm/CheckboxAntd';
import SelectAntdMulti from '@fuse/CustomForm/SelectAntdMulti';
import { Button, DialogActions, DialogContent, Divider } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import React from 'react';
import { Spin } from 'antd';
import InputTextArea from '@fuse/CustomForm/InputTextArea';
import * as Yup from 'yup';
import { validateField } from '@fuse/core/DtpConfig';
import DateCustom from '@fuse/CustomForm/Date';

export default function FormCustomProject({
	actionLoading,
	handleCloseFormProject,
	entitiesEdit,
	owner,
	// sectorArr,
	// ArrProjectStatus,
	projectSub,
	handleSubmitForm,
	title,
	role
}) {
	let initial = {
		prjID: '0',
		prjName: '',
		prjParentID: null,
		owner: null,
		isPublic: true,
		descr: '',
		statusID: 1,
		userInvite: [],
		priority: 0,
		appraisalTime: null
	};
	if (entitiesEdit && entitiesEdit.prjID) {
		initial = {
			prjID: entitiesEdit?.prjID,
			prjName: entitiesEdit?.prjName,
			prjParentID: entitiesEdit?.prjParentID === 0 ? null : entitiesEdit.prjParentID,
			owner: entitiesEdit?.owner === 0 ? null : entitiesEdit.owner,
			isPublic: entitiesEdit?.isPublic,
			descr: entitiesEdit?.descr,
			statusID: entitiesEdit?.statusID,
			priority: entitiesEdit?.priorityLevel,
			appraisalTime: entitiesEdit?.appraisalTime,
			userInvite: entitiesEdit?.listUserIDInvited ? entitiesEdit.listUserIDInvited.split(',').map(Number) : []
		};
	}
	const validateSchema = Yup.object().shape({
		prjName: Yup.string().required(`${validateField}`),
		owner: Yup.string().required(`${validateField}`).nullable()
	});
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={validateSchema}
				initialValues={initial}
				onSubmit={values => {
					handleSubmitForm(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent>
							<div className="px-16 sm:px-24">
								<div className="grid grid-cols-1 gap-8 ">
									<Field
										label="Project Name"
										hasFeedback
										type="text"
										name="prjName"
										component={AntInput}
									/>
								</div>
								<div className="grid grid-cols-1 gap-8 ">
									<Field
										label="Subproject of"
										name="prjParentID"
										component={SelectAntd}
										options={projectSub}
									/>
								</div>
								<div className="grid grid-cols-1 gap-8 mb-16 ">
									<Field label="Description" name="descr" row={8} component={InputTextArea} />
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Project Owner"
										name="owner"
										component={SelectAntd}
										options={owner}
										hasFeedback
									/>
									<Field
										label="Add Team Member"
										name="userInvite"
										component={SelectAntdMulti}
										options={owner}
										count={2}
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									{role?.userName === 'phucvd' && (
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
											<Field
												label="Inspection time"
												name="appraisalTime"
												placeholder="Please select time"
												component={DateCustom}
											/>
											<Field
												label="Priority"
												name="priority"
												type="number"
												component={AntInput}
											/>
										</div>
									)}
									<Field
										label="Public"
										hasFeedback
										name="isPublic"
										value={initial.isPublic}
										component={CheckboxAntd}
										top="20px"
									/>
								</div>
								{/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									
								</div> */}
							</div>
						</DialogContent>
						<Divider />
						<DialogActions>
							{actionLoading ? (
								<Spin style={{ marginRight: '20px' }} />
							) : (
								<Button type="submit" className="h-26" variant="contained" color="primary">
									<span>{initial?.prjID !== '0' ? 'Save' : 'Save'}</span>
								</Button>
							)}

							<Button
								onClick={handleCloseFormProject}
								type="button"
								className="h-26"
								variant="contained"
								color="secondary"
							>
								<span>Cancel</span>
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
