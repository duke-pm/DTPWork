import { TableCell, TableRow, TableBody, Typography } from '@material-ui/core';
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
						<TableCell align="left">
							<Typography variant="body1">{items.assetCode}</Typography>
						</TableCell>
						<TableCell align="left">
							<Typography variant="body1">{items.assetName}</Typography>
						</TableCell>
						<TableCell align="left">
							<Typography variant="body1">{items.groupName}</Typography>
						</TableCell>
						<TableCell align="left">
							<Typography variant="body1">{items.groupDetailName}</Typography>
						</TableCell>
						<TableCell align="center">
							<Typography
								variant="body1"
								className={`rounded-full inline px-10 py-4 ${chipColor[items.statusID]}`}
							>
								{chipText[items.statusID]}
							</Typography>
						</TableCell>
						<TableCell align="center">
							<Typography variant="body1">{moment(items.purchaseDate).format('DD-MM-YYYY')}</Typography>
						</TableCell>
						<TableCell align="left">
							<Typography variant="body1">{items.deptNameManager}</Typography>
						</TableCell>
						<TableCell align="left">
							<Typography variant="body1">{items && items.empName ? items.empName : null}</Typography>
						</TableCell>
						<TableCell align="left">
							<Typography variant="body1">{items.regionName}</Typography>
						</TableCell>
						<TableCell align="left">
							<Typography variant="body1">{items.remarks}</Typography>
						</TableCell>
					</TableRow>
				))}
		</TableBody>
	);
};
export default TableBodyAssetAll;
