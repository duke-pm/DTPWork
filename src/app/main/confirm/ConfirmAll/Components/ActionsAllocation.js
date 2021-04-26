import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';
import Icon from '@material-ui/core/Icon';

export default function ActionsAllocation({ handleOpenForm, items }) {
	return (
		<MenuItem onClick={() => handleOpenForm(items)} role="button">
			<ListItemIcon className="min-w-40">
				<Icon>checkcircleoutlineicon</Icon>
			</ListItemIcon>
			<ListItemText primary="Xác nhận" />
		</MenuItem>
	);
}
