import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';
import Icon from '@material-ui/core/Icon';

export default function ActionsAllocation({ handleOpenForm, items, handleOpenTimeLine }) {
	return (
		<>
			{items.isAllowApproved && (
				<MenuItem onClick={() => handleOpenForm(items)} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>checkcircleoutlineicon</Icon>
					</ListItemIcon>
					<ListItemText primary="Phê duyệt" />
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
