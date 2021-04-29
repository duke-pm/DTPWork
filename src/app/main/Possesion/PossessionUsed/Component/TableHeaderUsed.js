import { TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import { rowPossesion } from '../ConfigPossessionUsed';

export default function TableHeaderUsed() {
	return (
		<TableHead>
			<TableRow>
				<TableCell className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans " align="left">
					<AppsIcon />
				</TableCell>
				{rowPossesion.map(row => (
					<TableCell
						key={row.id}
						className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans w-screen"
						align={row.align}
					>
						{row.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
