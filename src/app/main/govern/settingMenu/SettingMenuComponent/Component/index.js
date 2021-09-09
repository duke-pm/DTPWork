/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Table, Popover, Checkbox, Spin } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { sortDirestion } from '@fuse/core/DtpConfig';
import ActionsMenuSetting from '../SettingMenuContent/ActionsMenuSetting';

export default function TableSettingMenu({ entities, listLoading, handleEditMenuSetting, createSortHandler }) {
	const history = useHistory();
	// const filterOwner = value => {
	// 	console.log(value);
	// };
	// const onChange = value => {
	// 	console.log(value);
	// };
	const onChange = (pagination, filters, sorter, extra) => {
		const sort = sortDirestion[sorter.order];
		createSortHandler(sort, sorter.field);
	};
	const columns = [
		{
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			fixed: 'left',
			width: '4%',
			render: (_, item) => (
				<Popover
					overlayStyle={{ zIndex: '19' }}
					placement="rightTop"
					content={() => <ActionsMenuSetting items={item} handleEditMenuSetting={handleEditMenuSetting} />}
					title="Hành động"
				>
					<MoreVertIcon className="cursor-pointer" />
				</Popover>
			)
		},
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
			render: (_, item) => <Checkbox checked={item.inactive} />
		},
		{
			title: 'For Web',
			dataIndex: 'isWeb',
			key: 'isWeb',
			render: (_, item) => <Checkbox checked={item.isWeb} />
		},
		{
			title: 'For Mobile',
			dataIndex: 'isMobile',
			key: 'isMobile',
			render: (_, item) => <Checkbox checked={item.isMobile} />
		},
		{
			title: 'Order',
			dataIndex: 'STT',
			key: 'STT',
			render: (_, item) => <Checkbox checked={item.visOrder} />
		}
	];
	return (
		<Table
			showSorterTooltip={false}
			rowKey="menuID"
			pagination={false}
			columns={columns}
			dataSource={entities}
			onChange={onChange}
			loading={listLoading && <Spin />}
		/>
	);
}
