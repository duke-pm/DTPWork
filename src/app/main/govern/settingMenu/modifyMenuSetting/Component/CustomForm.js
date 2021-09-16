import { validateField } from '@fuse/core/DtpConfig';
import AntdCustomCheckbox from '@fuse/FormBookingCustom/AntdCustomCheckbox';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntSelectCustom from '@fuse/FormBookingCustom/AntSelectCustom';
import { Button, Typography } from '@material-ui/core';
import { Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export default function CustomForm({
	actionLoading,
	handleCloseFormListUser,
	handleSubmitCreatedMenu,
	entitiesEdit,
	menuParent
}) {
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
	const validationSchema = Yup.object().shape({
		menuName: Yup.string().required(`${validateField}`),
		typeID: Yup.string().required(`${validateField}`)
		// url: Yup.string().required('Url web is required.').nullable()
	});

	const initial = entitiesEdit && entitiesEdit.menuID ? entitiesEdit : inititalState;
	console.log(initial);
	return (
		<Formik
			validationSchema={validationSchema}
			enableReinitialize
			initialValues={initial}
			onSubmit={values => {
				handleSubmitCreatedMenu(values);
			}}
		>
			{({ handleSubmit, isSubmitting }) => (
				<Form>
					<div className="px-16 sm:px-24">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
							<Field label="Menu Name" name="menuName" hasFeedback component={AntInputCustom} />{' '}
							<Field
								label="Menu Type"
								name="typeID"
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
								component={AntSelectCustom}
							/>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
							<Field
								label="Menu Parent"
								name="parentID"
								options={menuParent}
								component={AntSelectCustom}
							/>
							<Field label="Web Url/ Action" name="url" component={AntInputCustom} />
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
							<Field label="Web icon" name="icon" component={AntInputCustom} />
							<Field label="Direction Web icon" name="directionIcon" component={AntInputCustom} />
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
							<Field label="Mobile icon" name="mIcon" component={AntInputCustom} />
							<Field label="Mobile Url/ Action" name="mName" component={AntInputCustom} />
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
							<Field
								label="Inactive"
								name="inactive"
								top="10px"
								position="right"
								value={initial.inactive}
								component={AntdCustomCheckbox}
							/>
							<Field
								label="Mobile"
								name="isMobile"
								top="10px"
								position="right"
								value={initial.isMobile}
								component={AntdCustomCheckbox}
							/>
							<Field
								label="Web"
								name="isWeb"
								top="10px"
								position="right"
								value={initial.isWeb}
								component={AntdCustomCheckbox}
							/>
							<Field
								label="Order"
								name="visOrder"
								type="number"
								width="70%"
								position="right"
								component={AntInputCustom}
							/>
						</div>
					</div>
					<div className="flex items-center justify-end">
						{actionLoading ? (
							<Spin className="ml-20" />
						) : (
							<Button type="submit" className="button__cancle mr-8" variant="contained" color="primary">
								{' '}
								<Typography variant="body2"> Save </Typography>
							</Button>
						)}
						<Button
							onClick={handleCloseFormListUser}
							className="button__cancle mr-8"
							variant="contained"
							color="secondary"
						>
							<Typography variant="body2"> Cancel </Typography>
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
