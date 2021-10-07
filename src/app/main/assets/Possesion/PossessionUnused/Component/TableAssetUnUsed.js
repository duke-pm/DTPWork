/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Table, Spin, Popover } from 'antd';
import { sortDirestion } from '@fuse/core/DtpConfig';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import Text from 'app/components/Text';
import PossesionActions from './PossesionActions';

export default function TableAssetUnUsed({
	entities,
	listLoading,
	createSortHandler,
	handleOpenForm,
	handleOpenFormEdit
}) {
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
						<PossesionActions
							handleOpenForm={handleOpenForm}
							item={item}
							handleOpenFormEdit={handleOpenFormEdit}
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
			fixed: 'left',
			// defaultSortOrder: 'ascend',
			render: (_, item) => <Text type="body">{item.assetCode}</Text>
		},
		{
			title: 'Tên tài sản',
			dataIndex: 'assetName',
			key: 'AssetName',
			sorter: true,
			render: (_, item) => <Text type="body">{item.assetName}</Text>
		},
		{
			title: 'Nhóm tài sản',
			dataIndex: 'groupName',
			key: 'GroupName',
			sorter: true,
			render: (_, item) => <Text type="body">{item.groupName}</Text>
		},
		{
			title: 'Loại tài sản',
			dataIndex: 'groupDetailName',
			key: 'GroupDetailName',
			sorter: true,
			render: (_, item) => <Text type="body">{item.groupDetailName}</Text>
		},
		{
			title: 'Ngày mua',
			dataIndex: 'purchaseDate',
			key: 'PurchaseDate',
			render: (_, item) => (
				<Text type="body">{item.purchaseDate ? moment(item.purchaseDate).format('DD/MM/YYYY') : '-'}</Text>
			)
		},
		{
			title: 'Nguyên giá',
			dataIndex: 'purchaseDate',
			key: 'OriginalPrice',
			render: (_, item) => <Text type="body">{currencyFormat(item.originalPrice)}</Text>
		},
		{
			title: 'BP Quản lý',
			dataIndex: 'deptNameManager',
			key: 'DeptNameManager',
			render: (_, item) => <Text type="body">{item.deptNameManager}</Text>
		},
		{
			title: 'Mã tham chiếu',
			dataIndex: 'remarks',
			key: 'Remark',
			render: (_, item) => <Text type="body">{item.remarks}</Text>
		}
	];
	return (
		<Table
			showSorterTooltip={false}
			rowKey="assetCode"
			pagination={false}
			columns={columns}
			scroll={{
				x: matchesSM ? 1500 : 1900,
				y: null
			}}
			dataSource={entities}
			onChange={onChange}
			loading={listLoading && <Spin />}
		/>
	);
}
