/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import React from 'react';
import Icon from '@material-ui/core/Icon';
import { Tooltip } from 'antd';
// import { Popconfirm } from 'antd';

export default function ActionsGroupUserBody({ handleEditGroupUser, items }) {
	return (
		<>
			<Tooltip placement="bottom" title="Cập nhật">
				<span onClick={() => handleEditGroupUser(items)} className="action--button mx-auto">
					<Icon fontSize="small">edit</Icon>
				</span>
			</Tooltip>
		</>
	);
}
