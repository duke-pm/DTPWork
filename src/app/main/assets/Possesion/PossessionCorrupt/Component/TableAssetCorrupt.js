/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Table, Dropdown, Radio, Spin, Popover } from 'antd';
import React, { useContext } from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import { sortDirestion } from '@fuse/core/DtpConfig';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ActionHandleFunc from './ActionHandleFunc';
import { chipColor, chipText } from '../PossesionRepairConfig';

export default function TableAssetCorrupt({
	entities,
	listLoading,
	createSortHandler,
	handleOpenFormLiquiAsset,
	handleOpenFormService
}) {
	const dispatch = useDispatch();
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
					content={() => (
						<ActionHandleFunc
							handleOpenFormLiquiAsset={handleOpenFormLiquiAsset}
							handleOpenFormService={handleOpenFormService}
							items={item}
						/>
					)}
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
			render: (_, item) => <Typography variant="body1">{item.assetCode}</Typography>
		},
		{
			title: 'Tên tài sản',
			dataIndex: 'assetName',
			key: 'AssetName',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.assetName}</Typography>
		},
		{
			title: 'Nhóm tài sản',
			dataIndex: 'groupName',
			key: 'GroupName',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.groupName}</Typography>
		},
		{
			title: 'Loại tài sản',
			dataIndex: 'groupDetailName',
			key: 'GroupDetailName',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.groupDetailName}</Typography>
		},
		{
			title: 'Trạng thái',
			dataIndex: 'requestDate',
			key: 'StatusName',
			sorter: true,
			render: (_, item) => (
				<Typography variant="body1" className={`rounded-full inline px-10 py-4 ${chipColor[item.statusID]}`}>
					{chipText[item.statusID]}
				</Typography>
			)
		},
		{
			title: 'Ngày mua',
			dataIndex: 'purchaseDate',
			key: 'PurchaseDate',
			render: (_, item) => (
				<Typography variant="body1" className={`rounded-full inline px-10 py-4 ${chipColor[item.statusID]}`}>
					{item.purchaseDate ? moment(item.purchaseDate).format('DD-MM-YYYY') : ''}
				</Typography>
			)
		},
		{
			title: 'BP Quản lý',
			dataIndex: 'deptNameManager',
			key: 'DeptNameManager',
			render: (_, item) => <Typography variant="body1">{item.deptNameManager}</Typography>
		},
		{
			title: 'NV Quản lý',
			dataIndex: 'empName',
			key: 'EmpName',
			render: (_, item) => <Typography variant="body1">{item?.empName}</Typography>
		},
		{
			title: 'Khu vực',
			dataIndex: 'regionName',
			key: 'RegionName',
			render: (_, item) => <Typography variant="body1">{item.regionName}</Typography>
		},
		{
			title: 'Mã tham chiếu',
			dataIndex: 'remarks',
			key: 'Remark',
			render: (_, item) => <Typography variant="body1">{item.remarks}</Typography>
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
