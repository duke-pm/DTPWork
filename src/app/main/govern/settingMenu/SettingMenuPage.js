import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Box, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormMenuComponent from './SettingMenuComponent/FormMenuComponent';
import SettingMenuContent from './SettingMenuComponent/SettingMenuContent';
import * as actions from './_redux/menuActions';

export default function SettingMenuPage() {
	const dispatch = useDispatch();
	const [openSettingMenu, setOpenSettingMenu] = useState(false);
	const handleOpenSettingMenu = () => {
		setOpenSettingMenu(true);
		dispatch(actions.setTaskEditMenuSetting(null));
	};
	return (
		<>
			<FormMenuComponent setOpenSettingMenu={setOpenSettingMenu} openSettingMenu={openSettingMenu} />
			<FusePageCarded
				classes={{
					// content: 'flex',
					header: 'min-h-10 h-10	sm:h-16 sm:min-h-16'
				}}
				header={
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-1 flex-col items-center sm:items-start">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="text-16 sm:text-20 truncate"
									// component={Link}
									// role="button"
									// to="/apps/e-commerce/orders"
									color="inherit"
								>
									{/* {xhtm} */}
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				}
				contentToolbar={
					<div className="flex  items-center px-16 flex-1">
						<Typography component="span" className="font-bold flex text-sm	">
							Thiết lập menu
						</Typography>
					</div>
				}
				content={
					<Box p={3}>
						<SettingMenuContent
							setOpenSettingMenu={setOpenSettingMenu}
							handleOpenSettingMenu={handleOpenSettingMenu}
						/>
					</Box>
				}
				innerScroll
			/>
		</>
	);
}
