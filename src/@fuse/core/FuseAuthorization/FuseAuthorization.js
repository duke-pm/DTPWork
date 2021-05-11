/* eslint-disable no-shadow */
import FuseUtils from '@fuse/utils';
import AppContext from 'app/AppContext';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import { getRoleCookies, getToken } from '../DtpConfig';
import FuseSplashScreen from '../FuseSplashScreen';

class FuseAuthorization extends Component {
	constructor(props, context) {
		super(props);
		const { routes } = context;
		this.state = {
			accessGranted: true,
			routes
		};
	}

	componentDidMount() {
		if (!this.state.accessGranted) {
			this.redirectRoute();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.accessGranted !== this.state.accessGranted;
	}

	componentDidUpdate() {
		if (!this.state.accessGranted) {
			this.redirectRoute();
		}
	}

	static getDerivedStateFromProps(props, state) {
		const { location } = props;
		const role = getRoleCookies();
		const { pathname } = location;

		const matched = matchRoutes(state.routes, pathname)[0];

		return {
			accessGranted: matched ? FuseUtils.hasPermission(matched.route.auth, role) : true
		};
	}

	redirectRoute() {
		const role = getRoleCookies();
		const token = getToken();
		const { location, history } = this.props;
		const { pathname, state } = location;
		const redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/';

		/*
        User is guest
        Redirect to Login Page
        */
		if (!role || !token) {
			history.push({
				pathname: '/login',
				state: { redirectUrl: pathname }
			});
		} else {
			/*
        User is member
        User must be on unAuthorized page or just logged in
        Redirect to dashboard or redirectUrl
        */
			history.push({
				pathname: redirectUrl
			});
		}
	}

	render() {
		// console.info('Fuse Authorization rendered', accessGranted);
		return this.state.accessGranted ? (
			<React.Suspense fallback={<FuseSplashScreen />}>{this.props.children}</React.Suspense>
		) : null;
	}
}

function mapStateToProps({ auth }) {
	return {
		userRole: auth.user.userName
	};
}

FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(FuseAuthorization));
