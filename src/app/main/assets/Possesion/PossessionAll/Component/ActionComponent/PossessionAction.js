import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React from 'react';

export default function PossessionAction({ HandleOpenHistory, items }) {
	return (
		<MenuItem onClick={() => HandleOpenHistory(items)} role="button">
			<ListItemIcon className="min-w-40">
				<Icon>history</Icon>
			</ListItemIcon>
			<ListItemText primary="Quá trình sử dụng" />
		</MenuItem>
	);
}
