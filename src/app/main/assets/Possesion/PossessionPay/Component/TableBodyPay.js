import { TableBody, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import moment from 'moment';

export default function TableBodyPay({ entities }) {
	return (
		<TableBody>
			{entities &&
				entities.map(items => (
					<TableRow key={items.assetID} hover>
						<TableCell align="left"> {items.assetCode} </TableCell>
						<TableCell align="left">{items.assetName} </TableCell>
						<TableCell align="left">{items.groupName}</TableCell>
						<TableCell align="left">{items.groupDetailName}</TableCell>
						<TableCell align="left">{moment(items.purchaseDate).format('DD-MM-YYYY')} </TableCell>
						<TableCell align="left">{moment(items.transDate).format('DD-MM-YYYY')} </TableCell>
						<TableCell align="left"> {items.remarks} </TableCell>
					</TableRow>
				))}
		</TableBody>
	);
}
