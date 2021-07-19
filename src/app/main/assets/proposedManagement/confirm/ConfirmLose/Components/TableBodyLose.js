import { TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { Popover } from 'antd';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as moment from 'moment';
import { chipColor, chipText } from '../LoseConfig';
import LoseActions from './LoseActions';

export default function TableBodyLose({ entities, lastErrors, classes, handleOpenForm, handleOpenTimeLine }) {
	return (
		<TableBody>
			{entities &&
				!lastErrors &&
				entities.map(items => (
					<TableRow key={items.requestID} hover className={classes.tableHead}>
						<TableCell align="center" className="p-4 md:p-12">
							<Popover
								overlayStyle={{ zIndex: '19' }}
								placement="rightTop"
								content={() => (
									<LoseActions
										handleOpenTimeLine={handleOpenTimeLine}
										items={items}
										handleOpenForm={handleOpenForm}
									/>
								)}
								title="Hành động"
							>
								<MoreVertIcon className="cursor-pointer" />
							</Popover>
						</TableCell>
						<TableCell align="justify"> {items.requestID}</TableCell>
						<TableCell align="left">{items.fullName}</TableCell>
						<TableCell align="left">{items.deptName}</TableCell>
						<TableCell align="left">{items.regionName} </TableCell>
						<TableCell align="left">{moment(items.requestDate).format('DD-MM-YYYY')}</TableCell>
						<TableCell align="left">
							<Typography
								variant="body1"
								className={`rounded-full inline px-10 py-4 ${chipColor[items.statusID]}`}
							>
								{chipText[items.statusID]}
							</Typography>
						</TableCell>
					</TableRow>
				))}
		</TableBody>
	);
}
