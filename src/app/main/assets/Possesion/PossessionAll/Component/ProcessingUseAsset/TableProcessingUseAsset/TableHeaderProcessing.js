import { TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { columnsConfig } from './TableConfigProcessing';

export default function TableHeaderProcessing() {
	return (
		<TableHead>
			<TableRow>
				{columnsConfig.map(col => (
					<TableCell className="whitespace-nowrap p-4 md:p-12 w-screen" key={col.id}>
						{col.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
