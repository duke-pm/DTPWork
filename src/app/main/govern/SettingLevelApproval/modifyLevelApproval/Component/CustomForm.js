import { validateField } from '@fuse/core/DtpConfig';
// import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
// import AntdCustomCheckbox from '@fuse/FormBookingCustom/AntdCustomCheckbox';
// import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
// import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntSelectCustom from '@fuse/FormBookingCustom/AntSelectCustom';
// import AntSelectMultiCustom from '@fuse/FormBookingCustom/AntSelectMultiCustom';
import { Button, Grid } from '@material-ui/core';
import Text from 'app/components/Text';
import { Spin } from 'antd';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import * as Yup from 'yup';

export default function CustomForm({
	actionLoading,
	groupUser,
	roles,
	titleApproval,
	users,
	ExitPage,
	handleSubmitApproval,
	entitiesEdit,
	setIsChange
}) {
	let initial = {
		id: '',
		groupID: '',
		roleID: '',
		notes: '',
		isChanged: true,
		levels: [
			{ LevelID: 1, UserID: '', TitleID: '' },
			{ LevelID: 2, UserID: '', TitleID: '' },
			{ LevelID: 3, UserID: '', TitleID: '' },
			{ LevelID: 4, UserID: '', TitleID: '' },
			{ LevelID: 5, UserID: '', TitleID: '' }
		]
	};
	if (entitiesEdit) {
		initial = {
			id: entitiesEdit?.absID,
			groupID: entitiesEdit?.groupID,
			roleID: entitiesEdit?.roleID,
			notes: entitiesEdit?.notes,
			levels: [
				{
					LevelID: 1,
					UserID: entitiesEdit?.listLevel?.[0].userID !== 0 ? entitiesEdit?.listLevel?.[0].userID : '',
					TitleID: entitiesEdit?.listLevel?.[0].titleID !== 0 ? entitiesEdit?.listLevel?.[0].titleID : ''
				},
				{
					LevelID: 2,
					UserID: entitiesEdit?.listLevel?.[1].userID !== 0 ? entitiesEdit?.listLevel?.[1].userID : '',
					TitleID: entitiesEdit?.listLevel?.[1].titleID !== 0 ? entitiesEdit?.listLevel?.[1].titleID : ''
				},
				{
					LevelID: 3,
					UserID: entitiesEdit?.listLevel?.[2].userID !== 0 ? entitiesEdit?.listLevel?.[2].userID : '',
					TitleID: entitiesEdit?.listLevel?.[2].titleID !== 0 ? entitiesEdit?.listLevel?.[2].titleID : ''
				},
				{
					LevelID: 4,
					UserID: entitiesEdit?.listLevel?.[3].userID !== 0 ? entitiesEdit?.listLevel?.[3].userID : '',
					TitleID: entitiesEdit?.listLevel?.[3].titleID !== 0 ? entitiesEdit?.listLevel?.[3].titleID : ''
				},
				{
					LevelID: 5,
					UserID: entitiesEdit?.listLevel?.[4].userID !== 0 ? entitiesEdit?.listLevel?.[4].userID : '',
					TitleID: entitiesEdit?.listLevel?.[4].titleID !== 0 ? entitiesEdit?.listLevel?.[4].titleID : ''
				}
			]
		};
	}
	const handleSubmitForm = values => {
		handleSubmitApproval(values);
	};
	const handleChange = value => {
		setIsChange(true);
	};
	const validationSchema = Yup.object().shape({
		groupID: Yup.string().required(`${validateField}`),
		roleID: Yup.string().required(`${validateField}`)
	});
	return (
		<Formik
			validationSchema={validationSchema}
			enableReinitialize
			initialValues={initial}
			onSubmit={values => {
				handleSubmitForm(values);
			}}
		>
			{({ handleSubmit, isSubmitting }) => (
				<Form>
					<div className="mt-8">
						<Text color="primary" type="subTitle" borderBottom>
							QUYỀN
						</Text>
						<div className="grid grid-cols-1 gap-8">
							<Field
								position="right"
								label="Nhóm"
								hasFeedback
								placeholder="Chọn nội dung"
								width="90.1%"
								name="groupID"
								options={groupUser}
								component={AntSelectCustom}
							/>{' '}
							<Field
								position="right"
								label="Quyền"
								placeholder="Chọn nội dung"
								width="90.1%"
								hasFeedback
								name="roleID"
								options={roles}
								component={AntSelectCustom}
							/>
						</div>

						<Text color="primary" type="subTitle" borderBottom>
							CẤP ĐỘ CHI TIẾT
						</Text>
						<Grid container spacing={2}>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									position="right"
									placeholder="Chọn nội dung"
									label="Cấp 1"
									name="levels[0].UserID"
									options={users}
									handleChangeState={handleChange}
									component={AntSelectCustom}
								/>
							</Grid>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									position="right"
									placeholder="Chọn nội dung"
									name="levels[0].TitleID"
									handleChangeState={handleChange}
									component={AntSelectCustom}
									options={titleApproval}
								/>
							</Grid>
						</Grid>

						<Grid container spacing={2}>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									position="right"
									label="Cấp 2"
									name="levels[1].UserID"
									handleChangeState={handleChange}
									placeholder="Chọn nội dung"
									options={users}
									component={AntSelectCustom}
								/>
							</Grid>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									placeholder="Chọn nội dung"
									position="right"
									handleChangeState={handleChange}
									name="levels[1].TitleID"
									component={AntSelectCustom}
									options={titleApproval}
								/>
							</Grid>
						</Grid>

						<Grid container spacing={2}>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									position="right"
									label="Cấp 3"
									placeholder="Chọn nội dung"
									name="levels[2].UserID"
									options={users}
									handleChangeState={handleChange}
									component={AntSelectCustom}
								/>
							</Grid>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									placeholder="Chọn nội dung"
									position="right"
									name="levels[2].TitleID"
									handleChangeState={handleChange}
									component={AntSelectCustom}
									options={titleApproval}
								/>
							</Grid>
						</Grid>

						<Grid container spacing={2}>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									position="right"
									label="Cấp 4"
									placeholder="Chọn nội dung"
									name="levels[3].UserID"
									handleChangeState={handleChange}
									options={users}
									component={AntSelectCustom}
								/>
							</Grid>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									placeholder="Chọn nội dung"
									position="right"
									handleChangeState={handleChange}
									name="levels[3].TitleID"
									component={AntSelectCustom}
									options={titleApproval}
								/>
							</Grid>
						</Grid>

						<Grid container spacing={2}>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									placeholder="Chọn nội dung"
									position="right"
									label="Cấp 5"
									handleChangeState={handleChange}
									name="levels[4].UserID"
									options={users}
									component={AntSelectCustom}
								/>
							</Grid>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									placeholder="Chọn nội dung"
									position="right"
									name="levels[4].TitleID"
									handleChangeState={handleChange}
									component={AntSelectCustom}
									options={titleApproval}
								/>
							</Grid>
						</Grid>
						<Text color="primary" type="subTitle" borderBottom>
							NỘI DUNG
						</Text>
						<Grid container spacing={2}>
							<Grid item lg={12} md={12} sm={12} xs={12}>
								<Field
									label="Mô tả"
									position
									width="90.3%"
									count={3}
									name="notes"
									component={AntDescriptionsCustom}
								/>
							</Grid>
						</Grid>
					</div>
					<div className="flex items-center justify-end">
						{actionLoading ? (
							<Spin className="ml-20" />
						) : (
							<Button type="submit" className="button__cancle mr-8" variant="contained" color="primary">
								<Text type="button" color="white">
									Save
								</Text>
							</Button>
						)}
						<Button onClick={ExitPage} className="button__cancle" variant="contained" color="secondary">
							<Text type="button">Cancel</Text>
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
