import { TableBody, TableRow, TableCell } from '@material-ui/core';
import { Popover } from 'antd';
import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import image from '@fuse/assets/group.png';
import { chipColorStatus, chipTextStatus, chipText, chipColor } from '../SettingMenuConfig';

export default function SettingMenuContentBody({ entities, lastErrors, classes }) {
	return (
		<>
			<TableBody>
				{entities &&
					!lastErrors &&
					entities.map(items => (
						<TableRow key={items.menuID} hover className={classes.tableHead}>
							<TableCell align="center" className="p-4 md:p-12">
								{/* <Popover
									overlayStyle={{ zIndex: '19' }}
									placement="rightTop"
									content={() => (
										<ActionsResovle
											handleOpenTimeLine={handleOpenTimeLine}
											items={items}
											handleOpenDialog={handleOpenDialog}
										/>
									)}
									title="Hành động"
								>
									<MoreVertIcon className="cursor-pointer" />
								</Popover> */}
							</TableCell>
							<TableCell align="left">{items.menuName} </TableCell>
							<TableCell align="left">{items.typeName}</TableCell>
							<TableCell align="left">{items.url} </TableCell>
							<TableCell align="left">
								<div
									className={`inline text-12 p-4 rounded-full truncate ${chipColor[items.inactive]}`}
								>
									{chipText[items.inactive]}
								</div>
							</TableCell>
							<TableCell align="left">
								<div
									className={`inline text-12 p-4 rounded-full truncate ${
										chipColorStatus[items.isWeb]
									}`}
								>
									{chipTextStatus[items.isWeb]}
								</div>
							</TableCell>
							<TableCell align="left">
								<div
									className={`inline text-12 p-4 rounded-full truncate ${
										chipColorStatus[items.isMobile]
									}`}
								>
									{chipTextStatus[items.isMobile]}
								</div>
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</>
	);
}
