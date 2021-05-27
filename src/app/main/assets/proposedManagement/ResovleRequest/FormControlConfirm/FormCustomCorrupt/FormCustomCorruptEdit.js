import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import * as momemt from 'moment';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { Spin } from 'antd';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import * as actions from '../../../_redux/confirmAction';

const initial = {
	note: ''
};
export default function FormCustomCorruptEdit({
	handleOpenFormReject,
	entitiesEdit,
	handleClose,
	setFormControl,
	actionLoading,
	type
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
					dispatch(actions.requestApproveResolve(entitiesEdit, status, values)).then(data => {
						if (!data.isError) {
							notificationConfig('success', 'Thành công', 'Phê duyệt thành công');
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
								</div>
								<div className=" grid grid-cols-1 sm:grid-cols-2">
									<div className="flex-row flex ">
										<div className="flex flex-col" style={{ width: '27rem' }}>
											<p className="p-6"> Mã tài sản </p>
											<p className="p-6"> Tên tài sản </p>
											<p className="p-6"> Nhóm tài sản </p>
											<p className="p-6">Quy cách tài sản</p>
										</div>
										<div className="flex mr-auto sm:mr-98 flex-col" style={{ width: '600px' }}>
											<p className="p-6 font-extrabold"> {entitiesEdit.assetID || ''} </p>
											<p className="p-6 font-extrabold"> {entitiesEdit.assetName || ''} </p>
											<p className="p-6 font-extrabold"> Nhóm tài sản </p>
											<p className="font-extrabold p-6"> </p>
										</div>
									</div>
									<div className="flex-row justify-around flex ">
										<div className="flex flex-col" style={{ width: '20rem' }}>
											<p className="p-6">Ngày mua </p>
											{/* <p className="p-2.5">Số seri </p> */}
											<p className="p-6"> Nguyên giá </p>
											<p className="p-6"> Tình trạng </p>
										</div>
										<div className="flex mr-auto sm:mr-98 flex-col" style={{ width: '600px' }}>
											<p className="p-6 font-extrabold">
												{momemt(entitiesEdit.purchaseDate).format('DD/MM/YYYY') || ''}{' '}
											</p>
											{/* <p className="p-2.5 font-extrabold"> </p> */}
											<p className="p-6 font-extrabold">
												{' '}
												{currencyFormat(entitiesEdit.originalPrice) || ''}{' '}
											</p>
											<p className="p-6 font-extrabold"> {entitiesEdit.assetStatusName || ''} </p>
										</div>
									</div>
								</div>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">
										Thông tin tài sản bị {type === 'lost' ? ' mất' : 'hỏng'}.
									</h5>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-1 mb-16 gap-8 ">
									<div className="flex flex-col">
										<Field
											label="Nội dung"
											autoFocus
											name="note"
											component={InputTextAreaLg}
											className="mx-4 mb-16"
											variant="outlined"
											row={4}
										/>
									</div>
									{/* <Field
										label="File Đính kèm"
										autoFocus
										style={{ height: '35px' }}
										name="file"
										component={FileCustomVersion2}
										className="mx-4 mb-16"
										variant="outlined"
									/> */}
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
										color="primary"
									>
										Duyệt
									</Button>
									<Button
										onClick={handleOpenFormReject}
										autoFocus
										className="h-26 font-sans"
										variant="contained"
										color="secondary"
									>
										Không duyệt
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
