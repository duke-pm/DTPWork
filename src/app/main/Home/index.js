import { getRoleCookies, getToken } from '@fuse/core/DtpConfig';
import { logoutUser } from 'app/auth/store/userSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {
	const dispatch = useDispatch();
	const token = getToken();
	const roles = getRoleCookies();
	useEffect(() => {
		if (!token || !roles) {
			dispatch(logoutUser());
		}
	}, [token, roles, dispatch]);
	return <div className="home w-full h-full" style={{ backgroundColor: '#fff' }} />;
}
