import { authRoles } from 'app/auth';
import Confirm from './Confirm';

const ConfimPassConfig = {
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
			path: '/check-mail',
			component: Confirm
		}
	]
};

export default ConfimPassConfig;
