import { TableBody, TableRow, TableCell } from '@material-ui/core';
import { Popover, Checkbox } from 'antd';
import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ActionsGroupUserBody from './ActionGroupUser/ActionsGroupUserBody';
// import ActionsMenuSetting from './ActionsMenuSetting';

export default function GroupUserContentBody({
	entities,
	lastErrors,
	classes,
	handleEditGroupUser,
	handleEditGroupUserDelete
}) {
	return (
		<>
			<TableBody>
				{entities &&
					!lastErrors &&
					entities.map(items => (
						<TableRow key={items.groupID} hover className={classes.tableHead}>
							<TableCell align="center" className="p-4 md:p-12">
								<Popover
									overlayStyle={{ zIndex: '19' }}
									placement="rightTop"
									content={() => (
										<ActionsGroupUserBody
											items={items}
											handleEditGroupUser={handleEditGroupUser}
											handleEditGroupUserDelete={handleEditGroupUserDelete}
										/>
									)}
									title="Hành động"
								>
									<MoreVertIcon className="cursor-pointer" />
								</Popover>
							</TableCell>
							<TableCell align="left">{items.groupID} </TableCell>
							<TableCell align="left">{items.groupName}</TableCell>
							<TableCell align="left">{items.description} </TableCell>
							<TableCell align="left">
								<Checkbox checked={items.inactive} />
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</>
	);
}
