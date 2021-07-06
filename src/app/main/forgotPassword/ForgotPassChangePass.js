import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import * as Yup from 'yup';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { notificationConfig, validateFieldEN } from '@fuse/core/DtpConfig';
import { Spin } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import InputMaterialUi from '@fuse/CustomForm/InputMaterialUi';
import { changePasswordPublic, checkToken } from 'app/auth/store/forgotPasswordSlice';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { logoutUser, logoutUserDoneRedirect } from 'app/auth/store/userSlice';

// import Auth0LoginTab from './tabs/Auth0LoginTab';
// import FirebaseLoginTab from './tabs/FirebaseLoginTab';
// import JWTLoginTab from './tabs/JWTLoginTab';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to bottom, #0F2027 0%, #203A43 50%, #2C5364 100% )`,
		// backgroundColor: '#f0f0f0',
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
	password: '',
	passwordConfirm: ''
};
function ForgotPassChangePass() {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [error, setError] = useState(false);
	const checkValidateForm = Yup.object().shape({
		password: Yup.string().required(validateFieldEN),
		passwordConfirm: Yup.string()
			.required(validateFieldEN)
			.oneOf([Yup.ref('password'), null], 'Password does not match')
	});
	const params = useParams();
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(logoutUserDoneRedirect());
		if (params.detail) {
			dispatch(checkToken(params.detail)).then(data => {
				if (data.isError) {
					history.push('/check-link');
				}
			});
		}
	}, [params.detail]);
	function handleSubmitForm(values) {
		setConfirmLoading(true);
		dispatch(changePasswordPublic(values, params.detail)).then(data => {
			if (data && !data.isError) {
				setConfirmLoading(false);
				dispatch(logoutUser());
				notificationConfig(
					'success',
					notificationContent.content.en.success,
					notificationContent.description.forgotPasswor.success
				);
			} else {
				history.push('/check-link');
				setError(true);
				setConfirmLoading(false);
			}
		});
	}
	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 rounded-12 shadow-2xl overflow-hidden">
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
									<img className="logo-icon w-96" src="assets/images/logo_DTP-01.png" alt="logo" />
								</div>
							</FuseAnimate>
							<FuseAnimate delay={500}>
								<h2 className="mt-8 mb-32">Reset your password</h2>
							</FuseAnimate>
							<div className="w-full">
								<Formik
									enableReinitialize
									validationSchema={checkValidateForm}
									initialValues={initialState}
									onSubmit={values => {
										handleSubmitForm(values);
									}}
								>
									{({ handleSubmit, isSubmitting }) => (
										<Form>
											<Field
												label="New password"
												name="password"
												component={InputMaterialUi}
												type="password"
												hasFeedback
											/>
											<Field
												label="Confirm new password "
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
													Reset password
												</Button>
											)}
										</Form>
									)}
								</Formik>
							</div>
						</CardContent>
						{error && (
							<div className="flex flex-col items-center justify-center pb-32">
								<Link
									style={{ textDecoration: 'none', color: '#40a9ff' }}
									className="font-medium mt-8"
									to="/forgotPassword"
								>
									Go back to forgot password
								</Link>
							</div>
						)}
					</Card>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default ForgotPassChangePass;
