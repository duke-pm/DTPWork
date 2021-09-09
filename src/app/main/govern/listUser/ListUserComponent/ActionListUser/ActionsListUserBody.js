import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';
import Icon from '@material-ui/core/Icon';

export default function ActionsListUserBody({ handleEditListUser, items }) {
	return (
		<>
			<MenuItem onClick={() => handleEditListUser(items)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>edit</Icon>
				</ListItemIcon>
				<ListItemText primary="Cập nhật người dùng" />
			</MenuItem>
		</>
	);
}
