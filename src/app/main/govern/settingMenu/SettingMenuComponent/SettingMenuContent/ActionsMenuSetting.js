/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Icon from '@material-ui/core/Icon';
import { Tooltip } from 'antd';

export default function ActionsMenuSetting({ handleEditMenuSetting, items }) {
	return (
		<>
			<Tooltip placement="bottom" title="Cập nhật">
				<span onClick={() => handleEditMenuSetting(items)} className="action--button mx-auto">
					<Icon fontSize="small">edit</Icon>
				</span>
			</Tooltip>
		</>
	);
}
