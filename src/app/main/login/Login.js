import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import * as Yup from 'yup';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import { Formik, Form, Field } from 'formik';
import { validateFieldEN } from '@fuse/core/DtpConfig';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import InputMaterialUi from '@fuse/CustomForm/InputMaterialUi';
import CheckboxAntdCustom from '@fuse/CustomForm/CheckboxAntdCustom';
import InputMaterialUiUser from '@fuse/CustomForm/InputMaterialUiUser';
// import CryptoAES from 'crypto-js/aes';
// import CryptoENC from 'crypto-js/enc-utf8';

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
	email: '',
	password: '',
	remmber: false
};
function Login() {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const checkValidateForm = Yup.object().shape({
		email: Yup.string().required(`${validateFieldEN}`),
		password: Yup.string().required(`${validateFieldEN}`)
	});
	// const rememberLogin = JSON.parse(localStorage.getItem('rememberLogin')) || null;
	// if (rememberLogin !== null) {
	// 	// initialState = {
	// 	// 	email:
	// 	// }
	// }
	const classes = useStyles();
	const dispatch = useDispatch();
	function handleSubmitForm(values) {
		setConfirmLoading(true);
		dispatch(submitLogin(values)).then(user => {
			if (user?.tokenInfo?.access_token) {
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
							'flex flex-col w-full max-w-md items-center justify-center '
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
								<h2 className="mt-8 mb-32">Login to your account</h2>
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
												label="User name"
												name="email"
												component={InputMaterialUiUser}
												type="text"
												hasFeedback
											/>
											<Field
												name="password"
												label="Password"
												component={InputMaterialUi}
												type="password"
												hasFeedback
											/>
											<div className="flex flex-row justify-between ">
												<Field
													name="remmber"
													labelAligh="right"
													position="right"
													label="Remember Me"
													component={CheckboxAntdCustom}
												/>
												<Link
													to="/forgotPassword"
													style={{
														textDecoration: 'none',
														color: '#40a9ff'
													}}
													className="mt-8 mb-8"
												>
													Forgot password?
												</Link>
											</div>
											<div>
												{confirmLoading ? (
													<Spin className="w-full mx-auto" />
												) : (
													<Button
														type="submit"
														variant="contained"
														color="primary"
														className="w-full mx-auto mt-16"
													>
														Login
													</Button>
												)}
											</div>
										</Form>
									)}
								</Formik>
							</div>
						</CardContent>
					</Card>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default Login;
