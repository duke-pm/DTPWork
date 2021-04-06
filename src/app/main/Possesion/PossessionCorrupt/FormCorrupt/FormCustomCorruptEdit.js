import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import DateCustom from '@fuse/CustomForm/Date';
import FileCustomVersion2 from '@fuse/CustomForm/FileCustomVersion2';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import InputCustom from '@fuse/CustomForm/Input';
import InputCurrency from '@fuse/CustomForm/InputCurrency';

const initial = {
	date: '',
	nameService: '',
	note: '',
	price: '',
	file: ''
};
export default function FormCustomCorruptEdit() {
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
							<h5 className="font-extrabold text-gray-800 font-sans text-base">Thông tin tài sản</h5>

							<div className="px-16 sm:px-24">
								<div className=" grid grid-cols-1 sm:grid-cols-2 gap-8">
									<div className="flex-row justify-around flex ">
										<div className="flex flex-col">
											<p className="p-2.5	"> Mã sản phẩm </p>
											<p className="p-2.5	"> Tên sản phẩm </p>
											<p className="p-2.5	"> Nhóm sản phẩm </p>
											<p className="p-2.5	">Quy cách tài sản</p>
										</div>
										<div className="flex flex-col">
											<p className="p-2.5 font-extrabold"> Mã sản phẩm </p>
											<p className="p-2.5 font-extrabold"> Tên sản phẩm </p>
											<p className="p-2.5 font-extrabold"> Nhóm sản phẩm </p>
											<p className="font-extrabold p-2.5"> Màn hình LG 21.5' 22MP48HQ LED IPS</p>
										</div>
									</div>
									<div className="flex-row justify-around flex ">
										<div className="flex flex-col">
											<p className="p-2.5">Ngày mua </p>
											<p className="p-2.5">Số seri </p>
											<p className="p-2.5"> Nguyên giá </p>
											<p className="p-2.5"> Tình trạng </p>
										</div>
										<div className="flex flex-col">
											<p className="p-2.5 font-extrabold"> Số seri </p>
											<p className="p-2.5 font-extrabold"> Ngày mua </p>
											<p className="p-2.5 font-extrabold"> Nguyên giá </p>
											<p className="p-2.5 font-extrabold"> Tình trạng </p>
										</div>
									</div>
								</div>
							</div>
							<div className="px-16 sm:px-24">
								<h5 className="font-extrabold text-gray-800 font-sans text-base ">Thông tin tài sản</h5>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<div className="flex flex-col">
										<Field
											label="Lí do sửa chữa,bảo hành"
											autoFocus
											name="note"
											component={InputTextAreaLg}
											className="mx-4 mb-16"
											variant="outlined"
											row={8}
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
								Xác nhận
							</Button>
							<Button
								autoFocus
								type="submit"
								className="h-26 font-sans"
								variant="contained"
								color="primary"
							>
								Không xác nhận
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
