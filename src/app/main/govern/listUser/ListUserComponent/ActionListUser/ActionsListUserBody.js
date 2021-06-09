import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';
import Icon from '@material-ui/core/Icon';
import { Popconfirm } from 'antd';

export default function ActionsListUserBody({ handleEditListUser, handleDeleteListUser, items }) {
	return (
		<>
			<MenuItem onClick={() => handleEditListUser(items)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>edit</Icon>
				</ListItemIcon>
				<ListItemText primary="Chỉnh sửa người dùng" />
			</MenuItem>
			{/* <Popconfirm placement="right" title="Xác nhận xoá người dùng" onConfirm={() => handleDeleteListUser(items)}>
				<MenuItem role="button">
					<ListItemIcon className="min-w-40">
						<Icon>delete_outline_icone</Icon>
					</ListItemIcon>
					<ListItemText primary="Xoá người dùng" />
				</MenuItem>
			</Popconfirm> */}
		</>
	);
}
