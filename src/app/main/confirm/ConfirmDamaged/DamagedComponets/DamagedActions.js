import { Icon, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';

export default function DamagedActions({ handleOpenFormEdit }) {
	return (
		<MenuItem onClick={handleOpenFormEdit} role="button">
			<ListItemIcon className="min-w-40">
				<Icon>edit</Icon>
			</ListItemIcon>
			<ListItemText primary="Báo hỏng tài sản" />
		</MenuItem>
	);
}
