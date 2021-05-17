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
					<svg
						className="h-16 w-16"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span className="hidden sm:flex">Thêm menu mới</span>
				</Button>
			</FuseAnimate>
		</div>
	);
}
