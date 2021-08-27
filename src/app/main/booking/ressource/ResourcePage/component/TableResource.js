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
		name: 'Phong hop',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 2,
		code: 'BKEV-14',
		name: 'Phong hop',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 3,
		code: 'BKEV-14',
		name: 'Phong hop',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 4,
		code: 'BKEV-14',
		name: 'Phong hop',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 5,
		code: 'BKEV-14',
		name: 'Phong hop',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 6,
		code: 'BKEV-14',
		name: 'Phong hop',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 7,
		code: 'BKEV-14',
		name: 'Phong hop',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 8,
		code: 'BKEV-14',
		name: 'Phong hop',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 9,
		code: 'BKEV-14',
		name: 'Phong hop',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 10,
		code: 'BKEV-14',
		name: 'Phong hop',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 11,
		code: 'BKEV-14',
		name: 'Phong hop',
		owner: 'The Linh',
		resourcemanager: '',
		lastModifide: '25/08/2021 02:03 PM',
		status: true
	},
	{
		id: 12,
		code: 'BKEV-14',
		name: 'Phong hop',
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

export default function TableResource() {
	const history = useHistory();
	const filterOwner = value => {
		console.log(value);
	};
	const onChange = value => {
		console.log(value);
	};
	const handChangeRouteView = () => {
		history.push('/booking/resource/view/6');
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
			dataIndex: 'name',
			align: 'center',
			key: 'name',
			render: (_, item) => (
				<div onClick={handChangeRouteView} className="flex justify-around items-center cursor-pointer">
					<div className="resource__radio--button" style={{ backgroundColor: '#006565' }} />
					<Typography variant="name">{item.name}</Typography>
				</div>
			)
		},
		{
			title: 'Resource',
			dataIndex: 'resource',
			key: 'resource',
			render: (_, item) => <Typography variant="body1">{item.resource}</Typography>
		},
		{
			title: () => {
				return (
					<div className="flex justify-around items-center ">
						Owner
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
			align: 'center',
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
			title: 'Resource Manager',
			dataIndex: 'resourcemanager',
			key: 'resourcemanager',
			render: (_, item) => <Typography variant="body1">{item.resourcemanager}</Typography>
		},
		{
			title: 'Last modifide',
			dataIndex: 'lastModifide',
			key: 'lastModifide',
			render: (_, item) => <Typography variant="body1">{item.lastModifide}</Typography>
		},
		{
			title: () => {
				return (
					<div className="flex justify-around items-center ">
						Status
						<Dropdown
							overlay={
								<Menu overlaystyle={{ width: '200px' }}>
									<Menu.Item>
										<Checkbox>Active</Checkbox>
									</Menu.Item>
									<Menu.Item>
										<Checkbox>Inactive</Checkbox>
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
			dataIndex: 'status',
			key: 'status',
			render: (_, item) => <Switch defaultChecked />
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
