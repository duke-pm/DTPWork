import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import DateCustom from '@fuse/CustomForm/Date';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import * as moment from 'moment';
import { Spin, Tooltip } from 'antd';
import * as Yup from 'yup';
import { validateField } from '@fuse/core/DtpConfig';

const initial = {
	date: moment(),
	note: '',
	file: ''
};

export default function FormCustomUsedEdit({ entitiesEdit, saveWithDraw, actionLoading, handleClose }) {
	const checkValidateForm = Yup.object().shape({
		date: Yup.string().required(`${validateField}`)
	});
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={checkValidateForm}
				initialValues={initial}
				onSubmit={values => {
					saveWithDraw(values);
					// saveForm(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<div className=" grid lg:grid-cols-2 md:grid-cols-2  sm:grid-cols-1">
									<div className="flex-col flex ">
										<div className="flex flex-row">
											<h5 className="font-extrabold">Thông tin tài sản.</h5>
										</div>
										<div className="flex-row flex ">
											<div className="flex flex-col">
												<p className="p-6"> Mã tài sản </p>
												<p className="p-6"> Tên tài sản </p>
												<p className="p-6"> Nhóm tài sản </p>
												<p className="p-6"> Ngày mua </p>
												<p className="p-6"> Tình trạng </p>
												<p className="p-6"> Mô tả </p>
											</div>
											<div className="flex sm:mr-96 mr-auto flex-col">
												<p className="p-6 font-extrabold"> {entitiesEdit?.assetCode}</p>
												<Tooltip placement="topLeft" title={entitiesEdit?.assetName}>
													<p className="p-6 font-extrabold truncate max-w-200">
														{' '}
														{entitiesEdit?.assetName}
													</p>
												</Tooltip>
												<p className="p-6 font-extrabold"> {entitiesEdit?.groupName} </p>
												<p className="p-6 font-extrabold">
													{' '}
													{entitiesEdit &&
														moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY')}{' '}
												</p>
												<p className="p-6 font-extrabold"> {entitiesEdit?.statusName} </p>
												<Tooltip placement="topLeft" title={entitiesEdit?.descr}>
													<p className="p-6 font-extrabold truncate max-w-200">
														{' '}
														{entitiesEdit?.descr}
													</p>
												</Tooltip>
											</div>
										</div>
									</div>
									<div className="flex-col flex ">
										<div className="flex flex-row">
											<h5 className="font-extrabold">Thông tin nhân viên sử dụng.</h5>
										</div>
										<div className="flex-row  flex ">
											<div className="flex flex-col">
												<p className="p-6 truncate"> Nhân viên </p>
												<p className="p-6 truncate"> Chức vụ </p>
												<p className="p-6 truncate"> Bộ phận </p>
												<p className="p-6 truncate"> Khu vực </p>
											</div>
											<div className="flex sm:mr-96 mr-auto flex-col">
												<Tooltip placement="topLeft" title={entitiesEdit?.empName}>
													<p className="p-6 font-extrabold truncate max-w-200">
														{' '}
														{entitiesEdit?.empName}
													</p>
												</Tooltip>
												<Tooltip placement="topLeft" title={entitiesEdit?.jobTitle}>
													<p className="p-6 font-extrabold truncate max-w-200">
														{' '}
														{entitiesEdit?.jobTitle}
													</p>
												</Tooltip>
												<Tooltip placement="topLeft" title={entitiesEdit?.deptNameManager}>
													<p className="p-6 font-extrabold truncate max-w-200">
														{' '}
														{entitiesEdit?.deptNameManager}
													</p>
												</Tooltip>
												<p className="p-6 font-extrabold"> {entitiesEdit?.regionName} </p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex flex-row">
									<h5 className="font-extrabold">Thông tin thu hồi.</h5>
								</div>
								<div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 p-4 mb-16 gap-8 ">
									<div className="flex flex-col">
										<Field
											label="Lý do thu hồi"
											autoFocus
											name="note"
											row={4}
											component={InputTextAreaLg}
											className="mx-4 mb-16"
											variant="outlined"
										/>
										<Field
											label="Ngày thu hồi "
											name="date"
											hasFeedback
											component={DateCustom}
											className="mx-4 mb-16"
										/>
									</div>
									<Field
										label="File đính kèm"
										style={{ height: '48.5px' }}
										name="file"
										component={FileCustomVersion2}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<Button type="submit" className="h-26 font-sans" variant="contained" color="primary">
									Lưu
								</Button>
							)}
							<Button
								type="button"
								onClick={handleClose}
								className="h-26 font-sans"
								variant="contained"
								color="secondary"
							>
								Hủy
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
