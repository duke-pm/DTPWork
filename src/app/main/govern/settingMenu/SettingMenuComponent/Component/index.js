/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Typography } from '@material-ui/core';
import { Table, Checkbox, Spin } from 'antd';
import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ActionsMenuSetting from '../SettingMenuContent/ActionsMenuSetting';

export default function TableSettingMenu({ entities, listLoading, handleEditMenuSetting }) {
	// const filterOwner = value => {
	// 	console.log(value);
	// };
	// const onChange = value => {
	// 	console.log(value);
	// };
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
	const columns = [
		{
			title: 'Menu Name',
			dataIndex: 'menuName',
			key: 'menuName',
			// defaultSortOrder: 'ascend',
			render: (_, item) => <Typography variant="body1">{item.menuName}</Typography>
		},
		{
			title: 'Menu Type',
			dataIndex: 'MenuType',
			key: 'MenuType',
			// defaultSortOrder: 'ascend',
			render: (_, item) => <Typography variant="body1">{item.typeName}</Typography>
		},
		{
			title: 'Url/ Action',
			dataIndex: 'url',
			key: 'url',
			render: (_, item) => <Typography variant="body1">{item.url}</Typography>
		},
		{
			title: 'Inactive',
			dataIndex: 'inactive',
			key: 'inactive',
			align: 'center',
			render: (_, item) => <Checkbox checked={item.inactive} />
		},
		{
			title: 'For Web',
			dataIndex: 'isWeb',
			key: 'isWeb',
			align: 'center',
			render: (_, item) => <Checkbox checked={item.isWeb} />
		},
		{
			title: 'For Mobile',
			dataIndex: 'isMobile',
			key: 'isMobile',
			align: 'center',
			render: (_, item) => <Checkbox checked={item.isMobile} />
		},
		{
			title: 'Order',
			dataIndex: 'STT',
			key: 'STT',
			align: 'center',
			render: (_, item) => <Typography variant="body1">{item.visOrder}</Typography>
		},
		{
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			fixed: 'left',
			width: '4%',
			render: (_, item) => <ActionsMenuSetting items={item} handleEditMenuSetting={handleEditMenuSetting} />
		}
	];
	return (
		<Table
			showSorterTooltip={false}
			rowKey="menuID"
			pagination={false}
			columns={columns}
			scroll={{
				x: matchesSM ? 900 : null,
				y: null
			}}
			dataSource={entities}
			loading={listLoading && <Spin />}
		/>
	);
}
