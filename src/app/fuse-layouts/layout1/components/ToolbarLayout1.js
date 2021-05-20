/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import { Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import FullScreenToggle from '../../shared-components/FullScreenToggle';

const useStyles = makeStyles(theme => ({
	root: {}
}));
function convertToVietNamese(array) {
	console.log(array);
	return array.map(word => {
		switch (word) {
			case 'tai-san':
				return 'Quản lý tài sản';
			case 'xet-duyet':
				return 'Danh sách đề xuất';
			case 'de-xuat-can-xu-ly':
				return 'Đề xuất cần xử lý';
			case 'quan-tri':
				return 'Quản trị';
			case 'nhom-nguoi-dung':
				return 'Nhóm người dùng';
			case 'danh-sach-nguoi-dung':
				return 'Danh sách người dùng';
			case 'thiet-lap-menu':
				return 'Thiết lập menu';
			case 'yeu-cau-cap-phat':
				return 'Yêu cầu cấp phát';
			case 'bao-mat-hong-tai-san':
				return 'Báo mất/hỏng tài sản';
			default:
				break;
		}
	});
}
function ToolbarLayout1(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const toolbarTheme = useSelector(selectToolbarTheme);
	const classes = useStyles(props);
	const location = useLocation();
	const pathSplitted = location.pathname.split('/').splice(1);
	const breadcumb = convertToVietNamese(pathSplitted).join(' > ');
	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className={clsx(classes.root, 'flex relative z-10 shadow-md')}
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.paper }}
			>
				<Toolbar className="p-0 min-h-48 md:min-h-64">
					{config.navbar.display && config.navbar.position === 'left' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
						</Hidden>
					)}

					<div className="flex  items-center px-16 flex-1">
						<Typography component="span" className="font-bold flex text-lg	">
							{breadcumb}
						</Typography>
					</div>

					<div className="flex items-center px-16">
						<FullScreenToggle />
						<UserMenu />
					</div>

					{config.navbar.display && config.navbar.position === 'right' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton />
						</Hidden>
					)}
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(ToolbarLayout1);
