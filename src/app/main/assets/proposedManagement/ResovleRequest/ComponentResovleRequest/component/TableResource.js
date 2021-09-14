/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Dropdown, Popover, Radio, Table } from 'antd';
import React, { useContext } from 'react';
import * as moment from 'moment';
import { useDispatch } from 'react-redux';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { chipColor, chipText, chipTextColor, chipTextType } from '../ResovleRequestConfig';
import { ResovleContext } from '../../ResovleRequestContext';
import { searchConfirms } from '../../../_redux/confirmAction';
import ActionsResovle from '../ActionsResovle';

export default function TableResovleRequest({ entities, listloading, handleOpenDialog, handleOpenTimeLine }) {
	const dispatch = useDispatch();
	const confirmConext = useContext(ResovleContext);
	const { search, rowPage, page, status, dateEnd, dateStart, sort, setRequestTypeId } = confirmConext;
	const onChange = e => {
		const { target } = e;
		setRequestTypeId(target.value);
		dispatch(
			searchConfirms(
				true,
				status,
				rowPage,
				page,
				target.value,
				sort.id,
				sort.direction,
				search,
				dateStart,
				dateEnd
			)
		);
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
						<ActionsResovle
							handleOpenTimeLine={handleOpenTimeLine}
							items={item}
							handleOpenDialog={handleOpenDialog}
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
			dataIndex: 'code',
			key: 'code',
			render: (_, item) => <Typography variant="body1">{item.requestID}</Typography>
		},
		{
			title: 'Tên nhân viên',
			dataIndex: 'name',
			key: 'name',
			render: (_, item) => <Typography variant="body1">{item.fullName}</Typography>
		},
		{
			title: 'Bộ phận',
			dataIndex: 'deptName',
			key: 'deptName',
			render: (_, item) => <Typography variant="body1">{item.deptName}</Typography>
		},
		{
			title: 'Khu vực',
			dataIndex: 'regionName',
			key: 'regionName',
			render: (_, item) => <Typography variant="body1">{item.regionName}</Typography>
		},
		{
			title: 'Ngày yêu cầu',
			dataIndex: 'requestDate',
			key: 'requestDate',
			render: (_, item) => (
				<Typography variant="body1">
					{item.requestDate && moment(item.requestDate).format('DD-MM-YYYY')}{' '}
				</Typography>
			)
		},
		{
			title: () => {
				return (
					<div className="flex items-center ">
						Loại yêu cầu
						<Dropdown
							overlay={
								<div className="filter--type">
									<Radio.Group
										onChange={onChange}
										options={[
											{ value: '0', label: 'Tất cả' },
											{ value: '1', label: 'Yêu cầu cấp phát' },
											{ value: '2', label: 'Báo hỏng' },
											{ value: '3', label: 'Báo mất' }
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
			dataIndex: 'requestTypeID',
			key: 'requestTypeID',
			render: (_, item) => (
				<div className={`inline text-12 p-4 rounded-full truncate ${chipTextColor[item.requestTypeID]}`}>
					{chipTextType[item.requestTypeID]}
				</div>
			)
		},
		{
			title: 'Trạng thái',
			dataIndex: 'statusID',
			key: 'statusID',
			render: (_, item) => (
				<div className={`inline text-12 p-4 rounded-full truncate ${chipColor[item.statusID]}`}>
					{chipText[item.statusID]}
				</div>
			)
		}
	];
	return (
		<Table rowKey="requestID" pagination={false} columns={columns} dataSource={entities} loading={listloading} />
	);
}
