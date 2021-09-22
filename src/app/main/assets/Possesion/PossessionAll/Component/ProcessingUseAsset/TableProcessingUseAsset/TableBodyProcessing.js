import { Typography } from '@material-ui/core';
import React from 'react';
import * as moment from 'moment';
import { Table } from 'antd';
import Text from 'app/components/Text';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { chipColor } from './TableConfigProcessing';

export default function TableBodyProcessing({ history }) {
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
	const columns = [
		{
			title: 'Ngày',
			dataIndex: 'Date',
			key: 'Date',
			sorter: true,
			// defaultSortOrder: 'ascend',
			render: (_, item) => <Text>{moment(item.transDate).format('DD/MM/YYYY')}</Text>
		},
		{
			title: 'Mã NV',
			dataIndex: 'empCode',
			key: 'empCode',
			sorter: true,
			render: (_, item) => <Text>{item.empCode}</Text>
		},
		{
			title: 'Tên NV',
			dataIndex: 'empName',
			key: 'empName',
			sorter: true,
			render: (_, item) => <Text>{item.empName}</Text>
		},
		{
			title: 'Vị trí công việc',
			dataIndex: 'obTitle',
			key: 'obTitle',
			sorter: true,
			render: (_, item) => <Text>{item.jobTitle}</Text>
		},
		{
			title: 'Bộ phận',
			dataIndex: 'deptName',
			key: 'deptName',
			render: (_, item) => <Text>{item.deptName}</Text>
		},
		{
			title: 'Khu vực',
			dataIndex: 'Region',
			key: 'Region',
			render: (_, item) => <Text>{item.regionName}</Text>
		},
		{
			title: 'Trạng thái',
			dataIndex: 'Status',
			key: 'Status',
			render: (_, item) => (
				<div className={`inline text-12 p-4 rounded-full truncate ${chipColor[item.transStatus]}`}>
					{item.statusName}
				</div>
			)
		}
	];
	return (
		<Table
			showSorterTooltip={false}
			rowKey="lineNum"
			pagination={false}
			columns={columns}
			scroll={{
				x: matchesSM ? 900 : 1900,
				y: null
			}}
			dataSource={history}
		/>
	);
}
