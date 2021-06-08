import { AntInput } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import CheckboxAntd from '@fuse/CustomForm/CheckboxAntd';
import { Button, DialogActions, DialogContent } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import React from 'react';
import { Spin } from 'antd';
import InputTextArea from '@fuse/CustomForm/InputTextArea';
import * as Yup from 'yup';
import { validateField } from '@fuse/core/DtpConfig';

export default function FormCustomProject({
	actionLoading,
	handleCloseFormProject,
	entitiesEdit,
	owner,
	sectorArr,
	ArrProjectStatus,
	projectSub,
	handleSubmitForm
}) {
	let initial = {
		prjID: '0',
		prjName: '',
		sectorID: null,
		prjParentID: null,
		owner: null,
		isPublic: true,
		descr: '',
		statusID: 1
	};
	if (entitiesEdit && entitiesEdit.prjID) {
		initial = {
			prjID: entitiesEdit && entitiesEdit.prjID,
			prjName: entitiesEdit && entitiesEdit.prjName,
			sectorID: entitiesEdit && entitiesEdit.sectorID === 0 ? null : entitiesEdit.sectorID,
			prjParentID: entitiesEdit && entitiesEdit.prjParentID === 0 ? null : entitiesEdit.prjParentID,
			owner: entitiesEdit && entitiesEdit.owner === 0 ? null : entitiesEdit.owner,
			isPublic: entitiesEdit && entitiesEdit.isPublic,
			descr: entitiesEdit && entitiesEdit.descr,
			statusID: entitiesEdit && entitiesEdit.statusID
		};
	}
	const validateSchema = Yup.object().shape({
		prjName: Yup.string().required(`${validateField}`)
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
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Name project"
										hasFeedback
										type="text"
										name="prjName"
										component={AntInput}
										className="mx-4"
									/>
									<Field
										label="Sector"
										name="sectorID"
										component={SelectAntd}
										options={sectorArr}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="SubProject of"
										name="prjParentID"
										component={SelectAntd}
										options={projectSub}
										className="mx-4"
									/>
									<Field
										label="Owner"
										name="owner"
										component={SelectAntd}
										options={owner}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Status"
										readOnly
										name="statusID"
										options={ArrProjectStatus}
										component={SelectAntd}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Public"
										hasFeedback
										name="isPublic"
										value={initial.isPublic}
										component={CheckboxAntd}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 gap-8 ">
									<Field
										label="Description"
										name="descr"
										row={4}
										component={InputTextArea}
										className="mx-4"
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin />
							) : (
								<Button type="submit" className="h-26 font-sans" variant="contained" color="primary">
									{initial && initial.prjID !== '0' ? 'Save' : 'Created'}
								</Button>
							)}

							<Button
								onClick={handleCloseFormProject}
								type="button"
								className="h-26 font-sans"
								variant="contained"
								color="secondary"
							>
								Cancle
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
