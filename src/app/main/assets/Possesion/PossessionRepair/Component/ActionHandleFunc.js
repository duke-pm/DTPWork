import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';
import Icon from '@material-ui/core/Icon';

export default function ActionHandleFunc({ handleOpenFormCycleView, handleOpenFormLiquiAsset }) {
	return (
		<>
			<MenuItem onClick={handleOpenFormLiquiAsset} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>shoppingCart</Icon>
				</ListItemIcon>
				<ListItemText primary="Thanh lý tài sản" />
			</MenuItem>
			<MenuItem onClick={handleOpenFormCycleView} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>update</Icon>
				</ListItemIcon>
				<ListItemText primary="Đưa vào sử dụng lại" />
			</MenuItem>
		</>
	);
}