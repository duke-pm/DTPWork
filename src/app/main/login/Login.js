import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { Formik, Form, Field } from 'formik';
import { AntInputPassword, AntInput } from '@fuse/CustomForm/CreateAntField';

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
function Login() {
	const checkValidateForm = Yup.object().shape({
		email: Yup.string().required('Không được để trống'),
		password: Yup.string().required('Mật khẩu được để trống')
	});
	const classes = useStyles();
	const login = useSelector(({ auth }) => auth.login);

	useEffect(() => {
		if (login.error) {
			dispatch(showMessage({ message: 'Tài khoản và mật khẩu không đúng' }));
		}
	});

	const dispatch = useDispatch();
	function handleSubmitForm(values) {
		dispatch(submitLogin(values));
	}
	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					<Card
						className={clsx(
							classes.leftSection,
							'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
						)}
						square
					>
						<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
							<FuseAnimate delay={300}>
								<div className="flex items-center mb-32">
									<img className="logo-icon w-96" src="assets/images/logo_DTP-01.png" alt="logo" />
								</div>
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
												label="Tài khoản "
												name="email"
												component={AntInput}
												type="text"
												hasFeedback
											/>
											<Field
												name="password"
												label="Mật khẩu"
												component={AntInputPassword}
												type="password"
												hasFeedback
											/>
											{login.error && (
												<FuseAnimate delay={300}>
													<p className="text-red"> {login.error} </p>
												</FuseAnimate>
											)}
											<Button
												type="submit"
												variant="contained"
												color="primary"
												className="w-full mx-auto mt-16"
											>
												Login
											</Button>
										</Form>
									)}
								</Formik>
							</div>
						</CardContent>
					</Card>

					<div
						className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}
					>
						<div className="max-w-320">
							<FuseAnimate animation="transition.slideUpIn" delay={400}>
								<Typography variant="h3" color="inherit" className="font-800 leading-tight">
									Welcome <br />
									to the <br /> FUSE React!
								</Typography>
							</FuseAnimate>

							<FuseAnimate delay={500}>
								<Typography variant="subtitle1" color="inherit" className="mt-32">
									Powerful and professional admin template for Web Applications, CRM, CMS, Admin
									Panels and more.
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default Login;
