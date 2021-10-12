/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, Tooltip, Checkbox } from 'antd';
import React from 'react';
import { Icon } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import Text from 'app/components/Text';
import { withRouter } from 'react-router';

function TableProject(props) {
	const { setEditLine, entities, listLoading, deleteItem } = props;
	const handleEditForm = item => setEditLine(item);
	const deleteTask = item => deleteItem(item);
	const columns = [
		{
			title: 'Code',
			align: 'left',
			dataIndex: 'roleCode',
			key: 'roleCode',
			render: (_, item) => <Text>{item.roleCode}</Text>
		},
		{
			title: 'Mô tả',
			align: 'left',
			dataIndex: 'roleName',
			key: 'roleName',
			render: (_, item) => <Text>{item.roleName}</Text>
		},
		{
			title: 'Inactive',
			align: 'center',
			dataIndex: 'inactive',
			key: 'inactive',
			render: (_, item) => <Checkbox checked={item.inactive}> </Checkbox>
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
			rowKey="roleID"
			className="virtual-table"
			pagination={false}
			columns={columns}
			dataSource={entities}
			loading={listLoading}
		/>
	);
}

export default withRouter(TableProject);
