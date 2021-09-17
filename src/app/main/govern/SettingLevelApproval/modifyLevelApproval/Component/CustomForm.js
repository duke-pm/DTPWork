// import { validateField, validateFieldEN } from '@fuse/core/DtpConfig';
// import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
// import AntdCustomCheckbox from '@fuse/FormBookingCustom/AntdCustomCheckbox';
// import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
// import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntSelectCustom from '@fuse/FormBookingCustom/AntSelectCustom';
// import AntSelectMultiCustom from '@fuse/FormBookingCustom/AntSelectMultiCustom';
import { Button, Typography } from '@material-ui/core';
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
						<div className="flex justify-between flex-row">
							<Typography color="primary" variant="subtitle2" className="mb-20">
								QUYỀN
							</Typography>
						</div>
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
						<div className="flex justify-between flex-row">
							<Typography color="primary" variant="subtitle2" className="mb-20">
								CẤP ĐỘ CHI TIẾT
							</Typography>
						</div>
						<div className="grid grid-cols-2 gap-8">
							<Field
								hasFeedback
								position="right"
								placeholder="Chọn nội dung"
								label="Cấp 1"
								name="level[0].name"
								options={[]}
								component={AntSelectCustom}
							/>
							<Field
								position="right"
								placeholder="Chọn nội dung"
								name="level[0].value"
								component={AntSelectCustom}
								options={[]}
							/>
						</div>
						<div className="grid grid-cols-2 gap-8">
							<Field
								position="right"
								label="Cấp 2"
								name="level[1].name"
								placeholder="Chọn nội dung"
								options={[]}
								component={AntSelectCustom}
							/>
							<Field
								placeholder="Chọn nội dung"
								position="right"
								name="level[1].value"
								component={AntSelectCustom}
								options={[]}
							/>
						</div>
						<div className="grid grid-cols-2 gap-8">
							<Field
								position="right"
								label="Cấp 3"
								placeholder="Chọn nội dung"
								name="level[1].name"
								options={[]}
								component={AntSelectCustom}
							/>
							<Field
								placeholder="Chọn nội dung"
								position="right"
								name="level[1].value"
								component={AntSelectCustom}
								options={[]}
							/>
						</div>
						<div className="grid grid-cols-2 gap-8">
							<Field
								position="right"
								label="Cấp 4"
								placeholder="Chọn nội dung"
								name="level[1].name"
								options={[]}
								component={AntSelectCustom}
							/>
							<Field
								placeholder="Chọn nội dung"
								position="right"
								name="level[1].value"
								component={AntSelectCustom}
								options={[]}
							/>
						</div>
						<div className="grid grid-cols-2 gap-8">
							<Field
								placeholder="Chọn nội dung"
								position="right"
								label="Cấp 5"
								name="level[1].name"
								options={[]}
								component={AntSelectCustom}
							/>
							<Field
								placeholder="Chọn nội dung"
								position="right"
								name="level[1].value"
								component={AntSelectCustom}
								options={[]}
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
						<Button className="button__cancle" variant="contained" color="secondary">
							<Typography variant="body2"> Cancel </Typography>
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
