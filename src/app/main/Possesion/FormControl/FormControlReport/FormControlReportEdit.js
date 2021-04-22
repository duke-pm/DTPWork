import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import DateCustom from '@fuse/CustomForm/Date';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import * as moment from 'moment';

const initial = {
	date: '',
	note: '',
	file: ''
};
export default function FormControlReportEdit({ typeReport, entitiesEdit }) {
	return (
		<>
			<Formik
				enableReinitialize
				// validationSchema={checkValidateForm}
				initialValues={initial}
				onSubmit={values => {
					// saveForm(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin tài sản.</h5>
									<span className="border-b-1 mt-3 ml-6 border-fuchsia w-auto sm:w-5/6 h-10" />
								</div>
								<div className=" grid grid-cols-1 sm:grid-cols-2 gap-48">
									<div className="flex-row justify-between flex ">
										<div className="flex flex-col">
											<p className="p-6"> Mã tài sản </p>
											<p className="p-6"> Tên tài sản </p>
											<p className="p-6"> Nhóm tài sản </p>
											<p className="p-6"> Mô tả </p>
										</div>
										<div className="flex sm:mr-96 mr-auto flex-col">
											<p className="p-6 font-extrabold">
												{entitiesEdit && entitiesEdit.assetCode}
											</p>
											<p className="p-6 font-extrabold">
												{entitiesEdit && entitiesEdit.assetName}
											</p>
											<p className="p-6 font-extrabold">
												{entitiesEdit && entitiesEdit.groupName}
											</p>
											<p className="p-6 font-extrabold"> {entitiesEdit && entitiesEdit.descr}</p>
										</div>
									</div>
									<div className="flex-row justify-between flex ">
										<div className="flex flex-col">
											<p className="p-6">Ngày mua </p>
											<p className="p-6"> Nguyên giá </p>
											<p className="p-166"> Tình trạng </p>
										</div>
										<div className="flex sm:mr-96 mr-auto flex-col">
											<p className="p-6 font-extrabold">
												{entitiesEdit && moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY')}
											</p>
											<p className="p-6 font-extrabold">
												{' '}
												{entitiesEdit && currencyFormat(entitiesEdit.originalPrice)}
											</p>
											<p className="p-6 font-extrabold"> Chưa sử dụng </p>
										</div>
									</div>
								</div>
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
										/>
										<Field
											label={`Ngày báo ${typeReport === 'service' ? 'hỏng' : 'mất'}`}
											autoFocus
											name="date"
											component={DateCustom}
											className="mx-4 mb-16"
											variant="outlined"
										/>
									</div>
									<Field
										label="File Đính kèm"
										autoFocus
										name="file"
										style={{ height: '34.5px' }}
										component={FileCustomVersion2}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							<Button
								autoFocus
								type="submit"
								className="h-26 font-sans"
								variant="contained"
								color="secondary"
							>
								Gửi yêu cầu
							</Button>
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
