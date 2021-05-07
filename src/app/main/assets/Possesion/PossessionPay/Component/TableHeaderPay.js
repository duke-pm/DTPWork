import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import { rowPossesion } from '../ConfigPossessionUsed';

export default function TableHeaderPay({ sort, createSortHandler }) {
	return (
		<TableHead>
			<TableRow>
				{rowPossesion.map(row => (
					<TableCell
						key={row.id}
						className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans w-screen"
						align={row.align}
					>
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
