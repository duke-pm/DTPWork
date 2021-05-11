import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React from 'react';

export default function PossessionAction({ handleOpenFormEdit, items }) {
	return (
		<MenuItem role="button">
			<ListItemIcon className="min-w-40">
				<Icon>history</Icon>
			</ListItemIcon>
			<ListItemText primary="Xem lịch sử" />
		</MenuItem>
	);
}
