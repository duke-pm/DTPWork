import { TableCell, TableRow, TableBody } from '@material-ui/core';
import { Popover } from 'antd';
import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as moment from 'moment';
import PossessionAction from './PossessionAction';
import { chipColor, chipText } from '../ConfigPossessionAll';

const TableBodyAssetAll = ({ entities, lastErrors, classes, handleOpenFormEdit }) => {
	return (
		<TableBody>
			{entities &&
				!lastErrors &&
				entities.map(items => (
					<TableRow key={items.assetID} hover className={classes.tableHead}>
						<TableCell align="center" className="p-4 md:p-12">
							<Popover
								placement="rightTop"
								content={() => (
									<PossessionAction items={items} handleOpenFormEdit={handleOpenFormEdit} />
								)}
								title="Hành động"
							>
								<MoreVertIcon className="cursor-pointer" />
							</Popover>
						</TableCell>
						<TableCell align="left"> {items.assetCode} </TableCell>
						<TableCell align="left">{items.assetName} </TableCell>
						<TableCell align="left">{items.groupName}</TableCell>
						<TableCell align="left">{moment(items.purchaseDate).format('DD-MM-YYYY')} </TableCell>
						<TableCell align="left">{items.deptNameManager}</TableCell>
						<TableCell align="left">{items && items.empName ? items.empName : null}</TableCell>
						<TableCell align="left">
							<div className={`inline text-12 p-4 rounded-full truncate ${chipColor[items.statusID]}`}>
								{chipText[items.statusID]}
							</div>
						</TableCell>
					</TableRow>
				))}
		</TableBody>
	);
};
export default TableBodyAssetAll;
