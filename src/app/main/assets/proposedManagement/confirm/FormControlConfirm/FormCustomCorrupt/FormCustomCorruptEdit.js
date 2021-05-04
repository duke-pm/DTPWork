import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import * as momemt from 'moment';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { Spin } from 'antd';
import * as actions from '../../../_redux/confirmAction';

const initial = {
	date: '',
	nameService: '',
	note: '',
	price: '',
	file: ''
};
export default function FormCustomCorruptEdit({
	handleOpenFormReject,
	entitiesEdit,
	handleClose,
	setFormControl,
	actionLoading
}) {
	const dispatch = useDispatch();
	return (
		<>
			<Formik
				enableReinitialize
				// validationSchema={checkValidateForm}
				initialValues={initial}
				onSubmit={values => {
					const status = true;
					dispatch(actions.requestApprove(entitiesEdit, status, values)).then(data => {
						if (!data.isError) {
							notificationConfig('success', 'Thành công', 'Gửi xác nhận thành công');
							handleClose();
							setFormControl(false);
						}
					});
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin tài sản.</h5>
									<span className="border-b-1 mt-3 ml-6 border-fuchsia w-3/6 sm:w-5/6 h-10" />
								</div>
								<div className=" grid grid-cols-1 sm:grid-cols-2 gap-8">
									<div className="flex-row justify-around flex ">
										<div className="flex flex-col">
											<p className="p-2.5	"> Mã sản phẩm </p>
											<p className="p-2.5	"> Tên sản phẩm </p>
											<p className="p-2.5	"> Nhóm sản phẩm </p>
											<p className="p-2.5	">Quy cách tài sản</p>
										</div>
										<div className="flex flex-col">
											<p className="p-2.5 font-extrabold"> {entitiesEdit.assetID || ''} </p>
											<p className="p-2.5 font-extrabold"> {entitiesEdit.assetName || ''} </p>
											<p className="p-2.5 font-extrabold"> Nhóm sản phẩm </p>
											<p className="font-extrabold p-2.5"> </p>
										</div>
									</div>
									<div className="flex-row justify-around flex ">
										<div className="flex flex-col">
											<p className="p-2.5">Ngày mua </p>
											{/* <p className="p-2.5">Số seri </p> */}
											<p className="p-2.5"> Nguyên giá </p>
											<p className="p-2.5"> Tình trạng </p>
										</div>
										<div className="flex mr-auto sm:mr-98 flex-col">
											<p className="p-2.5 font-extrabold">
												{momemt(entitiesEdit.purchaseDate).format('DD/MM/YYYY') || ''}{' '}
											</p>
											{/* <p className="p-2.5 font-extrabold"> </p> */}
											<p className="p-2.5 font-extrabold"> {entitiesEdit.originalPrice || ''} </p>
											<p className="p-2.5 font-extrabold">
												{' '}
												{entitiesEdit.assetStatusName || ''}{' '}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin tài sản bị hỏng/mất.</h5>
									<span className="border-b-1 mt-3 ml-2 border-fuchsia w-auto sm:w-9/12 h-10" />
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<div className="flex flex-col">
										<Field
											label="Nội dung"
											autoFocus
											name="note"
											component={InputTextAreaLg}
											className="mx-4 mb-16"
											variant="outlined"
											row={7}
										/>
									</div>
									<Field
										label="File Đính kèm"
										autoFocus
										style={{ height: '35px' }}
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
								<>
									<Button
										autoFocus
										type="submit"
										className="h-26 font-sans"
										variant="contained"
										color="secondary"
									>
										Xác nhận
									</Button>
									<Button
										onClick={handleOpenFormReject}
										autoFocus
										className="h-26 font-sans"
										variant="contained"
										color="primary"
									>
										Không xác nhận
									</Button>
								</>
							)}
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
