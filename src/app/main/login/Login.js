import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { TextFieldFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Icon, IconButton, InputAdornment } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import { showMessage } from 'app/store/fuse/messageSlice';

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

function Login() {
	const classes = useStyles();
	const login = useSelector(({ auth }) => auth.login);

	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const formRef = useRef(null);

	useEffect(() => {
		if (login.error) {
			dispatch(showMessage({ message: 'Tài khoản và mật khẩu không đúng' }));
		}
	});

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}
	const dispatch = useDispatch();
	function handleSubmit(model) {
		dispatch(submitLogin(model));
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
									<img className="logo-icon w-48" src="assets/images/logos/fuse.svg" alt="logo" />
									<div className="border-l-1 mr-4 w-1 h-40" />
									<div>
										<Typography className="text-24 font-800 logo-text" color="inherit">
											FUSE
										</Typography>
										<Typography
											className="text-16 tracking-widest -mt-8 font-700"
											color="textSecondary"
										>
											REACT
										</Typography>
									</div>
								</div>
							</FuseAnimate>
							<div className="w-full">
								<Formsy
									onValidSubmit={handleSubmit}
									onValid={enableButton}
									onInvalid={disableButton}
									ref={formRef}
									className="flex flex-col justify-center w-full"
								>
									<TextFieldFormsy
										className="mb-16"
										type="text"
										name="email"
										label="Username/Email"
										validations={{
											minLength: 4
										}}
										validationErrors={{
											minLength: 'Min character length is 4'
										}}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Icon className="text-20" color="action">
														email
													</Icon>
												</InputAdornment>
											)
										}}
										variant="outlined"
										required
									/>

									<TextFieldFormsy
										className="mb-16"
										type="password"
										name="password"
										label="Password"
										validations={{
											minLength: 4
										}}
										validationErrors={{
											minLength: 'Min character length is 4'
										}}
										InputProps={{
											className: 'pr-2',
											type: showPassword ? 'text' : 'password',
											endAdornment: (
												<InputAdornment position="end">
													<IconButton onClick={() => setShowPassword(!showPassword)}>
														<Icon className="text-20" color="action">
															{showPassword ? 'visibility' : 'visibility_off'}
														</Icon>
													</IconButton>
												</InputAdornment>
											)
										}}
										variant="outlined"
										required
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
										aria-label="LOG IN"
										disabled={!isFormValid}
										value="legacy"
									>
										Login
									</Button>
								</Formsy>
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
