import { TableCell, TableRow, TableBody } from '@material-ui/core';
import { Popover } from 'antd';
import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as moment from 'moment';
import Text from 'app/components/Text';
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
							<Text>{items.assetCode}</Text>
						</TableCell>
						<TableCell align="left">
							<Text>{items.assetName}</Text>
						</TableCell>
						<TableCell align="left">
							<Text>{items.groupName}</Text>
						</TableCell>
						<TableCell align="left">
							<Text>{items.groupDetailName}</Text>
						</TableCell>
						<TableCell align="center">
							<Text className={`rounded-full inline px-10 py-4 ${chipColor[items.statusID]}`}>
								{chipText[items.statusID]}
							</Text>
						</TableCell>
						<TableCell align="center">
							<Text>{items.purchaseDate ? moment(items.purchaseDate).format('DD/MM/YYYY') : '-'}</Text>
						</TableCell>
						<TableCell align="left">
							<Text>{items.deptNameManager}</Text>
						</TableCell>
						<TableCell align="left">
							<Text>{items && items.empName ? items.empName : '-'}</Text>
						</TableCell>
						<TableCell align="left">
							<Text>{items.regionName}</Text>
						</TableCell>
						<TableCell align="left">
							<Text>{items.remarks}</Text>
						</TableCell>
					</TableRow>
				))}
		</TableBody>
	);
};
export default TableBodyAssetAll;
