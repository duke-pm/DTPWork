import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button } from '@material-ui/core';
import React from 'react';

export default function SettingMenuHeader({ handleOpenSettingMenu }) {
	return (
		<div>
			<FuseAnimate animation="transition.slideLeftIn" delay={300}>
				<div className="flex flex-col sm:flex-row justify-end">
					<Button
						onClick={handleOpenSettingMenu}
						className="mt-8 sm:mt-0 max-w-sm md:max-w-lg h-26"
						variant="contained"
						color="primary"
					>
						{' '}
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
						Thêm mới
					</Button>{' '}
				</div>
			</FuseAnimate>
		</div>
	);
}
