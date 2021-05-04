import React from 'react';
import { MenuItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

export const PossesionActionUsed = props => {
	const { items } = props;
	return (
		<div>
			<MenuItem onClick={() => props.handleOpenForm(items)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>backspace</Icon>
				</ListItemIcon>
				<ListItemText primary="Thu hồi tài sản" />
			</MenuItem>
		</div>
	);
};
