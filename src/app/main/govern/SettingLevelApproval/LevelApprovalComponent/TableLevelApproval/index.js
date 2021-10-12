/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
	Table,
	Tooltip
	// Avatar, Menu, Tooltip, Progress
} from 'antd';
import React from 'react'; // useState, useEffect // useContext
import { Icon } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import { withRouter } from 'react-router';
import Text from 'app/components/Text';

function TableLevelApproval(props) {
	const { entities, listLoading, setTaskEdit, deleteLevel } = props;
	const handleEditForm = item => {
		setTaskEdit(item);
	};
	const deleteTask = item => {
		deleteLevel(item);
	};
	const columns = [
		{
			title: 'Code',
			align: 'left',
			dataIndex: 'roleID',
			key: 'roleID',
			render: (_, item) => <Text>{item.roleID}</Text>
		},
		{
			title: 'Description',
			align: 'left',
			dataIndex: 'roleName',
			key: 'roleName',
			render: (_, item) => <Text>{item.roleName ? item.roleName : '-'}</Text>
		},
		{
			title: 'Level 1',
			align: 'left',
			dataIndex: 'level1',
			key: 'level1',
			render: (_, item) => <Text>{item.listLevel?.[0].fullName ? item.listLevel?.[0].fullName : '-'}</Text>
		},
		{
			title: 'Level 2',
			align: 'left',
			dataIndex: 'level2',
			key: 'level2',
			render: (_, item) => <Text>{item.listLevel?.[1].fullName ? item.listLevel?.[1].fullName : '-'}</Text>
		},
		{
			title: 'Level 3',
			align: 'left',
			dataIndex: 'level3',
			key: 'level3',
			render: (_, item) => <Text>{item.listLevel?.[2].fullName ? item.listLevel?.[2].fullName : '-'}</Text>
		},
		{
			title: 'Level 4',
			align: 'left',
			dataIndex: 'level4',
			key: 'level4',
			render: (_, item) => <Text>{item.listLevel?.[3].fullName ? item.listLevel?.[3].fullName : '-'}</Text>
		},
		{
			title: 'Level 5',
			align: 'left',
			dataIndex: 'level5',
			key: 'level5',
			render: (_, item) => <Text>{item.listLevel?.[4].fullName ? item.listLevel?.[4].fullName : '-'}</Text>
		},
		{
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			width: '2%',
			render: (_, item) => (
				<div className="flex justify-between">
					<Tooltip className="mr-8" placement="bottom" title="Cập nhật">
						<span onClick={() => handleEditForm(item)} className="action--button mx-auto">
							<Icon fontSize="small">edit</Icon>
						</span>
					</Tooltip>
					<Tooltip placement="bottom" title="Xoá">
						<span onClick={() => deleteTask(item)} className="action--button mx-auto">
							<Icon fontSize="small">delete</Icon>
						</span>
					</Tooltip>
				</div>
			)
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
