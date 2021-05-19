import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';
import Icon from '@material-ui/core/Icon';
import { Popconfirm } from 'antd';

export default function ActionsGroupUserBody({ handleEditGroupUser, handleEditGroupUserDelete, items }) {
	return (
		<>
			<MenuItem onClick={() => handleEditGroupUser(items)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>edit</Icon>
				</ListItemIcon>
				<ListItemText primary="Chỉnh sửa nhóm người dùng" />
			</MenuItem>
			<Popconfirm placement="right" title="Xác nhận xoá nhóm" onConfirm={() => handleEditGroupUserDelete(items)}>
				<MenuItem role="button">
					<ListItemIcon className="min-w-40">
						<Icon>delete_outline_icone</Icon>
					</ListItemIcon>
					<ListItemText primary="Xoá nhóm" />
				</MenuItem>
			</Popconfirm>
		</>
	);
}
