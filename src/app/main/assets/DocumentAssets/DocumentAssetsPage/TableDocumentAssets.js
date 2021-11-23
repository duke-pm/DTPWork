/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Table, Spin, Popover } from 'antd';
import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import { getToken, sortDirestion, URL } from '@fuse/core/DtpConfig';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Text from 'app/components/Text';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DocumentTableAction } from '../DocumentAssetsComponents/DocumentTableAction';
import { fetchDetailDocumentAsset } from '../service/_actionDocumentAssets';

const chipColor = {
	2: 'bg-blue text-white',
	7: 'bg-green text-white'
};
const chipText = {
	2: 'Cấp phát',
	7: 'Thu hồi'
};
export default function TableDocumentAssets({ entities, listLoading }) {
	const theme = useTheme();
	const history = useHistory();
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
	const dispatch = useDispatch();
	const ExportExcelAllocation = item => {
		const token = getToken();
		const dataReq = {
			UserToken: token,
			AssetID: item.assetID
		};
		window.location = `${URL}/api/RQAsset/ExportAllocation?value=${JSON.stringify(dataReq)}`;
	};
	const ExportExcelRecovery = item => {
		const token = getToken();
		const dataReq = {
			UserToken: token,
			AssetID: item.assetID
		};
		window.location = `${URL}/api/RQAsset/ExportRequestRecovery?value=${JSON.stringify(dataReq)}`;
	};
	const ViewDetail = item => {
		dispatch(fetchDetailDocumentAsset(item));
		if (item.transStatus === 2) {
			history.push('/tai-san/tai-lieu/cap-phat');
		} else {
			history.push('/tai-san/tai-lieu/thu-hoi');
		}
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
						<DocumentTableAction ViewDetail={ViewDetail} ExportExcelRecovery={ExportExcelRecovery} ExportExcelAllocation={ExportExcelAllocation} items={item} />
					)}
					title="Hành động"
				>
					<MoreVertIcon className="cursor-pointer" />
				</Popover>
			)
		},
		{
			title: 'Mã tài sản',
			fixed: 'left',
			dataIndex: 'assetCode',
			key: 'assetCode',
			sorter: false,
			// defaultSortOrder: 'ascend',
			render: (_, item) => <Text>{item.assetCode}</Text>
		},
		{
			title: 'Tên tài sản',
			dataIndex: 'assetName',
			key: 'assetName',
			sorter: false,
			render: (_, item) => <Text>{item.assetName}</Text>
		},
		{
			title: 'Khu vực',
			dataIndex: 'regionName',
			key: 'regionName',
			sorter: false,
			render: (_, item) => <Text>{item.regionName}</Text>
		},
		{
			title: 'Nhân viên sử dụng',
			dataIndex: 'empName',
			key: 'empName',
			sorter: false,
			render: (_, item) => <Text>{item.empName}</Text>
		},
		{
			title: 'Chức vụ',
			dataIndex: 'jobTitle',
			key: 'jobTitle',
			sorter: false,
			render: (_, item) => <Text>{item.jobTitle}</Text>
		},
		{
			title: 'Bộ phận',
			dataIndex: 'deptName',
			key: 'deptName',
			sorter: false,
			render: (_, item) => <Text>{item.deptName}</Text>
		},
		{
			title: 'Loại',
			dataIndex: 'typeName',
			key: 'typeName',
			sorter: false,
			render: (_, item) => (
				<Text className={`inline-flex rounded-32 px-10 py-4 ${chipColor[item.transStatus]}`} color="white">
					{chipText[item.transStatus]}
				</Text>
			)
		},
		{
			title: 'Ngày',
			dataIndex: 'strTransDate',
			key: 'strTransDate',
			sorter: false,
			render: (_, item) => <Text>{item.strTransDate}</Text>
		},
		// {
		// 	title: 'Trạng thái',
		// 	dataIndex: 'requestDate',
		// 	key: 'StatusName',
		// 	sorter: true,
		// 	render: (_, item) => (
		// 		<Text className={`inline-flex rounded-32 px-10 py-4 ${chipColor[item.statusID]}`} color="white">
		// 			{chipText[item.statusID]}
		// 		</Text>
		// 	)
		// },
		{
			title: 'Lý do',
			dataIndex: 'remarks',
			key: 'reasons',
			render: (_, item) => <Text>{item.reasons}</Text>
		}
	];
	return (
		<Table
			showSorterTooltip={false}
			rowKey="lineNum"
			pagination={false}
			columns={columns}
			scroll={{
				x: matchesSM ? 1800 : 1900,
				y: null
			}}
			dataSource={entities}
			loading={listLoading && <Spin />}
		/>
	);
}
