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
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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
					<Typography component="span" className="font-bold flex text-white">
						{dataUser.userName || ''}
					</Typography>
					<Typography className="text-11 capitalize text-white" color="textSecondary">
						{dataUser.jobTitle || ''}
					</Typography>
				</div>
				<Avatar size={32} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
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
						<ListItemText primary="????ng xu???t" />
					</MenuItem>
					<MenuItem onClick={handleOpenForm} role="button">
						<ListItemIcon className="min-w-40">
							<Icon>cached</Icon>
						</ListItemIcon>
						<ListItemText primary="?????i m???t kh???u" />
					</MenuItem>
				</>
			</Popover>
		</>
	);
}

export default UserMenu;
