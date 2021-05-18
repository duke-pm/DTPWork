import { AntInput } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import { Button, DialogContent, DialogActions } from '@material-ui/core';
import { Spin } from 'antd';
import { Formik, Form, Field } from 'formik';
import React from 'react';
import CheckboxAntd from '@fuse/CustomForm/CheckboxAntd';
import * as Yup from 'yup';

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
		menuName: Yup.string().required('Menu name is required.'),
		typeID: Yup.string().required('Type menu is required.')
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
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Menu ngoài"
										name="parentID"
										component={SelectAntd}
										options={menuParent}
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
										label="Icon web"
										name="icon"
										type="text"
										component={AntInput}
										className="mt-8 mb-16"
									/>
									<Field
										label="Direction icon web"
										name="directionIcon"
										type="text"
										component={AntInput}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Icon di động"
										name="mIcon"
										type="text"
										component={AntInput}
										className="mt-8 mb-16"
									/>
									<Field
										label="Tên màn hình di động"
										name="mName"
										type="text"
										component={AntInput}
										className="mt-8 mb-16"
									/>
									<Field
										label="VisOrder"
										name="visOrder"
										type="number"
										component={AntInput}
										className="mt-8 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
									<Field
										label="Trạng thái"
										name="inactive"
										value={initial.inactive}
										component={CheckboxAntd}
										className="mt-8 mb-16"
									/>
									<Field
										value={initial.isWeb}
										label="Web"
										name="isWeb"
										component={CheckboxAntd}
										className="mt-8 mb-16"
									/>
									<Field
										label="Mobile"
										value={initial.isMobile}
										name="isMobile"
										component={CheckboxAntd}
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
										{initial.menuID !== '0' ? 'Chỉnh sửa' : 'Thêm mới'}
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
