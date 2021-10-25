import { Icon, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';

export default function DamagedActions({ handleOpenForm, items, handleOpenTimeLine,exportExcel }) {
	return (
		<>
			<MenuItem onClick={() => handleOpenForm(items)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>edit</Icon>
				</ListItemIcon>
				<ListItemText primary="Chi tiết" />
			</MenuItem>
			<MenuItem onClick={() => handleOpenTimeLine(items)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>history</Icon>
				</ListItemIcon>
				<ListItemText primary="Quá trình phê duyệt" />
			</MenuItem>
			<MenuItem onClick={() => exportExcel(items)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>get_app</Icon>
				</ListItemIcon>
				<ListItemText primary="Xuất excel" />
			</MenuItem>
		</>
	);
}
