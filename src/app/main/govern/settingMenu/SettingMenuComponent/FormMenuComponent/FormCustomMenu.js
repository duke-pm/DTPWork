import { AntInput, AntSelect } from '@fuse/CustomForm/CreateAntField';
import RadioAntd from '@fuse/CustomForm/RadioAntd';
import { Button, DialogContent, DialogActions } from '@material-ui/core';
import { Spin } from 'antd';
import { Formik, Form, Field } from 'formik';
import React from 'react';

const inititalState = {
	menuName: '',
	menuType: 'group',
	menuParent: null,
	url: '',
	icon: '',
	status: true,
	orderNO: 0
};
export default function FormCustomMenu({ actionLoading }) {
	return (
		<>
			<Formik
				enableReinitialize
				initialValues={inititalState}
				onSubmit={values => {
					console.log(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent>
							<div className="px-16 sm:px-24">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Tên menu"
										name="menuName"
										type="text"
										hasFeedback
										component={AntInput}
										className="mt-8 mb-16"
									/>
									<Field
										label="Loại menu"
										name="menuType"
										hasFeedback
										options={[
											{
												label: 'Group',
												value: 'group'
											},
											{
												label: 'Collape',
												value: 'collape'
											},
											{
												label: 'Item',
												value: 'item'
											}
										]}
										component={AntSelect}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Menu cha"
										name="menuParent"
										component={AntSelect}
										className="mt-8 mb-16"
									/>
									<Field
										label="Đường dẫn"
										name="url"
										type="text"
										component={AntInput}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Icon"
										name="icon"
										type="text"
										component={AntInput}
										className="mt-8 mb-16"
									/>
									<Field
										label="Số thứ tự"
										name="orderNO"
										type="number"
										component={AntInput}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 gap-8">
									<Field
										label="Trạng thái"
										name="status"
										options={[
											{
												label: 'Hoạt động',
												value: true
											},
											{
												label: 'Không hoạt động',
												value: false
											}
										]}
										component={RadioAntd}
										className="mt-8 mb-16"
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<>
									<Button variant="contained" type="submit" color="primary">
										Tạo mới
									</Button>
									<Button variant="contained" type="button" color="secondary">
										hủy
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
