import { TableBody, TableRow, TableCell } from '@material-ui/core';
import { Popover, Checkbox } from 'antd';
import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ActionsListUserBody from './ActionListUser/ActionsListUserBody';
// import ActionsMenuSetting from './ActionsMenuSetting';

export default function ListUserContentBody({
	entities,
	lastErrors,
	classes,
	handleEditListUser,
	handleDeleteListUser
}) {
	return (
		<>
			<TableBody>
				{entities &&
					entities.map(items => (
						<TableRow key={items.userID} hover className={classes.tableHead}>
							<TableCell align="center" className="p-4 md:p-12">
								<Popover
									overlayStyle={{ zIndex: '19' }}
									placement="rightTop"
									content={() => (
										<ActionsListUserBody
											items={items}
											handleEditListUser={handleEditListUser}
											handleDeleteListUser={handleDeleteListUser}
										/>
									)}
									title="Hành động"
								>
									<MoreVertIcon className="cursor-pointer" />
								</Popover>
							</TableCell>
							<TableCell align="left">{items.userID} </TableCell>
							<TableCell align="left">{items.userName} </TableCell>
							<TableCell align="left"> {items.fullName}</TableCell>
							<TableCell align="left">{items.email} </TableCell>
							<TableCell align="left">{items.groupName} </TableCell>
							<TableCell align="left">
								<Checkbox checked={items.inactive} />
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</>
	);
}
