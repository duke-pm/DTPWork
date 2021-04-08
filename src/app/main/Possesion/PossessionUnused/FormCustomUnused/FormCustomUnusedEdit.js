/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import Select from '@fuse/CustomForm/Select';
import InputCustom from '@fuse/CustomForm/Input';
import DateCustom from '@fuse/CustomForm/Date';
import FileCustom from '@fuse/CustomForm/FileCustom';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';

const initial = {
	customer: '',
	position: '',
	component: '',
	location: '',
	date: '',
	file: '',
	note: ''
};
export default function FormCustomUnusedEdit() {
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
											<p className="p-6"> Mã sản phẩm </p>
											<p className="p-6"> Tên sản phẩm </p>
											<p className="p-6"> Nhóm sản phẩm </p>
											<p className="p-6"> Mô tả </p>
										</div>
										<div className="flex sm:mr-96 mr-auto flex-col">
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
											<p className="p-166"> Tình trạng </p>
										</div>
										<div className="flex sm:mr-96 mr-auto flex-col">
											<p className="p-6 font-extrabold"> Ngày mua </p>
											<p className="p-6 font-extrabold"> Nguyên giá </p>
											<p className="p-6 font-extrabold"> Tình trạng </p>
										</div>
									</div>
								</div>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin cấp phát tài sản.</h5>
									<span className="border-b-1 mt-3 ml-6 border-fuchsia w-auto sm:w-9/12 h-10" />
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<Field
										label="Nhân viên được cấp phát (*)"
										name="customer"
										component={Select}
										options={[{ value: 1, label: 'text' }]}
										className="mt-8 mb-16"
									/>
									<Field
										label="Vị trí công việc (*)"
										autoFocus
										name="position"
										type="text"
										component={InputCustom}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<Field
										label="Bộ phận (*)"
										name="component"
										component={Select}
										options={[{ value: 1, label: 'text' }]}
										className="mt-8 mb-16"
									/>
									<Field
										label="khu vực (*)"
										autoFocus
										name="location"
										component={Select}
										options={[{ value: 1, label: 'text' }]}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
									<Field
										label="Ngày cấp (*) "
										autoFocus
										name="date"
										type="text"
										component={DateCustom}
										className="mx-4 mb-16"
										variant="outlined"
									/>
									<Field
										label="File đính kèm"
										autoFocus
										name="date"
										type="text"
										component={FileCustom}
										className="mx-4 mb-16"
										variant="outlined"
									/>
								</div>
								<div className="grid mb-16 gap-8 ">
									<Field
										label="Lí do phát"
										autoFocus
										name="note"
										row={2}
										component={InputTextAreaLg}
										className="mx-4 mb-16"
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
