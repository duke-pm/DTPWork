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
					<div className="mt-8 px-16 sm:px-24">
						<div className="flex justify-between flex-row">
							<Typography color="primary" variant="body1" className="label--form--title mb-20">
								Quyền{' '}
							</Typography>
						</div>
						<div className="grid grid-cols-2 gap-8">
							<Field
								position="right"
								label="Nhóm"
								name="group"
								options={[]}
								hasFeedback
								component={AntSelectCustom}
							/>{' '}
							<Field
								position="right"
								label="Quyền"
								name="role"
								options={[]}
								component={AntSelectCustom}
							/>
						</div>
						<div className="flex justify-between flex-row">
							<Typography color="primary" variant="body1" className="label--form--title mb-20">
								Cấp độ chi tiết{' '}
							</Typography>
						</div>
						<div className="grid grid-cols-2 gap-8">
							<Field
								hasFeedback
								position="right"
								label="Cấp 1"
								name="level[0].name"
								options={[]}
								component={AntSelectCustom}
							/>
							<Field position="right" name="level[0].value" component={AntSelectCustom} options={[]} />
						</div>
						<div className="grid grid-cols-2 gap-8">
							<Field
								position="right"
								label="Cấp 2"
								name="level[1].name"
								options={[]}
								component={AntSelectCustom}
							/>
							<Field position="right" name="level[1].value" component={AntSelectCustom} options={[]} />
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
						<Button className="button__cancle mr-8" variant="contained" color="secondary">
							<Typography variant="body2"> Cancle </Typography>
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
