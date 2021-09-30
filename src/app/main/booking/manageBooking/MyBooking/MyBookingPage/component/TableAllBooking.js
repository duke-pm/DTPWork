/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { sortDirestion } from '@fuse/core/DtpConfig';
import { Icon } from '@material-ui/core';
import { Avatar, Table, Tooltip } from 'antd';
import Text from 'app/components/Text';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { deleteBooking, setTaskEditBooking } from '../../../_reduxBooking/bookingActions';
import { colorStatus, colorText } from '../../../BookingConfig';

export default function TableAllBooking({ entities, createSortHandler, listLoading }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
	const onChange = (pagination, filters, sorter, extra) => {
		const sort = sortDirestion[sorter.order];
		createSortHandler(sort, sorter.field);
	};
	const handChangeRouteView = item => {
		dispatch(setTaskEditBooking(item));
		history.push(`/booking/view/${item.bookID}`);
	};
	const handleEdit = item => {
		history.push('/booking/modify-booking/updated');
		dispatch(setTaskEditBooking(item));
	};
	const handleDelete = item => {
		dispatch(deleteBooking(item.bookID));
	};
	const columns = [
		{
			title: 'Code',
			dataIndex: 'bookID',
			key: 'bookID',
			sorter: true,
			render: (_, item) => <Text type="body">{item.bookID}</Text>
		},
		{
			title: 'Booking Title',
			dataIndex: 'purpose',
			align: 'left',
			key: 'purpose',
			sorter: true,
			render: (_, item) => (
				<Text className="cursor-pointer" onClick={() => handChangeRouteView(item)} type="body">
					{item.purpose}
				</Text>
			)
		},
		{
			title: 'Booking Time',
			dataIndex: 'bookingTime',
			align: 'left',
			key: 'bookingTime',
			render: (_, item) => (
				<div className="flex justify-between items-center">
					<div>
						<Text type="body"> {moment(item.startDate).format('DD/MM/YYYY')} </Text>{' '}
						<Text type="caption"> {item.strStartTime} </Text>{' '}
					</div>
					<div>
						<Icon fontSize="small" color="primary">
							{' '}
							arrow_forward{' '}
						</Icon>
					</div>
					<div>
						<Text type="body"> {moment(item.endDate).format('DD/MM/YYYY')} </Text>{' '}
						<Text type="caption"> {item.strEndTime} </Text>{' '}
					</div>
				</div>
			)
		},
		{
			title: 'Resource',
			dataIndex: 'resourceName',
			key: 'resourceName',
			sorter: true,
			render: (_, item) => <Text type="body">{item.resourceName}</Text>
		},
		// {
		// 	title: 'Frequency',
		// 	dataIndex: 'frequency',
		// 	key: 'frequency',
		// 	render: (_, item) => <Text type="body">One-time booking</Text>
		// },
		{
			title: 'Created by',
			dataIndex: 'ownerName',
			key: 'ownerName',
			sorter: true,
			align: 'left',
			render: (_, item) => (
				<div className="flex items-center">
					<Avatar size="small" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
						{item.ownerNameAlpha}
					</Avatar>{' '}
					<Text className="ml-8" type="body">
						{item.ownerName}
					</Text>
				</div>
			)
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			sorter: true,
			align: 'left',
			render: (_, item) => (
				<span
					className="status"
					style={{ backgroundColor: colorStatus[item.statusName], color: colorText[item.statusName] }}
				>
					{' '}
					{item.statusName}{' '}
				</span>
			)
		},
		{
			title: 'Time of creation',
			dataIndex: 'lastModifide',
			key: 'lastModifide',
			sorter: true,
			render: (_, item) => <Text type="body">{item.strCrtdDate}</Text>
		},
		{
			title: '',
			dataIndex: 'status',
			key: 'status',
			render: (_, item) => (
				<div className="flex justify-end">
					<Tooltip disabled placement="bottom" title="Edit">
						<button
							disabled={!item.isUpdated}
							onClick={() => handleEdit(item)}
							className="action--button mr-14"
						>
							<Icon fontSize="small">edit</Icon>
						</button>
					</Tooltip>
					<Tooltip placement="bottom" title="Delete">
						<button
							disabled={!item.isUpdated}
							onClick={() => handleDelete(item)}
							className="action--button "
						>
							<Icon size="small">delete</Icon>
						</button>
					</Tooltip>
				</div>
			)
		}
	];

	return (
		<Table
			showSorterTooltip={false}
			onChange={onChange}
			rowKey="bookID"
			scroll={{
				x: matchesSM ? 1200 : null,
				y: null
			}}
			pagination={false}
			columns={columns}
			dataSource={entities?.lstBooking}
			loading={listLoading}
		/>
	);
}
