import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import DateCustom from '@fuse/CustomForm/Date';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';

const initial = {
	date: '',
	note: '',
	file: ''
};
export default function FormControlReportEdit() {
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
								<div className=" grid grid-cols-1 sm:grid-cols-2">
									<div className="flex-col flex ">
										<h5 className="font-extrabold text-gray-800 font-sans mb-16 text-base ">
											Thông tin tài sản
										</h5>
										<div className="flex-rows justify-around flex ">
											<div className="flex flex-col">
												<p className="p-16"> Mã sản phẩm </p>
												<p className="p-16"> Tên sản phẩm </p>
												<p className="p-16"> Nhóm sản phẩm </p>
												<p className="p-16"> Ngày mua </p>
												<p className="p-16"> Tình trạng </p>
												<p className="p-16"> Mô tả </p>
											</div>
											<div className="flex flex-col">
												<p className="p-16 font-extrabold"> Mã sản phẩm </p>
												<p className="p-16 font-extrabold"> Tên sản phẩm </p>
												<p className="p-16 font-extrabold"> Nhóm sản phẩm </p>
												<p className="p-16 font-extrabold"> Ngày mua </p>
												<p className="p-16 font-extrabold"> Tình trạng </p>
												<p className="p-16 font-extrabold"> Mô tả </p>
											</div>
										</div>
									</div>
									<div className="flex-col flex ">
										<h5 className="font-extrabold text-gray-800 font-sans text-base ">
											Thông tin Nhân viên sử dụng
										</h5>
										<div className="flex-row justify-around flex ">
											<div className="flex flex-col">
												<p className="p-16"> Nhân viên </p>
												<p className="p-16"> Chức vụ </p>
												<p className="p-16"> Bộ phận </p>
												<p className="p-16"> Khu vực </p>
											</div>
											<div className="flex flex-col">
												<p className="p-16 font-extrabold">Nhân viên</p>
												<p className="p-16 font-extrabold"> Chức vụ </p>
												<p className="p-16 font-extrabold"> Bộ phận </p>
												<p className="p-16 font-extrabold"> Khu vực </p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="px-16 sm:px-24">
								<h5 className="font-extrabold text-gray-800 font-sans text-base ">
									Thông tin báo hỏng / mất
								</h5>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<div className="flex flex-col">
										<Field
											label="Lí do báo hỏng/báo mất "
											autoFocus
											name="note"
											component={InputTextAreaLg}
											className="mx-4 mb-16"
											variant="outlined"
										/>
										<Field
											label="Ngày báo hỏng (*) "
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
								Đồng ý
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
