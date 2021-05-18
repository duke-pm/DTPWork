import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';
import Icon from '@material-ui/core/Icon';
import { Popconfirm } from 'antd';

export default function ActionsMenuSetting({ handleEditMenuSetting, handleDeleteMenuSetting, items }) {
	return (
		<>
			<MenuItem onClick={() => handleEditMenuSetting(items)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>edit</Icon>
				</ListItemIcon>
				<ListItemText primary="Chỉnh sửa menu" />
			</MenuItem>
			<Popconfirm placement="right" title="Xác nhận xoá menu" onConfirm={() => handleDeleteMenuSetting(items)}>
				<MenuItem role="button">
					<ListItemIcon className="min-w-40">
						<Icon>delete_outline_icone</Icon>
					</ListItemIcon>
					<ListItemText primary="Xoá menu" />
				</MenuItem>
			</Popconfirm>
		</>
	);
}
