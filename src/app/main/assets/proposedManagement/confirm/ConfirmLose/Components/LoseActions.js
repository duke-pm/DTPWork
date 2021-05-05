import { Icon, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';

export default function LoseActions({ handleOpenForm, items }) {
	return (
		<>
			{items.isAllowApproved ? (
				<MenuItem onClick={() => handleOpenForm(items)} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>warning</Icon>
					</ListItemIcon>
					<ListItemText primary="Báo mất" />
				</MenuItem>
			) : (
				<MenuItem role="button">
					<ListItemIcon className="min-w-40">
						<Icon>warning</Icon>
					</ListItemIcon>
					<ListItemText primary="Đã báo mất" />
				</MenuItem>
			)}
		</>
	);
}
