import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React from 'react';

export default function PossessionAction({ HandleOpenHistory, item }) {
	return (
		<MenuItem onClick={() => HandleOpenHistory(item)} role="button">
			<ListItemIcon className="min-w-40">
				<Icon>history</Icon>
			</ListItemIcon>
			<ListItemText primary="Quá trình sử dụng" />
		</MenuItem>
	);
}
