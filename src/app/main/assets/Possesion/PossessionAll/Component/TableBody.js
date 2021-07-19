import { TableCell, TableRow, TableBody } from '@material-ui/core';
import { Popover } from 'antd';
import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as moment from 'moment';
import PossessionAction from './ActionComponent/PossessionAction';
import { chipColor, chipText } from '../ConfigPossessionAll';

const TableBodyAssetAll = ({ entities, lastErrors, classes, HandleOpenHistory }) => {
	return (
		<TableBody>
			{entities &&
				!lastErrors &&
				entities.map((items, index) => (
					<TableRow key={index} hover className={classes.tableHead}>
						<TableCell align="center" className="p-4 md:p-12">
							<Popover
								overlayStyle={{ zIndex: '19' }}
								placement="rightTop"
								content={() => <PossessionAction HandleOpenHistory={HandleOpenHistory} items={items} />}
								title="Hành động"
							>
								<MoreVertIcon className="cursor-pointer" />
							</Popover>
						</TableCell>
						<TableCell align="left"> {items.assetCode} </TableCell>
						<TableCell align="left">{items.assetName} </TableCell>
						<TableCell align="left">{items.groupName}</TableCell>
						<TableCell align="left">{items.groupDetailName}</TableCell>
						<TableCell align="left">
							<div className={`inline text-12 p-4 rounded-full truncate ${chipColor[items.statusID]}`}>
								{chipText[items.statusID]}
							</div>
						</TableCell>
						<TableCell align="left">{moment(items.purchaseDate).format('DD-MM-YYYY')} </TableCell>
						<TableCell align="left">{items.deptNameManager}</TableCell>
						<TableCell align="left">{items && items.empName ? items.empName : null}</TableCell>
						<TableCell align="left">{items.regionName}</TableCell>
						<TableCell align="left"> {items.remarks} </TableCell>
					</TableRow>
				))}
		</TableBody>
	);
};
export default TableBodyAssetAll;
