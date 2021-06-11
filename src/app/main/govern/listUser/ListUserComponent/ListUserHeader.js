import { IconButton, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import { column } from './ListUserConfigComponet';

export default function ListUserHeader({ sort, createSortHandler }) {
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

				{column.map(item => (
					<TableCell
						key={item.id}
						className="whitespace-nowrap p-4 md:p-12 text-gray-800 font-sans w-screen"
						align={item.align}
						style={{ width: item.width }}
					>
						{item.sort ? (
							<TableSortLabel
								active={sort.id === item.id}
								direction={sort.direction}
								onClick={createSortHandler(item.id)}
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
