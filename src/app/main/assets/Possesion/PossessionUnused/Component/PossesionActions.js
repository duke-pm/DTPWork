import React from 'react';
import { ListItemIcon, MenuItem, ListItemText } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

export default function PossesionActions({ handleOpenForm, handleOpenFormEdit, item }) {
	return (
		<>
			<MenuItem onClick={() => handleOpenForm(item)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>add</Icon>
				</ListItemIcon>
				<ListItemText primary="Cấp phát tài sản" />
			</MenuItem>
			<MenuItem onClick={() => handleOpenFormEdit(item)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>edit</Icon>
				</ListItemIcon>
				<ListItemText primary="Cập nhật tài sản" />
			</MenuItem>
		</>
	);
}
