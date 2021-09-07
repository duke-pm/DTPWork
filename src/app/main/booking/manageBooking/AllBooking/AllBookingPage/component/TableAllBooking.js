/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Avatar, Dropdown, Menu, Table, Tooltip } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React from 'react';
import { useHistory } from 'react-router-dom';

const data = [
	{
		id: 1,
		code: 'BKEV-14',
		name: 'Đào tạo',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 2,
		code: 'BKEV-14',
		name: 'Đào tạo',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 3,
		code: 'BKEV-14',
		name: 'Đào tạo',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 4,
		code: 'BKEV-14',
		name: 'Đào tạo',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 5,
		code: 'BKEV-14',
		name: 'Đào tạo',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 6,
		code: 'BKEV-14',
		name: 'Đào tạo',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 7,
		code: 'BKEV-14',
		name: 'Đào tạo',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 8,
		code: 'BKEV-14',
		name: 'Đào tạo',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 9,
		code: 'BKEV-14',
		name: 'Đào tạo',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 10,
		code: 'BKEV-14',
		name: 'Đào tạo',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 11,
		code: 'BKEV-14',
		name: 'Đào tạo',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 12,
		code: 'BKEV-14',
		name: 'Đào tạo',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	}
];
export default function TableAllBooking() {
	const history = useHistory();
	// const filterOwner = value => {
	// 	console.log(value);
	// };
	// const onChange = value => {
	// 	console.log(value);
	// };
	const handChangeRouteView = () => {
		history.push('/booking/view/6');
	};
	const columns = [
		{
			title: 'Code',
			dataIndex: 'code',
			key: 'code',
			render: (_, item) => <Typography variant="body1">{item.code}</Typography>
		},
		{
			title: 'Booking Title',
			dataIndex: 'bookingTitle',
			align: 'left',
			key: 'bookingTitle',
			render: (_, item) => (
				<Typography className="cursor-pointer" onClick={handChangeRouteView} variant="body1">
					{item.name}
				</Typography>
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
						<Typography variant="body1"> 04/09/2021 </Typography>{' '}
						<Typography variant="caption"> 22:00 </Typography>{' '}
					</div>
					<div>
						<Icon fontSize="small" color="primary">
							{' '}
							arrow_forward{' '}
						</Icon>
					</div>
					<div>
						<Typography variant="body1"> 04/09/2021 </Typography>{' '}
						<Typography variant="caption"> 22:00 </Typography>{' '}
					</div>
				</div>
			)
		},
		{
			title: 'Resource',
			dataIndex: 'resource',
			key: 'resource',
			render: (_, item) => <Typography variant="body1">phong hop</Typography>
		},
		{
			title: 'Frequency',
			dataIndex: 'frequency',
			key: 'frequency',
			render: (_, item) => <Typography variant="body1">One-time booking</Typography>
		},
		{
			title: () => {
				return (
					<div className="flex items-center ">
						Created by
						<Dropdown
							overlay={
								<Menu overlaystyle={{ width: '200px' }}>
									<Menu.Item>
										<Checkbox>User1</Checkbox>
									</Menu.Item>
								</Menu>
							}
							placement="bottomRight"
							arrow
						>
							<Icon className="cursor-pointer"> arrow_drop_down </Icon>
						</Dropdown>
					</div>
				);
			},
			dataIndex: 'owner',
			key: 'owner',
			align: 'left',
			render: (_, item) => (
				<div className="flex items-center">
					<Avatar size="small" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
						L
					</Avatar>{' '}
					<Typography className="ml-8" variant="body1">
						{item.owner}
					</Typography>
				</div>
			)
		},
		{
			title: 'Time of creation',
			dataIndex: 'lastModifide',
			key: 'lastModifide',
			render: (_, item) => <Typography variant="body1">21:59 25/08/2021</Typography>
		},
		{
			title: '',
			dataIndex: 'status',
			key: 'status',
			render: (_, item) => (
				<div className="flex justify-end">
					<Tooltip placement="bottom" title="Edit">
						<span className="action--button mr-14">
							<Icon fontSize="small">edit</Icon>
						</span>
					</Tooltip>
					<Tooltip placement="bottom" title="Delete">
						<span className="action--button ">
							<Icon size="small">delete</Icon>
						</span>
					</Tooltip>
				</div>
			)
		}
	];

	return <Table rowKey="id" pagination={false} columns={columns} dataSource={data} />;
}
