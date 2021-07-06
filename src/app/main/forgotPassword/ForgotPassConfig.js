import ForgotPass from './ForgotPass';
import ForgotPassChangePass from './ForgotPassChangePass';
// import ForgotPassChangePass from './ForgotPassChangePass';

const ForgotPassConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	// auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/changePassword/:detail',
			component: ForgotPassChangePass
		},
		{
			path: '/forgotPassword',
			component: ForgotPass
		}
	]
};

export default ForgotPassConfig;
