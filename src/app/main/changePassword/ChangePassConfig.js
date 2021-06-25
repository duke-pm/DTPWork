import { authRoles } from 'app/auth';
import ChangePass from './ChangePass';

const ChangePassConfig = {
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
			path: '/doi-mat-khau',
			component: ChangePass
		}
	]
};

export default ChangePassConfig;
