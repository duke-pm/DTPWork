import { TableBody, TableRow, TableCell } from '@material-ui/core';
import { Popover } from 'antd';
import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as moment from 'moment';
import { chipColor, chipText } from '../ConfrimAllocationConfig';
import ActionsAllocation from './ActionsAllocation';

export default function BodyTableAllocation({ entities, lastErrors, classes, handleOpenForm }) {
	return (
		<TableBody>
			{entities &&
				!lastErrors &&
				entities.map(items => (
					<TableRow key={items.requestID} hover className={classes.tableHead}>
						<TableCell align="center" className="p-4 md:p-12">
							<Popover
								placement="rightTop"
								content={() => <ActionsAllocation items={items} handleOpenForm={handleOpenForm} />}
								title="Hành động"
							>
								<MoreVertIcon className="cursor-pointer" />
							</Popover>
						</TableCell>
						<TableCell align="left"> {items.empCode} </TableCell>
						<TableCell align="left">{items.fullName} </TableCell>
						<TableCell align="left">{items.deptName}</TableCell>
						<TableCell align="left">{items.regionName} </TableCell>
						<TableCell align="left">{items.requestDate} </TableCell>
						<TableCell align="left">
							<div className={`inline text-12 p-4 rounded-full truncate ${chipColor[items.status]}`}>
								{chipText[items.status]}
							</div>
						</TableCell>
					</TableRow>
				))}
		</TableBody>
	);
}
