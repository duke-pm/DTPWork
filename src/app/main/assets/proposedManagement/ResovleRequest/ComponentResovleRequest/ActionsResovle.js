import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';
import Icon from '@material-ui/core/Icon';

export default function ActionsResovle({ handleOpenDialog, items, handleOpenTimeLine }) {
	return (
		<>
			{items.requestTypeID === 1 ? (
				<>
					<MenuItem onClick={() => handleOpenDialog('allocation', items)} role="button">
						<ListItemIcon className="min-w-40">
							<Icon>checkcircleoutlineicon</Icon>
						</ListItemIcon>
						<ListItemText primary="Phê duyệt " />
					</MenuItem>
					<MenuItem onClick={() => handleOpenTimeLine('yêu cầu', items)} role="button">
						<ListItemIcon className="min-w-40">
							<Icon>history</Icon>
						</ListItemIcon>
						<ListItemText primary="Quá trình phê duyệt" />
					</MenuItem>
				</>
			) : items.requestTypeID === 2 ? (
				<>
					<MenuItem onClick={() => handleOpenDialog('damage', items)} role="button">
						<ListItemIcon className="min-w-40">
							<Icon>edit</Icon>
						</ListItemIcon>
						<ListItemText primary="Phê duyệt " />
					</MenuItem>
					<MenuItem onClick={() => handleOpenTimeLine('báo hư hỏng', items)} role="button">
						<ListItemIcon className="min-w-40">
							<Icon>history</Icon>
						</ListItemIcon>
						<ListItemText primary="Quá trình phê duyệt" />
					</MenuItem>
				</>
			) : (
				items.requestTypeID === 3 && (
					<>
						<MenuItem onClick={() => handleOpenDialog('lost', items)} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>warning</Icon>
							</ListItemIcon>
							<ListItemText primary="Phê duyệt" />
						</MenuItem>
						<MenuItem onClick={() => handleOpenTimeLine('báo mất', items)} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>history</Icon>
							</ListItemIcon>
							<ListItemText primary="Quá trình phê duyệt" />
						</MenuItem>
					</>
				)
			)}
		</>
	);
}
