import { IconButton, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import { column } from '../SettingMenuConfig';

export default function SettingMenuContentHeader() {
	return (
		<TableHead>
			<TableRow>
				<TableCell className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans" align="left">
					<IconButton aria-label="delete">
						<AppsIcon />
					</IconButton>
				</TableCell>

				{column.map(item => (
					<TableCell
						key={item.id}
						className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans w-screen"
						align={item.align}
					>
						{item.sort ? (
							<TableSortLabel
							// active={sort.id === row.id}
							// direction={sort.direction}
							// onClick={createSortHandler(row.id)}
							>
								{item.lable}
							</TableSortLabel>
						) : (
							item.lable
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
