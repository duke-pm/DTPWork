import { checkFile, nameFile, validateFieldEN } from '@fuse/core/DtpConfig';
import FileCustomVersion2Eng from '@fuse/CustomForm/FileCustomVersion2Eng';
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntSelectCustom from '@fuse/FormBookingCustom/AntSelectCustom';
import AntSelectMultiCustom from '@fuse/FormBookingCustom/AntSelectMultiCustom';
import AntSlideCustom from '@fuse/FormBookingCustom/AntSlideCustom';
import { Button, IconButton, Typography } from '@material-ui/core';
import { Avatar, Divider, Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { FileExcelOutlined, FileImageOutlined, FileWordOutlined } from '@ant-design/icons';
import CloseIcon from '@material-ui/icons/Close';

const file = {
	docx: <FileWordOutlined />,
	xlsx: <FileExcelOutlined />,
	png: <FileImageOutlined />,
	jpg: <FileImageOutlined />,
	jpge: <FileImageOutlined />
};
export default function CustomForm({
	initialState,
	taskSub,
	owner,
	entitiesEdit,
	handleSubmitForm,
	actionLoading,
	handleCancle,
	ArrProjectStatus,
	sectorArr,
	ArrTaskPri,
	gradeGolbal,
	ArrTaskComponent,
	fileCheck,
	setFileCheck,
	setListFile,
	listFile,
	userInviteNoPermiss,
	params
}) {
	const validateSchema = Yup.object().shape({
		taskName: Yup.string().required(`${validateFieldEN}`),
		owner: Yup.string().required(`${validateFieldEN}`).nullable(),
		priority: Yup.string().required(`${validateFieldEN}`).nullable()
	});
	const handleClearFile = () => setFileCheck(false);
	const handleClearListFile = () => setListFile(null);
	const handleChangeFile = value => {
		setListFile(value.name);
	};
	return (
		<Formik
			validationSchema={validateSchema}
			enableReinitialize
			initialValues={initialState}
			onSubmit={values => {
				handleSubmitForm(values);
			}}
		>
			{({ handleSubmit, isSubmitting }) => (
				<Form>
					<div className="mt-8 px-16 sm:px-24">
						<div>
							<Field
								readOnly={entitiesEdit && !entitiesEdit.isModified}
								label="Name"
								hasFeedback
								name="taskName"
								component={AntInputCustom}
							/>
						</div>
						<div>
							<Field
								readOnly={entitiesEdit && !entitiesEdit.isModified}
								label="Description"
								name="descr"
								component={AntDescriptionsCustom}
								row={4}
							/>
						</div>
						<div>
							<Field
								readOnly={entitiesEdit && !entitiesEdit.isModified}
								label="Subtask of"
								name="project"
								component={AntSelectCustom}
								options={taskSub}
							/>
						</div>
						<div className="mb-20">
							<Typography color="primary" variant="subtitle1" className="label--form--title">
								PEOPLE & TIME
							</Typography>
						</div>
						<div>
							<Field
								label="Assignee"
								name={entitiesEdit && !entitiesEdit.isModified ? 'ownerName' : 'owner'}
								readOnly={entitiesEdit && !entitiesEdit.isModified}
								hasFeedback
								component={entitiesEdit && !entitiesEdit.isModified ? AntInputCustom : AntSelectCustom}
								options={entitiesEdit && !entitiesEdit.isModified ? null : owner}
								position="right"
							/>
						</div>
						<div>
							{entitiesEdit && !entitiesEdit.isModified ? (
								<Field
									label="Add Team Member"
									name="userInvite"
									options={owner}
									count={3}
									value={entitiesEdit && !entitiesEdit.isModified ? userInviteNoPermiss : []}
									component={AntSelectMultiCustom}
									readOnly={entitiesEdit && !entitiesEdit.isModified}
									position="right"
								/>
							) : (
								<Field
									label="Add Team Member"
									name="userInvite"
									options={owner}
									count={3}
									component={AntSelectMultiCustom}
									readOnly={entitiesEdit && !entitiesEdit.isModified}
									position="right"
								/>
							)}
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 ">
							<Field
								label="Start Date"
								name="startDate"
								width="58.8%"
								readOnly={entitiesEdit && !entitiesEdit.isModified}
								component={AntDateCustom}
								position="right"
							/>
							<Field
								label="End Date"
								width="58.8%"
								position="right"
								name="endDate"
								readOnly={entitiesEdit && !entitiesEdit.isModified}
								component={AntDateCustom}
							/>
						</div>
						<div className="mb-20">
							<Typography color="primary" variant="subtitle1" className="label--form--title">
								DETAIL
							</Typography>
						</div>
						{entitiesEdit &&
							entitiesEdit.taskID &&
							entitiesEdit.typeName === 'TASK' &&
							params.category !== 'newtask' && (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 ">
									<Field
										label="Status"
										name="status"
										width="58.8%"
										readOnly={entitiesEdit && !entitiesEdit.isModified}
										position="right"
										component={AntSelectCustom}
										options={ArrProjectStatus}
									/>
									<Field
										label="Percentage"
										name="percentage"
										width="58.8%"
										readOnly={entitiesEdit && !entitiesEdit.isModified}
										component={AntSlideCustom}
										position="right"
									/>
								</div>
							)}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 ">
							<Field
								label="Sector"
								name="sectorID"
								width="58.8%"
								readOnly={entitiesEdit && !entitiesEdit.isModified}
								position="right"
								component={AntSelectCustom}
								options={sectorArr}
							/>
							<Field
								label="Priority"
								name="priority"
								readOnly={entitiesEdit && !entitiesEdit.isModified}
								hasFeedback
								component={AntSelectCustom}
								options={ArrTaskPri}
								position="right"
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
								component={AntSelectCustom}
								position="right"
							/>
							<Field
								label="Component"
								width="58.8%"
								readOnly={entitiesEdit && !entitiesEdit.isModified}
								name="component"
								component={AntSelectCustom}
								options={ArrTaskComponent}
								position="right"
							/>
						</div>
						<div className="grid grid-cols-1 gap-8 ">
							<Field
								label="Author"
								name="author"
								component={AntInputCustom}
								readOnly={entitiesEdit && !entitiesEdit.isModified}
								position="right"
							/>
						</div>
						<div className="grid grid-cols-1 gap-8 ">
							<Field
								label="Origin Publisher"
								component={AntInputCustom}
								name="originPublisher"
								position="right"
								readOnly={entitiesEdit && !entitiesEdit.isModified}
							/>
						</div>
						<div className="grid grid-cols-1 gap-8 ">
							<Field
								label="Ownership DTP"
								component={AntInputCustom}
								readOnly={entitiesEdit && !entitiesEdit.isModified}
								name="ownership"
								position="right"
							/>
						</div>
						<div className="mb-20">
							<Typography color="primary" variant="subtitle1" className="label--form--title">
								FILES
							</Typography>
						</div>
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
											icon={entitiesEdit.attachFiles && file[checkFile(entitiesEdit.attachFiles)]}
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
					</div>
					<Divider className="mb-16 mt-16" />
					<div className="flex items-center justify-end">
						{actionLoading ? (
							<Spin />
						) : entitiesEdit && entitiesEdit.taskID ? (
							<Button
								disabled={!entitiesEdit.isModified}
								type="submit"
								className="button__cancle mr-8"
								variant="contained"
								color="primary"
							>
								{' '}
								<Typography variant="body2"> Save </Typography>
							</Button>
						) : (
							<Button type="submit" className="button__cancle mr-8" variant="contained" color="primary">
								<Typography variant="body2"> Save </Typography>
							</Button>
						)}
						<Button
							onClick={handleCancle}
							className="button__cancle mr-8"
							variant="contained"
							color="secondary"
						>
							<Typography variant="body2"> Cancle </Typography>
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}