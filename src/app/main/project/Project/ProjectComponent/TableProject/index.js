import { Badge, Checkbox, Table, Popover, Avatar } from 'antd';
import React, { useContext } from 'react';
import { MinusCircleTwoTone, PlusCircleTwoTone, UnorderedListOutlined, UpOutlined } from '@ant-design/icons';
import { MenuItem, ListItemIcon, Icon, ListItemText } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import * as actions from '../../../_redux/_projectActions';

const data = [
	{
		key: 1,
		type: 'Task',
		subject: 'Organize open source...',
		grade: '',
		component: '',
		status: <Badge size="default" status="success" style={{ color: '#52c41a' }} text="Scheduled" />,
		createdOn: '31/05/2021',
		startDate: '31/05/2021',
		finishDate: '31/05/2021',
		assignee: '31/05/2021',
		children: [
			{
				key: 2,
				type: 'Task',
				subject: 'Organize open source...',
				grade: '',
				component: '',
				status: <Badge size="default" status="success" style={{ color: '#52c41a' }} text="Scheduled" />,
				createdOn: '31/05/2021',
				startDate: '31/05/2021',
				finishDate: '31/05/2021',
				assignee: '31/05/2021'
			}
		]
	},
	{
		key: 3,
		type: 'Task',
		subject: 'Organize open source...',
		grade: '',
		component: '',
		status: <Badge size="default" status="success" style={{ color: '#52c41a' }} text="Scheduled" />,
		createdOn: '31/05/2021',
		startDate: '31/05/2021',
		finishDate: '31/05/2021',
		assignee: '31/05/2021'
	}
];
function TableProject(props) {
	const dispatch = useDispatch();
	const columns = [
		{
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			width: '18%',
			render: (_, item) => (
				<>
					<Popover
						overlayStyle={{ zIndex: '19' }}
						placement="rightTop"
						content={() => (
							<>
								<MenuItem role="button">
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
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			width: '18%'
		},
		{
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
			width: '20%'
		},
		{
			title: 'Grade',
			dataIndex: 'grade',
			key: 'grade',
			width: 150
		},
		{
			title: 'Component',
			dataIndex: 'component',
			key: 'component',
			width: '18%'
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: '18%'
		},
		{
			title: 'Start Date',
			dataIndex: 'startDate',
			key: 'startDate',
			width: '18%'
		},
		{
			title: 'FinishDate',
			dataIndex: 'finishDate',
			key: 'finishDate',
			width: '18%'
		},
		{
			title: 'Assignee',
			dataIndex: 'assignee',
			key: 'assignee',
			width: '18%',
			render: (_, item) => (
				<div className="flex flex-row">
					{' '}
					<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>DP</Avatar>{' '}
					<p className="ml-8 mt-6"> Duc Phung</p>{' '}
				</div>
			)
		}
	];
	return (
		<>
			{' '}
			<Table
				className="virtual-table"
				expandable={{
					expandRowByClick: true,
					expandIconAsCell: false,
					expandIconColumnIndex: 1
				}}
				scroll={{ x: 1540, y: 440 }}
				pagination={false}
				columns={columns}
				dataSource={data}
			/>{' '}
		</>
	);
}

export default withRouter(TableProject);
