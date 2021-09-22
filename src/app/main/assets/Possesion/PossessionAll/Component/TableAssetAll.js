/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Table, Spin, Popover } from 'antd';
import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import { sortDirestion } from '@fuse/core/DtpConfig';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Text from 'app/components/Text';
import PossessionAction from './ActionComponent/PossessionAction';
import { chipColor, chipText } from '../ConfigPossessionAll';

export default function TableAssetAll({ entities, listLoading, createSortHandler, HandleOpenHistory }) {
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
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
					content={() => <PossessionAction HandleOpenHistory={HandleOpenHistory} item={item} />}
					title="Hành động"
				>
					<MoreVertIcon className="cursor-pointer" />
				</Popover>
			)
		},
		{
			title: 'Mã tài sản',
			dataIndex: 'assetCode',
			key: 'AssetCode',
			sorter: true,
			// defaultSortOrder: 'ascend',
			render: (_, item) => <Text>{item.assetCode}</Text>
		},
		{
			title: 'Tên tài sản',
			dataIndex: 'assetName',
			key: 'AssetName',
			sorter: true,
			render: (_, item) => <Text>{item.assetName}</Text>
		},
		{
			title: 'Nhóm tài sản',
			dataIndex: 'groupName',
			key: 'GroupName',
			sorter: true,
			render: (_, item) => <Text>{item.groupName}</Text>
		},
		{
			title: 'Loại tài sản',
			dataIndex: 'groupDetailName',
			key: 'GroupDetailName',
			sorter: true,
			render: (_, item) => <Text>{item.groupDetailName}</Text>
		},
		{
			title: 'Trạng thái',
			dataIndex: 'requestDate',
			key: 'StatusName',
			sorter: true,
			render: (_, item) => (
				<Text className={`inline-flex rounded-32 px-10 py-4 ${chipColor[item.statusID]}`} color="white">
					{chipText[item.statusID]}
				</Text>
			)
		},
		{
			title: 'Ngày mua',
			dataIndex: 'purchaseDate',
			key: 'PurchaseDate',
			render: (_, item) => <Text>{item.purchaseDate ? moment(item.purchaseDate).format('DD/MM/YYYY') : '-'}</Text>
		},
		{
			title: 'BP Quản lý',
			dataIndex: 'deptNameManager',
			key: 'DeptNameManager',
			render: (_, item) => <Text>{item.deptNameManager}</Text>
		},
		{
			title: 'NV Quản lý',
			dataIndex: 'empName',
			key: 'EmpName',
			render: (_, item) => <Text>{item?.empName}</Text>
		},
		{
			title: 'Khu vực',
			dataIndex: 'regionName',
			key: 'RegionName',
			render: (_, item) => <Text>{item.regionName}</Text>
		},
		{
			title: 'Mã tham chiếu',
			dataIndex: 'remarks',
			key: 'Remark',
			render: (_, item) => <Text>{item.remarks}</Text>
		}
	];
	return (
		<Table
			showSorterTooltip={false}
			rowKey="assetCode"
			pagination={false}
			columns={columns}
			scroll={{
				x: matchesSM ? 900 : 1900,
				y: null
			}}
			dataSource={entities}
			onChange={onChange}
			loading={listLoading && <Spin />}
		/>
	);
}
