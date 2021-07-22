import { AntInput } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import DateCustom from '@fuse/CustomForm/Date';
import { Divider, Button, DialogActions, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Field, Formik, Form } from 'formik';
import React from 'react';
import { Avatar, Spin } from 'antd';
import InputTextArea from '@fuse/CustomForm/InputTextArea';
import * as Yup from 'yup';
import { validateField, checkFile, nameFile } from '@fuse/core/DtpConfig';
import FileCustomVersion2Eng from '@fuse/CustomForm/FileCustomVersion2Eng';
import { FileExcelOutlined, FileImageOutlined, FileWordOutlined } from '@ant-design/icons';
import SelectAntdCustomStatus from '@fuse/CustomForm/SelectAntdCustomStatus';
import SelectAntdMulti from '@fuse/CustomForm/SelectAntdMulti';
import SliderAntd from '@fuse/CustomForm/SliderAntd';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
	listFile,
	formProject,
	sectorArr,
	userInviteNoPermiss
}) {
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
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
									label="Name"
									name="taskName"
									type="text"
									readOnly={entitiesEdit && !entitiesEdit.isModified}
									hasFeedback
									component={AntInput}
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 mb-16 ">
								<Field
									label="Description"
									name="descr"
									row={4}
									readOnly={entitiesEdit && !entitiesEdit.isModified}
									component={InputTextArea}
								/>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-1 gap-8 ">
								<Field
									label="Subtask of"
									name="project"
									width="100%"
									readOnly={entitiesEdit && !entitiesEdit.isModified}
									component={SelectAntd}
									options={taskSub}
								/>
							</div>
							<div className="flex justify-between flex-row">
								<Typography variant="subtitle2">PEOPLE & TIME</Typography>
							</div>
							<Divider className="mb-16" />
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Assignee"
									name={entitiesEdit && !entitiesEdit.isModified ? 'ownerName' : 'owner'}
									readOnly={entitiesEdit && !entitiesEdit.isModified}
									hasFeedback
									component={entitiesEdit && !entitiesEdit.isModified ? AntInput : SelectAntd}
									options={entitiesEdit && !entitiesEdit.isModified ? null : owner}
									position={matchesSM ? null : 'right'}
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 ">
								{entitiesEdit && !entitiesEdit.isModified ? (
									<Field
										label="Add Team Member"
										name="userInvite"
										options={owner}
										count={3}
										value={entitiesEdit && !entitiesEdit.isModified ? userInviteNoPermiss : []}
										component={SelectAntdMulti}
										readOnly={entitiesEdit && !entitiesEdit.isModified}
										position={matchesSM ? null : 'right'}
									/>
								) : (
									<Field
										label="Add Team Member"
										name="userInvite"
										options={owner}
										count={3}
										component={SelectAntdMulti}
										readOnly={entitiesEdit && !entitiesEdit.isModified}
										position={matchesSM ? null : 'right'}
									/>
								)}
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 ">
								<Field
									label="Start Date"
									name="startDate"
									width="58.8%"
									readOnly={entitiesEdit && !entitiesEdit.isModified}
									component={DateCustom}
									position={matchesSM ? null : 'right'}
								/>
								<Field
									label="End Date"
									width="58.8%"
									position={matchesSM ? null : 'right'}
									name="endDate"
									readOnly={entitiesEdit && !entitiesEdit.isModified}
									component={DateCustom}
								/>
							</div>
							<div className="flex justify-between flex-row">
								<Typography variant="subtitle2">DETAIL</Typography>
							</div>
							<Divider className="mb-16" />
							{entitiesEdit &&
								entitiesEdit.taskID &&
								entitiesEdit.typeName === 'TASK' &&
								formProject.title !== 'New task' && (
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 ">
										<Field
											label="Status"
											name="status"
											width="58.8%"
											readOnly={entitiesEdit && !entitiesEdit.isModified}
											position={matchesSM ? null : 'right'}
											component={SelectAntdCustomStatus}
											options={ArrProjectStatus}
										/>
										<Field
											label="Percentage"
											name="percentage"
											width="58.8%"
											readOnly={entitiesEdit && !entitiesEdit.isModified}
											component={SliderAntd}
											position={matchesSM ? null : 'right'}
										/>
									</div>
								)}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 ">
								<Field
									label="Sector"
									name="sectorID"
									width="58.8%"
									readOnly={entitiesEdit && !entitiesEdit.isModified}
									position={matchesSM ? null : 'right'}
									component={SelectAntd || []}
									options={sectorArr}
								/>
								<Field
									label="Priority"
									name="priority"
									readOnly={entitiesEdit && !entitiesEdit.isModified}
									hasFeedback
									// value={inititalValues.priority}
									component={SelectAntd}
									options={ArrTaskPri}
									position={matchesSM ? null : 'right'}
									width="58.8%"
								/>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 ">
								<Field
									label="Grade"
									name="grade"
									width="58.8%"
									readOnly={entitiesEdit && !entitiesEdit.isModified}
									options={gradeGolbal}
									component={SelectAntd}
									position={matchesSM ? null : 'right'}
								/>
								<Field
									label="Component"
									width="58.8%"
									readOnly={entitiesEdit && !entitiesEdit.isModified}
									name="component"
									component={SelectAntd}
									options={ArrTaskComponent}
									position={matchesSM ? null : 'right'}
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Author"
									name="author"
									component={AntInput}
									type="text"
									readOnly={entitiesEdit && !entitiesEdit.isModified}
									position={matchesSM ? null : 'right'}
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Origin Publisher"
									component={AntInput}
									type="text"
									name="originPublisher"
									position={matchesSM ? null : 'right'}
									readOnly={entitiesEdit && !entitiesEdit.isModified}
								/>
							</div>
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Ownership DTP"
									component={AntInput}
									type="text"
									readOnly={entitiesEdit && !entitiesEdit.isModified}
									name="ownership"
									position={matchesSM ? null : 'right'}
								/>
							</div>
							{/* {entitiesEdit &&
								entitiesEdit.taskID &&
								entitiesEdit.typeName === 'TASK' &&
								formProject.title !== 'New task' && (
									<div className="grid grid-cols-1 gap-8">
										<Field
											label="Status"
											name="status"
											readOnly={entitiesEdit && !entitiesEdit.isModified}
											position="right"
											component={SelectAntdCustomStatus}
											options={ArrProjectStatus}
										/>
									</div>
								)} */}
							<div className="flex justify-between flex-row">
								<Typography variant="subtitle2">FILES</Typography>
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
												disabled={entitiesEdit && !entitiesEdit.isModified}
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
												disabled={entitiesEdit && !entitiesEdit.isModified}
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
										readOnly={entitiesEdit && !entitiesEdit.isModified}
										handleChangeImage={handleChangeFile}
										style={{ height: '25px' }}
										name="file"
										component={FileCustomVersion2Eng}
										className="mb-16"
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
									className="h-26"
									variant="contained"
									color="primary"
								>
									Save
								</Button>
							) : (
								<Button type="submit" className="h-26" variant="contained" color="primary">
									Save
								</Button>
							)}

							<Button
								onClick={handleCloseFormProject}
								type="button"
								className="h-26"
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
