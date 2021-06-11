import { IconButton, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import { rowConfirmAllocation } from '../ConfrimAllocationConfig';

export default function HeaderTableAllocation({ sort, createSortHandler }) {
	return (
		<TableHead>
			<TableRow>
				<TableCell
					style={{ width: 20 }}
					className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans"
					align="left"
				>
					<IconButton aria-label="delete">
						<AppsIcon />
					</IconButton>
				</TableCell>
				{rowConfirmAllocation.map(row => (
					<TableCell
						key={row.id}
						className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans w-screen"
						align={row.align}
						style={{ width: row.width }}
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
