import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import FormCustomMenu from './FormCustomMenu';
import * as actions from '../../_redux/menuActions';

export default function FormMenuComponent({ openSettingMenu, setOpenSettingMenu }) {
	const dispatch = useDispatch();
	const { currentState } = useSelector(state => ({ currentState: state.govern.menu }), shallowEqual);
	const { entities, actionLoading, entitiesEdit } = currentState;
	const menuParent =
		entities && entities.reduce((arr, curr) => [...arr, { value: curr.menuID, label: curr.menuName }], []);
	const handleCloseFormMenu = () => setOpenSettingMenu(false);
	const handleSubmitCreatedMenu = values => {
		if (entitiesEdit && entitiesEdit.menuID) {
			dispatch(actions.updatedMenuSettings(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.setting.menu.updatedMenuSuccess
					);
					handleCloseFormMenu();
				}
			});
		} else {
			dispatch(actions.createdMenuSettings(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.setting.menu.createdMenuSuccess
					);
					handleCloseFormMenu();
				}
			});
		}
	};
	return (
		<Dialog
			fullWidth
			style={{ zIndex: 20 }}
			maxWidth="sm"
			// fullScreen
			aria-labelledby="customized-dialog-title"
			open={openSettingMenu}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" onClick={handleCloseFormMenu} color="inherit" aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle1" color="inherit">
						{entitiesEdit && entitiesEdit.menuID ? 'Cập nhật menu' : 'Tạo menu'}
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomMenu
				handleCloseFormMenu={handleCloseFormMenu}
				entitiesEdit={entitiesEdit}
				actionLoading={actionLoading}
				handleSubmitCreatedMenu={handleSubmitCreatedMenu}
				menuParent={menuParent}
			/>
		</Dialog>
	);
}
