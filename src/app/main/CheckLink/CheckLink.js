/* eslint-disable jsx-a11y/anchor-is-valid */
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { logoutUser } from 'app/auth/store/userSlice';
import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux';

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
function CheckLink() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const handleDisPatchLogin = () => {
		dispatch(logoutUser());
	};
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
									<img className="logo-icon w-96" src="assets/pngegg.png" alt="logo" />
								</div>
							</FuseAnimate>
							<FuseAnimate delay={500}>
								<h3 className="mt-8 mb-32">Change password timeout.</h3>
							</FuseAnimate>
							<div className="w-full m-0">
								<div className="flex flex-col items-center">
									<p className="text-gray-400 text-center">
										Your password change link has expired, please try again by going back to login,
										click link forgot password and enter your email and then check your inbox to get
										new link to change password.
									</p>
								</div>
							</div>
						</CardContent>
						<div className="flex flex-col items-center justify-center pb-32">
							<Link
								style={{ textDecoration: 'none', color: '#40a9ff' }}
								className="font-medium mt-8"
								onClick={handleDisPatchLogin}
							>
								Go back to login.
							</Link>
						</div>
					</Card>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default CheckLink;
