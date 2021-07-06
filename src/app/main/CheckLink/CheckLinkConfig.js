import { authRoles } from 'app/auth';
import CheckLink from './CheckLink';

const CheckLinkConfig = {
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
			path: '/check-Link',
			component: CheckLink
		}
	]
};

export default CheckLinkConfig;
