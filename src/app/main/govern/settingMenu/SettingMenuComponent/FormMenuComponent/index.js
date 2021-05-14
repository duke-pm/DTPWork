import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import FormCustomMenu from './FormCustomMenu';
import * as actions from '../../_redux/menuActions';

export default function FormMenuComponent({ openSettingMenu, setOpenSettingMenu }) {
	const dispatch = useDispatch();
	const { currentState } = useSelector(state => ({ currentState: state.govern.menu }), shallowEqual);
	const { entities, actionLoading, entitiesEdit } = currentState;
	const menuParent =
		entities && entities.reduce((arr, curr) => [...arr, { value: curr.menuID, label: curr.menuName }], []);
	const handleCloseFormMenu = () => {
		setOpenSettingMenu(false);
		dispatch(actions.setTaskEditMenuSetting(null));
	};
	const handleSubmitCreatedMenu = values => {
		if (entitiesEdit && entitiesEdit.menuID) {
			dispatch(actions.updatedMenuSettings(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig('success', 'Thành công', 'Cập nhật menu mới thành công');
					handleCloseFormMenu();
				}
			});
		} else {
			dispatch(actions.createdMenuSettings(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig('success', 'Thành công', 'Thêm menu mới thành công');
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
						{entitiesEdit && entitiesEdit.menuID ? 'Chỉnh sửa menu' : 'Thêm menu mới'}
					</Typography>
				</Toolbar>
			</AppBar>
			<FormCustomMenu
				entitiesEdit={entitiesEdit}
				actionLoading={actionLoading}
				handleSubmitCreatedMenu={handleSubmitCreatedMenu}
				menuParent={menuParent}
			/>
		</Dialog>
	);
}
