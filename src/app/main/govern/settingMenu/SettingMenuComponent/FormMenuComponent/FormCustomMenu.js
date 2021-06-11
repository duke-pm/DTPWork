import { AntInput } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import { Button, DialogContent, DialogActions } from '@material-ui/core';
import { Spin } from 'antd';
import { Formik, Form, Field } from 'formik';
import React from 'react';
import CheckboxAntd from '@fuse/CustomForm/CheckboxAntd';
import * as Yup from 'yup';
import { validateField } from '@fuse/core/DtpConfig';

const inititalState = {
	menuID: '0',
	menuName: '',
	levelID: 0,
	typeID: 1,
	parentID: null,
	url: '',
	icon: '',
	directionIcon: '',
	mName: '',
	mIcon: '',
	inactive: false,
	isWeb: true,
	isMobile: true,
	visOrder: 0
};
export default function FormCustomMenu({
	actionLoading,
	menuParent,
	handleSubmitCreatedMenu,
	entitiesEdit,
	handleCloseFormMenu
}) {
	const validationSchema = Yup.object().shape({
		menuName: Yup.string().required(`${validateField}`),
		typeID: Yup.string().required(`${validateField}`)
		// url: Yup.string().required('Url web is required.').nullable()
	});
	const initial = entitiesEdit && entitiesEdit.menuID ? entitiesEdit : inititalState;
	return (
		<>
			<Formik
				enableReinitialize
				validationSchema={validationSchema}
				initialValues={initial}
				onSubmit={values => {
					handleSubmitCreatedMenu(values);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Menu Name"
										name="menuName"
										type="text"
										hasFeedback
										component={AntInput}
										className="mt-8 mb-16"
									/>
									{/* {!entitiesEdit && ( */}
									<Field
										label="Menu Type"
										name="typeID"
										hasFeedback
										options={[
											{
												label: 'Group',
												value: 1
											},
											{
												label: 'Collapse',
												value: 2
											},
											{
												label: 'Item',
												value: 3
											}
										]}
										component={SelectAntd}
										className="mt-8 mb-16"
									/>
									{/* )} */}
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Menu Parent"
										name="parentID"
										component={SelectAntd}
										options={menuParent}
										className="mt-8 mb-16"
									/>
									<Field
										label="Web Url/ Action"
										name="url"
										type="text"
										component={AntInput}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Web icon"
										name="icon"
										type="text"
										component={AntInput}
										className="mt-8 mb-16"
									/>
									<Field
										label="Direction Web icon"
										name="directionIcon"
										type="text"
										component={AntInput}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Mobile icon"
										name="mIcon"
										type="text"
										component={AntInput}
										className="mt-8 mb-16"
									/>
									<Field
										label="Mobile Url/ Action"
										name="mName"
										type="text"
										component={AntInput}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
									<Field
										label="Order"
										name="visOrder"
										type="number"
										component={AntInput}
										className="mt-8 mb-16"
									/>
									<Field
										value={initial.isWeb}
										label="For Web"
										name="isWeb"
										component={CheckboxAntd}
										className="mt-8 mb-16"
										top="20px"
									/>
									<Field
										label="For Mobile"
										value={initial.isMobile}
										name="isMobile"
										component={CheckboxAntd}
										className="mt-8 mb-16"
										top="20px"
									/>
									<Field
										label="Inactive"
										name="inactive"
										value={initial.inactive}
										component={CheckboxAntd}
										className="mt-8 mb-16"
										top="20px"
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
										{initial.menuID !== '0' ? 'Cập nhật' : 'Tạo mới'}
									</Button>
									<Button
										onClick={handleCloseFormMenu}
										variant="contained"
										type="button"
										color="secondary"
									>
										Huỷ
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
