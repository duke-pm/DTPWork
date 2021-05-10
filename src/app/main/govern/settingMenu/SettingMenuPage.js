import FusePageCardedFix from '@fuse/core/FusePageCarded/FusePageCardedFix';
import React, { useState } from 'react';
import FormMenuComponent from './SettingMenuComponent/FormMenuComponent';
import SettingMenuContent from './SettingMenuComponent/SettingMenuContent';
import SettingMenuHeader from './SettingMenuComponent/SettingMenuHeader';

export default function SettingMenuPage() {
	const [openSettingMenu, setOpenSettingMenu] = useState(false);
	const handleOpenSettingMenu = () => setOpenSettingMenu(true);
	const handleCloseFormMenu = () => setOpenSettingMenu(false);
	return (
		<>
			<FormMenuComponent handleCloseFormMenu={handleCloseFormMenu} openSettingMenu={openSettingMenu} />
			<FusePageCardedFix
				classes={{
					content: 'flex',
					contentCard: 'overflow-hidden',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={
					<SettingMenuHeader
						handleCloseFormMenu={handleCloseFormMenu}
						handleOpenSettingMenu={handleOpenSettingMenu}
					/>
				}
				content={<SettingMenuContent />}
				innerScroll
			/>
		</>
	);
}
