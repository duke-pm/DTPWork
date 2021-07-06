import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import * as Yup from 'yup';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { Spin } from 'antd';
import InputMaterialUi from '@fuse/CustomForm/InputMaterialUi';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { changePassword } from 'app/auth/store/changePasswordSlice';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { logoutUser } from 'app/auth/store/userSlice';

// import Auth0LoginTab from './tabs/Auth0LoginTab';
// import FirebaseLoginTab from './tabs/FirebaseLoginTab';
// import JWTLoginTab from './tabs/JWTLoginTab';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: '#fafafa',
		color: theme.palette.primary.contrastText
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));
const initialState = {
	oldPassword: '',
	newPassword: '',
	passwordConfirm: ''
};
function ChangePass() {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const checkValidateForm = Yup.object().shape({
		oldPassword: Yup.string().required('Old password is required'),
		newPassword: Yup.string().required('New password is required'),
		passwordConfirm: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
	});
	const classes = useStyles();
	const dispatch = useDispatch();
	function handleSubmitForm(values, resetForm) {
		if (values.oldPassword === values.newPassword) {
			notificationConfig('warning', 'Warning!!!', 'The new password matches the current password');
		} else {
			setConfirmLoading(true);
			dispatch(changePassword(values)).then(data => {
				if (data && !data.isError) {
					setConfirmLoading(false);
					resetForm();
					dispatch(logoutUser());
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.forgotPasswor.success
					);
				} else {
					setConfirmLoading(false);
					notificationConfig(
						'warning',
						notificationContent.content.en.faild,
						notificationContent.description.changePassword.faild
					);
				}
			});
		}
	}
	return (
		<FusePageCarded
			innerScroll
			classes={{
				// content: 'flex',
				header: 'min-h-10 h-10	sm:h-16 sm:min-h-16'
			}}
			header={
				<div className="flex flex-1 w-full items-center justify-between">
					<div className="flex flex-1 flex-col items-center sm:items-start">
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Typography
								className="text-16 sm:text-20 truncate"
								// component={Link}
								// role="button"
								// to="/apps/e-commerce/orders"
								color="inherit"
							>
								{/* {xhtm} */}
							</Typography>
						</FuseAnimate>
					</div>
				</div>
			}
			contentToolbar={
				<div className="flex  items-center px-16 flex-1">
					<Typography component="span" className="font-bold flex text-sm	">
						Update information
					</Typography>
				</div>
			}
			content={
				<div
					className={clsx(
						classes.root,
						'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24 h-full'
					)}
				>
					<FuseAnimate animation="transition.expandIn">
						<div className="flex w-full  max-w-400 rounded-12 shadow-xl overflow-hidden">
							<Card
								className={clsx(
									classes.leftSection,
									'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
								)}
								square
							>
								<CardContent className="flex flex-col items-center justify-center w-full py-60 max-w-320">
									<FuseAnimate delay={300}>
										<div className="flex items-center mb-32">
											<img
												className="logo-icon w-96"
												src="assets/images/logo_DTP-01.png"
												alt="logo"
											/>
										</div>
									</FuseAnimate>
									<FuseAnimate delay={500}>
										<h3 className="mt-8 mb-32">Reset your password</h3>
									</FuseAnimate>
									<div className="w-full">
										<Formik
											enableReinitialize
											validationSchema={checkValidateForm}
											initialValues={initialState}
											onSubmit={(values, { resetForm }) => {
												handleSubmitForm(values, resetForm);
											}}
										>
											{({ handleSubmit, isSubmitting }) => (
												<Form>
													<Field
														label="Old password"
														name="oldPassword"
														component={InputMaterialUi}
														type="password"
														hasFeedback
													/>
													<Field
														label="New password"
														name="newPassword"
														component={InputMaterialUi}
														type="password"
														hasFeedback
													/>
													<Field
														label="Confirm new password"
														name="passwordConfirm"
														component={InputMaterialUi}
														type="password"
														hasFeedback
													/>
													{confirmLoading ? (
														<Spin className="w-full mx-auto" />
													) : (
														<Button
															type="submit"
															variant="contained"
															color="primary"
															className="w-full mx-auto mt-16"
														>
															Reset my password
														</Button>
													)}
												</Form>
											)}
										</Formik>
									</div>
								</CardContent>
							</Card>
						</div>
					</FuseAnimate>
				</div>
			}
		/>
	);
}

export default ChangePass;
