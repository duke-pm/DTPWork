import { Icon, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';

export default function DamagedActions({ handleOpenForm, items }) {
	return (
		<>
			{items.isAllowApproved ? (
				<MenuItem onClick={() => handleOpenForm(items)} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>edit</Icon>
					</ListItemIcon>
					<ListItemText primary="Phê duyệt" />
				</MenuItem>
			) : (
				<MenuItem role="button">
					<ListItemIcon className="min-w-40">
						<Icon>edit</Icon>
					</ListItemIcon>
					<ListItemText primary="Đã phê duyệt" />
				</MenuItem>
			)}
		</>
	);
}
