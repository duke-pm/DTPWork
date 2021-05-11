import { TableBody, TableCell, TableRow } from '@material-ui/core';
import { Popover } from 'antd';
import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import * as moment from 'moment';
import PossesionActions from './PossesionActions';

function TableBodyUnUsed({ handleOpenForm, handleOpenFormEdit, entities, lastErrors }) {
	return (
		<TableBody>
			{entities &&
				entities.map(items => (
					<TableRow hover key={items.assetID}>
						<TableCell align="center" className="p-4 md:p-12">
							<Popover
								overlayStyle={{ zIndex: '19' }}
								placement="rightTop"
								content={() => (
									<PossesionActions
										handleOpenForm={handleOpenForm}
										items={items}
										handleOpenFormEdit={handleOpenFormEdit}
									/>
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
						<TableCell align="left"> {currencyFormat(items.originalPrice)} </TableCell>
						<TableCell align="left">{items.deptNameManager}</TableCell>
					</TableRow>
				))}
		</TableBody>
	);
}
export default TableBodyUnUsed;
