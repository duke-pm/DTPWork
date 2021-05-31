import { Badge, Checkbox, Table, Popover } from 'antd';
import React, { useContext } from 'react';
import { MinusCircleTwoTone, PlusCircleTwoTone, UnorderedListOutlined, UpOutlined } from '@ant-design/icons';
import { MenuItem, ListItemIcon, Icon, ListItemText } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { ProjectContext } from '../../ProjectContext';

const data = [
	{
		key: 1,
		name: 'Demo project',
		sector: 'HCM',
		description: 'Text description',
		status: <Badge size="default" status="success" style={{ color: '#52c41a' }} text="ON TRACK" />,
		public: <Checkbox checked />,
		createdOn: '31/05/2021',
		children: [
			{
				key: 11,
				name: 'Demo project',
				sector: 'HCM',
				description: 'Text description',
				status: <Badge size="default" status="success" style={{ color: '#52c41a' }} text="ON TRACK" />,
				public: <Checkbox checked />,
				createdOn: '31/05/2021'
			}
		]
	},
	{
		key: 2,
		name: 'Scrum project',
		sector: 'HCM',
		description: 'Text description',
		status: <Badge size="default" status="success" style={{ color: '#52c41a' }} text="ON TRACK" />,
		public: <Checkbox checked />,
		createdOn: '31/05/2021'
	}
];
export default function TableProject() {
	const projectContext = useContext(ProjectContext);
	const { setFormProject } = projectContext;
	const handleOpenFormProject = item => {
		setFormProject(true);
		console.log(item);
	};
	const columns = [
		{
			title: <UnorderedListOutlined />,
			align: 'center',
			key: 'operation',
			width: '8%',
			render: (_, item) => (
				<>
					<Popover
						overlayStyle={{ zIndex: '19' }}
						placement="rightTop"
						content={() => (
							<>
								<MenuItem role="button">
									<ListItemIcon className="min-w-40">
										<Icon>visibility</Icon>
									</ListItemIcon>
									<ListItemText primary="Project detail" />
								</MenuItem>
								<MenuItem onClick={() => handleOpenFormProject(item)} role="button">
									<ListItemIcon className="min-w-40">
										<Icon>edit</Icon>
									</ListItemIcon>
									<ListItemText primary="Edit" />
								</MenuItem>
							</>
						)}
						title="Action"
					>
						<MoreVertIcon className="cursor-pointer" />
					</Popover>
				</>
			)
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: '12%'
		},
		{
			title: 'Sector',
			dataIndex: 'sector',
			key: 'sector',
			width: '6%'
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'sector',
			width: '18%'
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: '12%'
		},
		{
			title: 'Public',
			dataIndex: 'public',
			key: 'public',
			width: '5%'
		},
		{
			title: 'Created on',
			dataIndex: 'createdOn',
			key: 'public',
			width: '12%'
		}
	];
	return (
		<>
			{' '}
			<Table pagination={false} columns={columns} dataSource={data} />{' '}
		</>
	);
}
