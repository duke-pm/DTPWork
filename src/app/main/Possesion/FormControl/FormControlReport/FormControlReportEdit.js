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
export default function FormControlReportEdit({ typeReport }) {
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
										<div className="flex flex-row">
											<h5 className="font-extrabold">Thông tin tài sản.</h5>
											<span className="border-b-1 mt-3 ml-6 border-fuchsia w-auto  sm:w-4/6 h-10" />
										</div>
										<div className="flex-rows justify-between flex ">
											<div className="flex flex-col">
												<p className="p-6"> Mã sản phẩm </p>
												<p className="p-6"> Tên sản phẩm </p>
												<p className="p-6"> Nhóm sản phẩm </p>
												<p className="p-6"> Ngày mua </p>
												<p className="p-6"> Tình trạng </p>
												<p className="p-6"> Mô tả </p>
											</div>
											<div className="flex flex-col sm:mr-96 mr-auto">
												<p className="p-6 font-extrabold"> Mã sản phẩm </p>
												<p className="p-6 font-extrabold"> Tên sản phẩm </p>
												<p className="p-6 font-extrabold"> Nhóm sản phẩm </p>
												<p className="p-6 font-extrabold"> Ngày mua </p>
												<p className="p-6 font-extrabold"> Tình trạng </p>
												<p className="p-6 font-extrabold"> Mô tả ngắn </p>
											</div>
										</div>
									</div>
									<div className="flex-col flex ">
										<div className="flex flex-row">
											<h5 className="font-extrabold">Thông tin nhân viên sử dụng.</h5>
											<span className="border-b-1 mt-3 ml-6 border-fuchsia w-auto sm:w-3/6 h-10" />
										</div>
										<div className="flex-row justify- flex ">
											<div className="flex flex-col ">
												<p className="p-6"> Nhân viên </p>
												<p className="p-6"> Chức vụ </p>
												<p className="p-6"> Bộ phận </p>
												<p className="p-6"> Khu vực </p>
											</div>
											<div className="flex flex-col sm:mr-86 mr-auto">
												<p className="p-6 font-extrabold">Nhân viên viên phòng test length </p>
												<p className="p-6 font-extrabold"> Chức vụ </p>
												<p className="p-6 font-extrabold"> Bộ phận </p>
												<p className="p-6 font-extrabold"> Khu vực </p>
											</div>
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
