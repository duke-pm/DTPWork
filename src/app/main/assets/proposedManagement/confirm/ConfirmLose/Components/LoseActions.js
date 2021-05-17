import { Icon, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';

export default function LoseActions({ handleOpenForm, items, handleOpenTimeLine }) {
	return (
		<>
			{items.isAllowApproved ? (
				<MenuItem onClick={() => handleOpenForm(items)} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>warning</Icon>
					</ListItemIcon>
					<ListItemText primary="Phê duyệt" />
				</MenuItem>
			) : (
				<MenuItem role="button">
					<ListItemIcon className="min-w-40">
						<Icon>warning</Icon>
					</ListItemIcon>
					<ListItemText primary="Đã phê duyệt" />
				</MenuItem>
			)}
			<MenuItem onClick={() => handleOpenTimeLine(items)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>history</Icon>
				</ListItemIcon>
				<ListItemText primary="Quá trình phê duyệt" />
			</MenuItem>
		</>
	);
}
