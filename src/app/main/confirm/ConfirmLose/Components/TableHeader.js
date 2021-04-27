import React from 'react';
import { IconButton, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import { rowsConfig } from '../LoseConfig';

export default function TableHeader() {
	return (
		<TableHead>
			<TableRow>
				<TableCell className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans" align="left">
					<IconButton aria-label="delete">
						<AppsIcon />
					</IconButton>
				</TableCell>
				{rowsConfig.map(row => (
					<TableCell
						key={row.id}
						className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans w-screen"
						align={row.align}
					>
						{row.sort ? <TableSortLabel>{row.label}</TableSortLabel> : row.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
