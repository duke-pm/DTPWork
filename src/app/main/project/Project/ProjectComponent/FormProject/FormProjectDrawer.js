import { AntInput } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import DateCustom from '@fuse/CustomForm/Date';
import { Divider, Button, DialogActions, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Field, Formik, Form } from 'formik';
import React, { useState, useEffect } from 'react';
import { Avatar, Spin } from 'antd';
import InputTextArea from '@fuse/CustomForm/InputTextArea';
import * as Yup from 'yup';
import { validateField, checkFile, nameFile } from '@fuse/core/DtpConfig';
import FileCustomVersion2Eng from '@fuse/CustomForm/FileCustomVersion2Eng';
import { FileExcelOutlined, FileImageOutlined, FileWordOutlined } from '@ant-design/icons';

const file = {
	docx: <FileWordOutlined />,
	xlsx: <FileExcelOutlined />,
	png: <FileImageOutlined />,
	jpg: <FileImageOutlined />,
	jpge: <FileImageOutlined />
};
export default function FormCustomProjectTask({
	actionLoading,
	handleCloseFormProject,
	handleSubmitForm,
	owner,
	gradeGolbal,
	ArrProjectStatus,
	ArrTaskPri,
	ArrTaskComponent,
	taskSub,
	fileCheck,
	setFileCheck,
	inititalValues,
	entitiesEdit,
	setListFile,
	listFile
}) {
	const handleClearFile = () => setFileCheck(false);
	const handleClearListFile = () => setListFile(null);
	const validateSchema = Yup.object().shape({
		taskName: Yup.string().required(`${validateField}`),
		owner: Yup.string().required(`${validateField}`).nullable(),
		priority: Yup.string().required(`${validateField}`).nullable()
	});
	const handleChangeFile = value => {
		setListFile(value.name);
	};
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={validateSchema}
				initialValues={inititalValues}
				onSubmit={values => {
					handleSubmitForm(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<div className=" mt-8 px-16 sm:px-24">
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Task name"
									name="taskName"
									type="text"
									autoFocus
									hasFeedback
									component={AntInput}
									className="mx-4"
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 mb-16 ">
								<Field
									label="Description"
									name="descr"
									row={4}
									component={InputTextArea}
									className="mx-4"
								/>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-1 gap-8 ">
								<Field
									label="Subtask of"
									name="project"
									width="100%"
									component={SelectAntd}
									options={taskSub}
									className="mx-4"
								/>
							</div>
							<div className="flex justify-between flex-row">
								<h5 className="font-extrabold">PEOPLE AND TIME</h5>
							</div>
							<Divider className="mb-16" />
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Owner"
									name="owner"
									hasFeedback
									component={SelectAntd}
									options={owner}
									className="mx-4"
									position="right"
								/>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 ">
								<Field
									label="Start Date"
									name="startDate"
									width="60%"
									component={DateCustom}
									className="mx-4"
									position="right"
								/>
								<Field
									label="End Date"
									width="60%"
									position="right"
									name="endDate"
									component={DateCustom}
									className="mx-4"
								/>
							</div>
							<div className="flex justify-between flex-row">
								<h5 className="font-extrabold">DETAIL</h5>
							</div>
							<Divider className="mb-16" />
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 ">
								<Field
									label="Percentage"
									name="percentage"
									width="60%"
									type="number"
									component={AntInput}
									position="right"
									className="mx-4"
								/>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 ">
								<Field
									label="Grade"
									name="grade"
									width="60%"
									options={gradeGolbal}
									component={SelectAntd}
									position="right"
									className="mx-4"
								/>
								<Field
									label="Component"
									width="60%"
									name="component"
									component={SelectAntd}
									options={ArrTaskComponent}
									className="mx-4"
									position="right"
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Author"
									name="author"
									component={AntInput}
									type="text"
									position="right"
									className="mx-4"
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Origin publisher"
									component={AntInput}
									type="text"
									name="originPublisher"
									position="right"
									className="mx-4"
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Ownership DTP"
									component={AntInput}
									type="text"
									name="ownership"
									position="right"
									className="mx-4"
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Priority"
									name="priority"
									hasFeedback
									component={SelectAntd}
									options={ArrTaskPri}
									position="right"
									className="mx-4"
								/>
							</div>
							{entitiesEdit && entitiesEdit.taskID && entitiesEdit.typeName === 'TASK' && (
								<div className="grid grid-cols-1 gap-8">
									<Field
										label="Status"
										name="status"
										position="right"
										component={SelectAntd}
										options={ArrProjectStatus}
										className="mx-4"
									/>
								</div>
							)}
							<div className="flex justify-between flex-row">
								<h5 className="font-extrabold">FILES</h5>
							</div>
							<Divider className="mb-16" />
							<div className="grid grid-cols-1 gap-8 ">
								{entitiesEdit &&
								entitiesEdit.attachFiles &&
								entitiesEdit.attachFiles.length > 0 &&
								fileCheck ? (
									<div className="flex flex-row justify-between">
										<div className="flex flex-row">
											<Avatar
												shape="square"
												size={54}
												style={{ backgroundColor: '#87d068' }}
												icon={
													entitiesEdit.attachFiles &&
													file[checkFile(entitiesEdit.attachFiles)]
												}
											/>
											<Button
												style={{ backgroundColor: 'none', marginLeft: '10px' }}
												href={`${process.env.REACT_APP_API_URL}/${entitiesEdit.attachFiles}`}
											>
												{' '}
												{nameFile(entitiesEdit.attachFiles)}
											</Button>
										</div>
										<div>
											{' '}
											<IconButton
												edge="start"
												color="inherit"
												onClick={handleClearFile}
												aria-label="close"
											>
												<CloseIcon />
											</IconButton>{' '}
										</div>
									</div>
								) : listFile && listFile.length ? (
									<div className="flex flex-row justify-between">
										<div className="flex flex-row">
											<Avatar
												shape="square"
												size={54}
												style={{ backgroundColor: '#87d068' }}
												icon={listFile && file[checkFile(listFile)]}
											/>
											<Button style={{ backgroundColor: 'none', marginLeft: '10px' }}>
												{' '}
												{nameFile(listFile)}
											</Button>
										</div>
										<div>
											{' '}
											<IconButton
												edge="start"
												color="inherit"
												onClick={handleClearListFile}
												aria-label="close"
											>
												<CloseIcon />
											</IconButton>{' '}
										</div>
									</div>
								) : (
									<Field
										label=""
										autoFocus
										handleChangeImage={handleChangeFile}
										style={{ height: '25px' }}
										name="file"
										component={FileCustomVersion2Eng}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								)}
							</div>
							<Divider className="mb-16 mt-16" />
						</div>
						<DialogActions>
							{actionLoading ? (
								<Spin />
							) : entitiesEdit && entitiesEdit.taskID ? (
								<Button
									disabled={!entitiesEdit.isModified}
									type="submit"
									className="h-26 font-sans"
									variant="contained"
									color="primary"
								>
									Save
								</Button>
							) : (
								<Button type="submit" className="h-26 font-sans" variant="contained" color="primary">
									Save
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
