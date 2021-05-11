import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Icon } from '@material-ui/core';
import React from 'react';

export default function SettingMenuHeader({ handleOpenSettingMenu }) {
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">menu</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<h3 className="hidden sm:flex mx-0 sm:mx-12 text-white">Thiết lập menu</h3>
				</FuseAnimate>
			</div>
			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					onClick={handleOpenSettingMenu}
					className="whitespace-nowrap"
					variant="contained"
					color="secondary"
				>
					<span className="hidden sm:flex">Thêm menu mới</span>
				</Button>
			</FuseAnimate>
		</div>
	);
}
