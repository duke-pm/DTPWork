/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Table, Dropdown, Radio, Spin, Popover } from 'antd';
import React, { useContext } from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import { sortDirestion } from '@fuse/core/DtpConfig';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { ConfirmContext } from '../../ConfirmContext';
import { searchConfirms } from '../../../_redux/confirmAction';
import { chipColor, chipText } from '../LoseConfig';
import LoseActions from './LoseActions';

export default function TableConfirLost({
	entities,
	listLoading,
	createSortHandler,
	handleOpenTimeLine,
	handleOpenForm
}) {
	const confirmConext = useContext(ConfirmContext);
	const dispatch = useDispatch();
	const { search, rowPage, page, setStatus, status, dateEnd, dateStart, sort } = confirmConext;
	const handleOnChangeStatus = e => {
		const { target } = e;
		setStatus(target.value);
		dispatch(
			searchConfirms(false, target.value, rowPage, page, 3, sort.id, sort.direction, search, dateStart, dateEnd)
		);
	};
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
						<LoseActions
							handleOpenTimeLine={handleOpenTimeLine}
							items={item}
							handleOpenForm={handleOpenForm}
						/>
					)}
					title="Hành động"
				>
					<MoreVertIcon className="cursor-pointer" />
				</Popover>
			)
		},
		{
			title: '#',
			dataIndex: 'requestID',
			key: 'requestID',
			sorter: true,
			// defaultSortOrder: 'ascend',
			render: (_, item) => <Typography variant="body1">{item.requestID}</Typography>
		},
		{
			title: 'Tên nhân viên ',
			dataIndex: 'fullName',
			key: 'fullName',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.fullName}</Typography>
		},
		{
			title: 'Bộ phận',
			dataIndex: 'deptName',
			key: 'deptName',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.deptName}</Typography>
		},
		{
			title: 'Khu vực',
			dataIndex: 'regionName',
			key: 'regionName',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.regionName}</Typography>
		},
		{
			title: 'Ngày yêu cầu',
			dataIndex: 'requestDate',
			key: 'requestDate',
			sorter: true,
			render: (_, item) => (
				<Typography variant="body1">
					{item.requestDate && moment(item.requestDate).format('DD-MM-YYYY')}
				</Typography>
			)
		},
		{
			title: () => {
				return (
					<div className="flex items-center ">
						Trạng thái
						<Dropdown
							overlay={
								<div className="filter--status">
									<Radio.Group
										value={status}
										onChange={handleOnChangeStatus}
										options={[
											{ value: '0', label: 'Tất cả' },
											{ value: '1', label: 'Chờ phê duyệt' },
											{ value: '2', label: 'Đã duyệt' },
											{ value: '3', label: 'Hoàn thành' },
											{ value: '4', label: 'Từ chối' }
										]}
									/>
								</div>
							}
							placement="bottomRight"
							arrow
						>
							<Icon className="cursor-pointer"> arrow_drop_down </Icon>
						</Dropdown>
					</div>
				);
			},
			dataIndex: 'statusID',
			key: 'statusID',
			render: (_, item) => (
				<Typography variant="body1" className={`rounded-full inline px-10 py-4 ${chipColor[item.statusID]}`}>
					{chipText[item.statusID]}
				</Typography>
			)
		}
	];
	return (
		<Table
			showSorterTooltip={false}
			rowKey="requestID"
			pagination={false}
			columns={columns}
			dataSource={entities}
			onChange={onChange}
			loading={listLoading && <Spin />}
		/>
	);
}
