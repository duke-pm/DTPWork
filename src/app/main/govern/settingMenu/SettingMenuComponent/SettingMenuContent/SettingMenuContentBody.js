import { TableBody, TableRow, TableCell } from '@material-ui/core';
import { Popover, Checkbox } from 'antd';
import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ActionsMenuSetting from './ActionsMenuSetting';

export default function SettingMenuContentBody({
	entities,
	lastErrors,
	classes,
	handleEditMenuSetting,
	handleDeleteMenuSetting
}) {
	return (
		<>
			<TableBody>
				{entities &&
					!lastErrors &&
					entities.map(items => (
						<TableRow key={items.menuID} hover className={classes.tableHead}>
							<TableCell align="center" className="p-4 md:p-12">
								<Popover
									overlayStyle={{ zIndex: '19' }}
									placement="rightTop"
									content={() => (
										<ActionsMenuSetting
											items={items}
											handleEditMenuSetting={handleEditMenuSetting}
											handleDeleteMenuSetting={handleDeleteMenuSetting}
										/>
									)}
									title="Hành động"
								>
									<MoreVertIcon className="cursor-pointer" />
								</Popover>
							</TableCell>
							<TableCell align="left">{items.menuName} </TableCell>
							<TableCell align="left">{items.typeName}</TableCell>
							<TableCell align="left">{items.url} </TableCell>
							<TableCell align="left">
								<Checkbox checked={items.inactive} />
							</TableCell>
							<TableCell align="left">
								<Checkbox checked={items.isWeb} />
							</TableCell>
							<TableCell align="left">
								<Checkbox checked={items.isMobile} />
							</TableCell>
							<TableCell align="left">{items.visOrder}</TableCell>
						</TableRow>
					))}
			</TableBody>
		</>
	);
}
