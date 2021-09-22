/* eslint-disable jsx-a11y/anchor-is-valid */
import {
	Table,
	Popover
	// Avatar, Menu, Tooltip, Progress
} from 'antd';
import React from 'react'; // useState, useEffect // useContext
import { MenuItem, ListItemIcon, Icon, ListItemText } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router';
import Text from 'app/components/Text';
// import { useDispatch } from 'react-redux';
// import { useTheme } from '@material-ui/core/styles';
// import { LevelApprovalContext } from '../../LevelApprovalContext';

function TableLevelApproval(props) {
	// const dispatch = useDispatch();
	// const theme = useTheme();
	const { entities, listLoading } = props;
	// const levelApprovalContext = useContext(LevelApprovalContext);
	// const {} = lineContext;
	const handleEditForm = item => {};
	const deleteTask = item => {};
	const columns = [
		{
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			width: '2%',
			render: (_, item) => (
				<Popover
					placement="rightTop"
					content={() => (
						<>
							<MenuItem onClick={() => handleEditForm(item, 'Setting task')} role="button">
								<ListItemIcon className="min-w-40">
									<Icon> settings </Icon>
								</ListItemIcon>
								<ListItemText primary="Edit" />
							</MenuItem>
							<MenuItem onClick={() => deleteTask(item)} role="button">
								<ListItemIcon className="min-w-40">
									<Icon>delete</Icon>
								</ListItemIcon>
								<ListItemText primary="Delete" />
							</MenuItem>
						</>
					)}
					title="Action"
				>
					<MoreVertIcon className="cursor-pointer" />
				</Popover>
			)
		},
		{
			title: 'Mã quyền',
			align: 'center',
			dataIndex: 'roleID',
			key: 'roleID',
			render: (_, item) => <Text>{item.roleID}</Text>
		},
		{
			title: 'Tên quyền',
			align: 'center',
			dataIndex: 'roleName',
			key: 'roleName',
			render: (_, item) => <Text>{item.roleName}</Text>
		},
		{
			title: 'Cấp 1',
			align: 'center',
			dataIndex: 'level1',
			key: 'level1',
			render: (_, item) => <Text>{item.level1}</Text>
		},
		{
			title: 'Cấp 2',
			align: 'center',
			dataIndex: 'level2',
			key: 'level2',
			render: (_, item) => <Text>{item.level2}</Text>
		},
		{
			title: 'Cấp 3',
			align: 'center',
			dataIndex: 'level3',
			key: 'level3',
			render: (_, item) => <Text>{item.level3}</Text>
		},
		{
			title: 'Cấp 4',
			align: 'center',
			dataIndex: 'level4',
			key: 'level4',
			render: (_, item) => <Text>{item.level4}</Text>
		},
		{
			title: 'Cấp 5',
			align: 'center',
			dataIndex: 'level5',
			key: 'level5',
			render: (_, item) => <Text>{item.level5}</Text>
		}
	];
	return (
		<Table
			rowKey="absID"
			className="virtual-table"
			pagination={false}
			columns={columns}
			dataSource={entities}
			loading={listLoading}
		/>
	);
}

export default withRouter(TableLevelApproval);
