// import { validateField, validateFieldEN } from '@fuse/core/DtpConfig';
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
// import * as Yup from 'yup';

export default function CustomForm({ actionLoading }) {
	// const initial = {
	// 	id: '',
	// 	group: null,
	// 	role: null,
	// 	level: [
	// 		{ level: 1, name: '', value: '' },
	// 		{ level: 2, name: '', value: '' }
	// 	]
	// };
	const handleSubmitForm = values => {
		console.log(values);
	};
	return (
		<Formik
			// validationSchema={validateSchema}
			// enableReinitialize
			// initialValues={initialState}
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
								placeholder="Chọn nội dung"
								width="90.1%"
								name="group"
								options={[]}
								component={AntSelectCustom}
							/>{' '}
							<Field
								position="right"
								label="Quyền"
								placeholder="Chọn nội dung"
								width="90.1%"
								hasFeedback
								name="role"
								options={[]}
								component={AntSelectCustom}
							/>
						</div>

						<Text color="primary" type="subTitle" borderBottom>
							CẤP ĐỘ CHI TIẾT
						</Text>
						<Grid container spacing={2}>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									hasFeedback
									position="right"
									placeholder="Chọn nội dung"
									label="Cấp 1"
									name="level[0].name"
									options={[]}
									component={AntSelectCustom}
								/>
							</Grid>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									position="right"
									placeholder="Chọn nội dung"
									name="level[0].value"
									component={AntSelectCustom}
									options={[]}
								/>
							</Grid>
						</Grid>

						<Grid container spacing={2}>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									position="right"
									label="Cấp 2"
									name="level[1].name"
									placeholder="Chọn nội dung"
									options={[]}
									component={AntSelectCustom}
								/>
							</Grid>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									placeholder="Chọn nội dung"
									position="right"
									name="level[1].value"
									component={AntSelectCustom}
									options={[]}
								/>
							</Grid>
						</Grid>

						<Grid container spacing={2}>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									position="right"
									label="Cấp 3"
									placeholder="Chọn nội dung"
									name="level[1].name"
									options={[]}
									component={AntSelectCustom}
								/>
							</Grid>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									placeholder="Chọn nội dung"
									position="right"
									name="level[1].value"
									component={AntSelectCustom}
									options={[]}
								/>
							</Grid>
						</Grid>

						<Grid container spacing={2}>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									position="right"
									label="Cấp 4"
									placeholder="Chọn nội dung"
									name="level[1].name"
									options={[]}
									component={AntSelectCustom}
								/>
							</Grid>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									placeholder="Chọn nội dung"
									position="right"
									name="level[1].value"
									component={AntSelectCustom}
									options={[]}
								/>
							</Grid>
						</Grid>

						<Grid container spacing={2}>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									placeholder="Chọn nội dung"
									position="right"
									label="Cấp 5"
									name="level[1].name"
									options={[]}
									component={AntSelectCustom}
								/>
							</Grid>
							<Grid item lg={6} md={6} sm={6} xs={6}>
								<Field
									placeholder="Chọn nội dung"
									position="right"
									name="level[1].value"
									component={AntSelectCustom}
									options={[]}
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
						<Button className="button__cancle" variant="contained" color="secondary">
							<Text type="button">Cancel</Text>
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
