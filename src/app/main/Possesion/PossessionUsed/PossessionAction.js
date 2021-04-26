import React from 'react';
import { MenuItem, ListItemText, ListItemIcon, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

export const PossesionAction = props => {
	const { items } = props;
	return (
		<div>
			<MenuItem onClick={() => props.handleOpenForm(items)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>backspace</Icon>
				</ListItemIcon>
				<ListItemText primary="Thu hồi tài sản" />
			</MenuItem>
			{!props.items.isProcessing ? (
				<>
					<MenuItem onClick={() => props.handleFormOpenReport('service', items)} role="button">
						<ListItemIcon className="min-w-40">
							<Icon>build</Icon>
						</ListItemIcon>
						<ListItemText primary="Báo hỏng tài sản" />
					</MenuItem>
					<MenuItem onClick={() => props.handleFormOpenReport('lose', items)} role="button">
						<ListItemIcon className="min-w-40">
							<Icon>report_problem</Icon>
						</ListItemIcon>
						<ListItemText primary="Báo mất tài sản" />
					</MenuItem>
				</>
			) : null}
		</div>
	);
};
