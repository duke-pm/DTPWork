import { TableBody, TableCell, TableRow } from '@material-ui/core';
import { Popover } from 'antd';
import React from 'react';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { PossesionActionUsed } from './PossessionUsedAction';

export default function TableBodyUsed({ entities, handleOpenForm, handleOpenFromService }) {
	return (
		<TableBody>
			{entities &&
				entities.map(items => (
					<TableRow key={items.assetID} hover>
						<TableCell align="left" className="p-4 md:p-12">
							{!items.isProcessing && (
								<Popover
									overlayStyle={{ zIndex: '19' }}
									placement="rightTop"
									content={() => (
										<PossesionActionUsed
											handleOpenFromService={handleOpenFromService}
											handleOpenForm={handleOpenForm}
											items={items}
										/>
									)}
									title="Hành động"
								>
									<MoreVertIcon className="cursor-pointer" />
								</Popover>
							)}
						</TableCell>
						<TableCell align="left"> {items.assetCode} </TableCell>
						<TableCell align="left">{items.assetName} </TableCell>
						<TableCell align="left">{items.groupName}</TableCell>
						<TableCell align="left">{items.groupDetailName}</TableCell>
						<TableCell align="left">{moment(items.purchaseDate).format('DD-MM-YYYY')} </TableCell>
						<TableCell align="left">{items.deptNameManager}</TableCell>
						<TableCell align="left"> {items && items.empName ? items.empName : null}</TableCell>
						<TableCell align="left">{items.regionName}</TableCell>
						<TableCell align="left">
							<div
								className={`inline text-12 p-4 rounded-full truncate ${
									items.isProcessing
										? items.requestTypeName === 'Đã báo hỏng'
											? 'bg-purple text-white'
											: 'bg-red-700 text-white'
										: 'bg-green text-white'
								}`}
							>
								{items.isProcessing ? items.requestTypeName : 'Đang sử dụng'}
							</div>
						</TableCell>
						<TableCell align="left"> {items.remarks} </TableCell>
					</TableRow>
				))}
		</TableBody>
	);
}
