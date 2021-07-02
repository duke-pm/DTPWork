import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'app/auth/store/userSlice';
import { getDataUserLocalStorage } from '@fuse/core/DtpConfig';
import { useHistory } from 'react-router';

function UserMenu(props) {
	const history = useHistory();
	const dispatch = useDispatch();
	const [userMenu, setUserMenu] = useState(null);
	// const [formChange, setFormChange] = useState(false);
	const dataUser = getDataUserLocalStorage();
	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};
	const handleOpenForm = () => {
		// setUserMenu(null);
		// setFormChange(true);
		history.push('/thong-tin-nguoi-dung');
	};
	const handlelogoutUser = () => {
		dispatch(logoutUser());
	};
	return (
		<>
			{/* <ChangePassword formChange={formChange} setFormChange={setFormChange} /> */}
			<Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={userMenuClick}>
				<div className="hidden md:flex flex-col mx-4 items-end">
					<Typography component="span" className="font-bold flex">
						{dataUser.userName || ''}
					</Typography>
					<Typography className="text-11 capitalize" color="textSecondary">
						{/* {user.userName ? user.userName.toString() : 'ADMIN'}
						{(!user.userName || (Array.isArray(user.userName) && user.userName.length === 0)) && 'Guest'} */}
						{dataUser.jobTitle || ''}
					</Typography>
				</div>

				{/* {user.data.photoURL ? (
					<Avatar className="md:mx-4" alt="user photo" src={user.data.photoURL} />
				) : (
					<Avatar className="md:mx-4">{user.data.displayName[0]}</Avatar>
				)} */}
			</Button>
			<Popover
				style={{ zIndex: 19 }}
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
				<>
					<MenuItem onClick={handlelogoutUser} role="button">
						<ListItemIcon className="min-w-40">
							<Icon>exit_to_app</Icon>
						</ListItemIcon>
						<ListItemText primary="Đăng xuất" />
					</MenuItem>
					<MenuItem onClick={handleOpenForm} role="button">
						<ListItemIcon className="min-w-40">
							<Icon>cached</Icon>
						</ListItemIcon>
						<ListItemText primary="Đổi mật khẩu" />
					</MenuItem>
				</>
			</Popover>
		</>
	);
}

export default UserMenu;
