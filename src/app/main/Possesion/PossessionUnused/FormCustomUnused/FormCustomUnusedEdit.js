/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import Select from '@fuse/CustomForm/Select';
import InputCustom from '@fuse/CustomForm/Input';
import DateCustom from '@fuse/CustomForm/Date';
import InputTextArea from '@fuse/CustomForm/InputTextArea';
import FileCustom from '@fuse/CustomForm/FileCustom';

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
							<h5 className="font-extrabold text-gray-800 font-sans text-base">Thông tin tài sản</h5>
							<div className="px-16 sm:px-24">
								<div className=" grid grid-cols-1 sm:grid-cols-2 gap-48			">
									<div className="flex-row justify-around flex ">
										<div className="flex flex-col">
											<p className="p-16"> Mã sản phẩm </p>
											<p className="p-16"> Tên sản phẩm </p>
											<p className="p-16"> Nhóm sản phẩm </p>
											<p className="p-16"> Mô tả </p>
										</div>
										<div className="flex flex-col">
											<p className="p-16 font-extrabold"> Mã sản phẩm </p>
											<p className="p-16 font-extrabold"> Tên sản phẩm </p>
											<p className="p-16 font-extrabold"> Nhóm sản phẩm </p>
											<p className="p-16 font-extrabold"> Mô tả </p>
										</div>
									</div>
									<div className="flex-row justify-around flex ">
										<div className="flex flex-col">
											<p className="p-16">Ngày mua </p>
											<p className="p-16"> Nguyên giá </p>
											<p className="p-16"> Tình trạng </p>
										</div>
										<div className="flex flex-col">
											<p className="p-16 font-extrabold"> Ngày mua </p>
											<p className="p-16 font-extrabold"> Nguyên giá </p>
											<p className="p-16 font-extrabold"> Tình trạng </p>
										</div>
									</div>
								</div>
							</div>
							<h5 className="font-extrabold text-gray-800 font-sans mb-16 text-base ">
								Thông tin cấp phát tài sản
							</h5>
							<div className="px-16 sm:px-24">
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
										component={InputTextArea}
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
