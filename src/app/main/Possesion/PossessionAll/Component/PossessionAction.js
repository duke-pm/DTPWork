import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React from 'react';

export default function PossessionAction({ handleOpenFormEdit, items }) {
	return (
		<MenuItem onClick={() => handleOpenFormEdit(items)} role="button">
			<ListItemIcon className="min-w-40">
				<Icon>edit</Icon>
			</ListItemIcon>
			<ListItemText primary="Chỉnh sửa" />
		</MenuItem>
	);
}
