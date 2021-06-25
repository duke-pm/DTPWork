import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import * as Yup from 'yup';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import { Formik, Form, Field } from 'formik';
import { validateField } from '@fuse/core/DtpConfig';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import InputMaterialUi from '@fuse/CustomForm/InputMaterialUi';

// import Auth0LoginTab from './tabs/Auth0LoginTab';
// import FirebaseLoginTab from './tabs/FirebaseLoginTab';
// import JWTLoginTab from './tabs/JWTLoginTab';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
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
	email: '',
	password: ''
};
function ChangePass() {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const checkValidateForm = Yup.object().shape({
		email: Yup.string().required(`${validateField}`),
		password: Yup.string().required(`${validateField}`)
	});
	const classes = useStyles();
	const login = useSelector(({ auth }) => auth.login);
	const dispatch = useDispatch();
	function handleSubmitForm(values) {
		setConfirmLoading(true);
		dispatch(submitLogin(values)).then(user => {
			if (user && user.access_token) {
				setConfirmLoading(false);
			} else {
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
						<CardContent className="flex flex-col items-center justify-center w-full py-80 max-w-320">
							<FuseAnimate delay={300}>
								<div className="flex items-center">
									<img className="logo-icon w-96" src="assets/images/logo_DTP-01.png" alt="logo" />
								</div>
							</FuseAnimate>
							<FuseAnimate delay={500}>
								<h3 className="mt-8 mb-32">Reset your password.</h3>
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
												label="Email"
												name="email"
												component={InputMaterialUi}
												type="text"
												hasFeedback
											/>
											<Field
												label="Password"
												name="password"
												component={InputMaterialUi}
												type="password"
												hasFeedback
											/>
											<Field
												label="Password (Confirm)"
												name="passwordConfirm"
												component={InputMaterialUi}
												type="password"
												hasFeedback
											/>
											{login.error && (
												<FuseAnimate delay={300}>
													<p className="text-red"> {login.error} </p>
												</FuseAnimate>
											)}
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
						<div className="flex flex-col items-center justify-center pb-32">
							<Link
								style={{ textDecoration: 'none', color: '#40a9ff' }}
								className="font-medium mt-8"
								to="/login"
							>
								Go back to login
							</Link>
						</div>
					</Card>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default ChangePass;
