/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, Popover, Tooltip, Checkbox } from 'antd';
import React from 'react';
import { MenuItem, ListItemIcon, Icon, ListItemText } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Text from 'app/components/Text';
import { withRouter } from 'react-router';

function TableProject(props) {
	const { setEditLine, entities, listLoading } = props;
	const handleEditForm = item => {
		setEditLine(item);
	};
	const columns = [
		{
			title: 'Mã quyền',
			align: 'left',
			dataIndex: 'roleCode',
			key: 'roleCode',
			render: (_, item) => <Text>{item.roleCode}</Text>
		},
		{
			title: 'Tên quyền',
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
				<div>
					<Tooltip placement="bottom" title="Cập nhật">
						<span onClick={() => handleEditForm(item)} className="action--button mx-auto">
							<Icon fontSize="small">edit</Icon>
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
