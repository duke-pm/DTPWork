import * as requestFrom from './navigationCrud';

export const fetchsNavigationGlobal = () => dispatch => {
	return requestFrom
		.fetchsNavigationGlobal()
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
};
export const fetchsNavigation = () => dispatch => {
	return requestFrom
		.fetchsNavigation()
		.then(res => {
			console.log(res);
		})
		.catch(error => {
			console.log(error);
		});
};
export const updatedRoleNavigation = data => dispatch => {
	return requestFrom
		.updatedRoleNavigation(data)
		.then(res => {
			console.log(res);
		})
		.catch(error => {
			console.log(error);
		});
};
