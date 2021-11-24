import React from 'react';
import { MenuItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

export const DocumentTableAction = props => {
	const { items, ExportExcelAllocation, ViewDetail, ExportExcelRecovery } = props;
	return (
		<div>
			{items.transStatus === 2 && (
				<MenuItem onClick={() => ExportExcelAllocation(items)} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>get_app</Icon>
					</ListItemIcon>
					<ListItemText primary="In biên bản" />
				</MenuItem>
			)}
			{items.transStatus === 7 && (
				<MenuItem onClick={() => ExportExcelRecovery(items)} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>get_app</Icon>
					</ListItemIcon>
					<ListItemText primary="In biên bản" />
				</MenuItem>
			)}

			<MenuItem onClick={() => ViewDetail(items)} role="button">
				<ListItemIcon className="min-w-40">
					<Icon>edit</Icon>
				</ListItemIcon>
				<ListItemText primary="Cập nhật" />
			</MenuItem>
		</div>
	);
};
