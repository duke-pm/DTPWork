/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Avatar, Dropdown, Input, Menu, Radio, Switch, Table, Tooltip } from 'antd';
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
const options = [
	{ label: 'Apple', value: 'Apple' },
	{ label: 'Pear', value: 'Pear' },
	{ label: 'Orange', value: 'Orange' }
];

export default function TableResourceGroup() {
	const history = useHistory();
	const filterOwner = value => {
		console.log(value);
	};
	const onChange = value => {
		console.log(value);
	};
	const handChangeRouteView = () => {
		history.push('/booking/resource-group/view/6');
	};
	const columns = [
		{
			title: 'Code',
			dataIndex: 'code',
			key: 'code',
			render: (_, item) => <Typography variant="body1">{item.code}</Typography>
		},
		{
			title: () => {
				return (
					<div className="flex justify-around items-center ">
						Name
						<Icon className="cursor-pointer"> arrow_drop_down </Icon>
					</div>
				);
			},
			dataIndex: 'name',
			align: 'center',
			key: 'name',
			render: (_, item) => (
				<div onClick={handChangeRouteView} className="flex items-center cursor-pointer">
					<div className="">
						{' '}
						<Icon color="primary" fontSize="small">
							ad_units
						</Icon>{' '}
					</div>
					<Typography variant="name" className="ml-8 ">
						{item.name}
					</Typography>
				</div>
			)
		},
		{
			title: 'Descriptions',
			dataIndex: 'description',
			key: 'description',
			render: (_, item) => <Typography variant="body1">{item.description}</Typography>
		},
		{
			title: () => {
				return (
					<div className="flex justify-around items-center ">
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
			title: 'Last modifide',
			dataIndex: 'lastModifide',
			key: 'lastModifide',
			render: (_, item) => <Typography variant="body1">{item.lastModifide}</Typography>
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
							<Icon fontSize="small">delete</Icon>
						</span>
					</Tooltip>
				</div>
			)
		}
	];
	function footer() {
		return 'Here is footer';
	}

	return <Table rowKey="id" pagination={false} columns={columns} dataSource={data} />;
}
