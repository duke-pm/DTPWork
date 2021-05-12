import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';
import Icon from '@material-ui/core/Icon';

export default function ActionsAllocation({ handleOpenForm, items }) {
	return (
		<>
			{items.isAllowApproved && (
				<MenuItem onClick={() => handleOpenForm(items)} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>checkcircleoutlineicon</Icon>
					</ListItemIcon>
					<ListItemText primary="Xác nhận" />
				</MenuItem>
			)}
			{/* <MenuItem onClick={() => handleOpenHistory(items)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>history</Icon>
				</ListItemIcon>
				<ListItemText primary="Xem lịch sử" />
			</MenuItem> */}
		</>
	);
}
