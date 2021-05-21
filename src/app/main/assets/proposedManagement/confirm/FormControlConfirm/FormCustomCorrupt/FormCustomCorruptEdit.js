import React from 'react';
import { DialogContent } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import * as momemt from 'moment';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import InputTextArea from '@fuse/CustomForm/InputTextArea';
import * as actions from '../../../_redux/confirmAction';

export default function FormCustomCorruptEdit({ entitiesEdit, handleClose, setFormControl, type }) {
	let initialState = {
		reason: '',
		reasonReject: ''
	};
	if (entitiesEdit) {
		initialState = {
			reason: entitiesEdit.reason,
			reasonReject: entitiesEdit.reasonReject
		};
	}
	const dispatch = useDispatch();
	return (
		<>
			<Formik
				enableReinitialize
				// validationSchema={checkValidateForm}
				initialValues={initialState}
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
								</div>
								<div className=" grid grid-cols-1 sm:grid-cols-2 gap-8">
									<div className="flex-row  flex ">
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
											<p className="p-2.5 font-extrabold">
												{' '}
												{currencyFormat(entitiesEdit.originalPrice) || ''}{' '}
											</p>
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
									<h5 className="font-extrabold">
										Thông tin tài sản bị {type === 'lose' ? ' mất' : 'hỏng'}
									</h5>
								</div>
								<div
									className={`grid grid-cols-1 ${
										entitiesEdit && entitiesEdit.statusID === 4
											? 'sm:grid-cols-2'
											: ' sm:grid-cols-1'
									} gap-8 `}
								>
									<Field
										readOnly
										label="Lý do"
										hasFeedback
										name="reason"
										component={InputTextArea}
										className="mt-8 mb-16"
										row={2}
									/>
									{entitiesEdit && entitiesEdit.statusID === 4 && (
										<Field
											readOnly
											label="Lý do từ chối "
											hasFeedback
											name="reasonReject"
											component={InputTextArea}
											className="mt-8 mb-16"
											row={2}
										/>
									)}
								</div>
							</div>
						</DialogContent>
						{/* <DialogActions>
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
						</DialogActions> */}
					</Form>
				)}
			</Formik>
		</>
	);
}
