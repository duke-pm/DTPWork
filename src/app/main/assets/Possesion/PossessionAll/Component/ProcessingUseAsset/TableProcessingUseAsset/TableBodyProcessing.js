import { TableBody, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import * as moment from 'moment';
import { chipColor, chipText } from './TableConfigProcessing';

export default function TableBodyProcessing({ history }) {
	return (
		<TableBody>
			{history &&
				history.map(items => (
					<TableRow key={items.lineNum} hover>
						<TableCell align="left">{moment(items.transDate).format('DD-MM-YYYY')} </TableCell>
						<TableCell align="left"> {items.empCode} </TableCell>
						<TableCell align="left"> {items.empName} </TableCell>
						<TableCell align="left">{items.jobTitle} </TableCell>
						<TableCell align="left">{items.deptName}</TableCell>
						<TableCell align="left">{items.regionName}</TableCell>
						<TableCell align="left">
							<div className={`inline text-12 p-4 rounded-full truncate ${chipColor[items.transStatus]}`}>
								{chipText[items.transStatus]}
							</div>
						</TableCell>
						{/* <TableCell align="left">{items && items.empName ? items.empName : null}</TableCell> */}
					</TableRow>
				))}
		</TableBody>
	);
}
