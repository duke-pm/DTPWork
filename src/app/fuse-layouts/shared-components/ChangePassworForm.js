import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import * as Yup from 'yup';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Button, DialogContent } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import { Formik, Form, Field } from 'formik';
import { validateField } from '@fuse/core/DtpConfig';
import { Spin } from 'antd';
import InputMaterialUi from '@fuse/CustomForm/InputMaterialUi';

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
function ChangePassworForm() {
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
		<FuseAnimate animation="transition.expandIn">
			<DialogContent>
				<Card className={clsx('flex flex-col w-full max-w-sm items-center justify-center shadow-0')} square>
					<CardContent className="flex flex-col items-center justify-center w-full ml-72 max-w-320">
						<FuseAnimate delay={300}>
							<div className="flex items-center mb-16">
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
				</Card>
			</DialogContent>
		</FuseAnimate>
	);
}

export default ChangePassworForm;
