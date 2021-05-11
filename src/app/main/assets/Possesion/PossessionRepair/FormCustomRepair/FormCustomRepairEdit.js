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
export default function FormCustomRepairEdit() {
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
									<span className="border-b-1 mt-3 ml-6 border-fuchsia w-3/6 sm:w-5/6 h-10" />
								</div>
								<div className=" grid grid-cols-1 sm:grid-cols-2 sm:gap-48 gap-16">
									<div className="flex-row justify-between flex ">
										<div className="flex flex-col">
											<p className="p-6"> Mã sản phẩm </p>
											<p className="p-6"> Tên sản phẩm </p>
											<p className="p-6"> Nhóm sản phẩm </p>
											<p className="p-6"> Mô tả </p>
										</div>
										<div className="flex flex-col sm:mr-96 mr-auto">
											<p className="p-6 font-extrabold"> Mã sản phẩm </p>
											<p className="p-6 font-extrabold"> Tên sản phẩm </p>
											<p className="p-6 font-extrabold"> Nhóm sản phẩm </p>
											<p className="p-6 font-extrabold"> Mô tả </p>
										</div>
									</div>
									<div className="flex-row justify-between flex ">
										<div className="flex flex-col">
											<p className="p-6">Ngày mua </p>
											<p className="p-6"> Nguyên giá </p>
											<p className="p-6"> Tình trạng </p>
										</div>
										<div className="flex flex-col sm:mr-96 mr-auto">
											<p className="p-6 font-extrabold"> Ngày mua </p>
											<p className="p-6 font-extrabold"> Nguyên giá </p>
											<p className="p-6 font-extrabold"> Tình trạng </p>
										</div>
									</div>
								</div>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin sửa chữa bảo hành.</h5>
									<span className="border-b-1 mt-3 ml-2 border-fuchsia w-auto sm:w-9/12 h-10" />
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<Field
										label="Tên đơn vị sửa chữa, bảo hành (*)"
										name="nameService"
										type="text"
										component={InputCustom}
										className="mx-4 mb-16"
										variant="outlined"
									/>
									<Field
										label="Chi phí dự kiến (*)"
										autoFocus
										name="price"
										type="text"
										component={InputCurrency}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<div className="flex flex-col">
										<Field
											label="Lí do sửa chữa,bảo hành"
											autoFocus
											name="note"
											row={4}
											component={InputTextAreaLg}
											className="mx-4 mb-16"
											variant="outlined"
										/>
										<Field
											label="Ngày sửa chữa, bảo hành (*) "
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
										style={{ height: '35px' }}
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
								Lưu
							</Button>
							<Button
								autoFocus
								type="submit"
								className="h-26 font-sans"
								variant="contained"
								color="primary"
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
