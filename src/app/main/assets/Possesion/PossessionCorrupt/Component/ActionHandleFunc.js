import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';
import Icon from '@material-ui/core/Icon';

export default function ActionHandleFunc({ handleOpenFormCycleView, handleOpenFormLiquiAsset, handleOpenFormService }) {
	return (
		<>
			<MenuItem onClick={handleOpenFormLiquiAsset} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>shoppingCart</Icon>
				</ListItemIcon>
				<ListItemText primary="Thanh lý tài sản" />
			</MenuItem>
			<MenuItem onClick={handleOpenFormService} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>build</Icon>
				</ListItemIcon>
				<ListItemText primary="Sửa chữa bảo hành tài sản" />
			</MenuItem>
		</>
	);
}
