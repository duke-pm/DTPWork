import { TableCell, TableHead, TableRow, IconButton, TableSortLabel } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import React from 'react';
import { rowConfirmAllocation } from '../DamagedConfig';

export default function TableHeaderDamaged({ sort, createSortHandler }) {
	return (
		<TableHead>
			<TableRow>
				<TableCell className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans" align="left">
					<IconButton aria-label="delete">
						<AppsIcon />
					</IconButton>
				</TableCell>
				{rowConfirmAllocation.map(row => (
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
