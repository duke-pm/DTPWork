import { authRoles } from 'app/auth';
import ForgotPass from './ForgotPass';

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
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/forgotPassword',
			component: ForgotPass
		}
	]
};

export default ForgotPassConfig;
