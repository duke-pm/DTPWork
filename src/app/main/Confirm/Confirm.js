import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import * as Yup from 'yup';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import { validateField } from '@fuse/core/DtpConfig';
import { Link } from 'react-router-dom';

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
	email: '',
	password: ''
};
function Confirm() {
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
									<img className="logo-icon w-96" src="assets/email.png" alt="logo" />
								</div>
							</FuseAnimate>
							<FuseAnimate delay={500}>
								<h3 className="mt-8 mb-32">Xác nhận địa chỉ email của bạn.</h3>
							</FuseAnimate>
							<div className="w-full m-0">
								<div className="flex flex-col items-center">
									<p className="text-gray-400"> Một email xác nhận đã gửi đến.</p>
									<p> Chaulinh.se.it@gmail.com</p>
								</div>
								<div className="flex flex-col items-center">
									<p className="text-gray-400 text-center">
										{' '}
										Kiểm tra hộp thư đến của bạn và nhấp vào liên kết "Xác nhận email của tôi" để
										xác nhận địa chỉ email của bạn.
									</p>
								</div>
							</div>
						</CardContent>
						<div className="flex flex-col items-center justify-center pb-32">
							<Link
								style={{ textDecoration: 'none', color: '#40a9ff' }}
								className="font-medium mt-8"
								to="/login"
							>
								Quay lại đăng nhập
							</Link>
						</div>
					</Card>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default Confirm;
