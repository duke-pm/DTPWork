import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';
import Icon from '@material-ui/core/Icon';

export default function ActionsMenuSetting({ handleEditMenuSetting, items }) {
	return (
		<>
			<MenuItem onClick={() => handleEditMenuSetting(items)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>edit</Icon>
				</ListItemIcon>
				<ListItemText primary="Cập nhật menu" />
			</MenuItem>
		</>
	);
}
