import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import { rowPossesion } from '../ConfigPossessionUsed';

export default function TableHeaderUsed({ sort, createSortHandler }) {
	return (
		<TableHead>
			<TableRow>
				<TableCell className="whitespace-nowrap p-4 md:p-12 " align="left">
					<AppsIcon />
				</TableCell>
				{rowPossesion.map(row => (
					<TableCell key={row.id} className="whitespace-nowrap p-4 md:p-12  w-screen" align={row.align}>
						{row.sort ? (
							<TableSortLabel
								active={sort.id === row.id}
								direction={sort.direction}
								onClick={createSortHandler(row.id)}
							>
								{row.label}
							</TableSortLabel>
						) : (
							row.label
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
