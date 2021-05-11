import { TableBody, TableRow, TableCell } from '@material-ui/core';
import { Popover } from 'antd';
import React from 'react';
import * as moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import image from '@fuse/assets/group.png';
import { chipColor, chipText, chipTextColor, chipTextType } from './ResovleRequestConfig';
import ActionsResovle from './ActionsResovle';

export default function BodyTableResovle({ entities, lastErrors, classes, handleOpenDialog }) {
	return (
		<>
			<TableBody>
				{entities &&
					!lastErrors &&
					entities.map(items => (
						<TableRow key={items.requestID} hover className={classes.tableHead}>
							<TableCell align="center" className="p-4 md:p-12">
								<Popover
									overlayStyle={{ zIndex: '19' }}
									placement="rightTop"
									content={() => <ActionsResovle items={items} handleOpenDialog={handleOpenDialog} />}
									title="Hành động"
								>
									<MoreVertIcon className="cursor-pointer" />
								</Popover>
							</TableCell>
							<TableCell align="left"> {items.empCode} </TableCell>
							<TableCell align="left">{items.fullName} </TableCell>
							<TableCell align="left">{items.deptName}</TableCell>
							<TableCell align="left">{items.regionName} </TableCell>
							<TableCell align="left">{moment(items.requestDate).format('DD/MM/YYYY')} </TableCell>
							<TableCell align="left">
								<div
									className={`inline text-12 p-4 rounded-full truncate ${
										chipTextColor[items.requestTypeID]
									}`}
								>
									{chipTextType[items.requestTypeID]}
								</div>
							</TableCell>
							<TableCell align="left">
								<div
									className={`inline text-12 p-4 rounded-full truncate ${chipColor[items.statusID]}`}
								>
									{chipText[items.statusID]}
								</div>
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</>
	);
}
