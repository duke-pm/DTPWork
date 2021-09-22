import { TableBody, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import * as moment from 'moment';
import { Popover } from 'antd';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Text from 'app/components/Text';
import ActionHandleFunc from './ActionHandleFunc';
import { chipColor, chipText } from '../PossesionRepairConfig';

export default function TableBodyCorrupt({
	entities,
	lastErrors,
	classes,
	handleOpenFormLiquiAsset,
	handleOpenFormCycleView,
	handleOpenFormService
}) {
	return (
		<TableBody>
			{entities &&
				!lastErrors &&
				entities.map(items => (
					<TableRow key={items.assetID} hover className={classes.tableHead}>
						<TableCell align="center" className="p-4 md:p-12">
							{items.statusID === 4 && (
								<Popover
									overlayStyle={{ zIndex: '19' }}
									placement="rightTop"
									content={() => (
										<ActionHandleFunc
											handleOpenFormService={handleOpenFormService}
											handleOpenFormCycleView={handleOpenFormCycleView}
											items={items}
											handleOpenFormLiquiAsset={handleOpenFormLiquiAsset}
										/>
									)}
									title="Hành động"
								>
									<MoreVertIcon className="cursor-pointer" />
								</Popover>
							)}
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
						<TableCell align="left">
							<Text
								className={`inline-flex rounded-32 px-10 py-4 ${chipColor[items.statusID]}`}
								color="white"
							>
								{chipText[items.statusID]}
							</Text>
						</TableCell>
						<TableCell align="left">
							<Text>{items.purchaseDate ? moment(items.purchaseDate).format('DD/MM/YYYY') : '-'}</Text>
						</TableCell>
						<TableCell align="left">
							<Text>{items.deptNameManager}</Text>
						</TableCell>
						<TableCell align="left">
							<Text>{items?.empName ? items.empName : null}</Text>
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
}
