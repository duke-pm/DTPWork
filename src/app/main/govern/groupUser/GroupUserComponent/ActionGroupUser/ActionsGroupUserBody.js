import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';
import Icon from '@material-ui/core/Icon';
// import { Popconfirm } from 'antd';

export default function ActionsGroupUserBody({ handleEditGroupUser, items }) {
	return (
		<>
			<MenuItem onClick={() => handleEditGroupUser(items)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>edit</Icon>
				</ListItemIcon>
				<ListItemText primary="Cập nhật nhóm người dùng" />
			</MenuItem>
		</>
	);
}
