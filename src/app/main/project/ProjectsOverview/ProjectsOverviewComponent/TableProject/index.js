/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Table, Avatar, Progress } from 'antd';
import React from 'react';
import { CaretDownOutlined, CaretUpOutlined, UserOutlined } from '@ant-design/icons';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
// import { useDispatch } from 'react-redux';
import * as moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { typeColor } from 'app/main/project/Project/ProjectComponent/TableProject/ConfigTableProject';
// import { ProjectOverviewContext } from '../../ProjectOverviewContext';

function TableProject(props) {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('xl'));
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
	// const dispatch = useDispatch();
	const { entities } = props;
	// const projectContext = useContext(ProjectOverviewContext);
	// const { rowPage, page, status, ownerFilter, dateStart, search } = projectContext;
	const columns = [
		{
			title: 'Task Name',
			dataIndex: 'prjName',
			key: 'prjName',
			width: '40%',
			ellipsis: {
				showTitle: false
			},
			render: (_, item) => (
				<Typography variant="body1" component="button">
					{item.prjName}
				</Typography>
			)
		},
		{
			title: 'Duration',
			dataIndex: 'duration',
			key: 'duration',
			width: '15%',
			render: (_, item) => (
				<Badge size="default" style={{ color: item.colorCode }} color={item.colorCode} text={item.statusName} />
			)
		},
		{
			title: 'Start',
			align: 'center',
			dataIndex: 'crtdDate',
			key: 'crtdDate',
			width: '12%',
			render: (_, item) => <Typography variant="body1">{moment(item.crtdDate).format('DD/MM/YYYY')}</Typography>
		},
		{
			title: 'Finish',
			align: 'center',
			dataIndex: 'crtdDate',
			key: 'crtdDate',
			width: '12%',
			render: (_, item) => <Typography variant="body1">{moment(item.crtdDate).format('DD/MM/YYYY')}</Typography>
		},
		{
			title: 'Recource Names',
			align: 'center',
			dataIndex: 'public',
			key: 'public',
			width: '8%',
			render: (_, item) => (
				<div className="flex flex-row items-center">
					<Avatar size={32} style={{ backgroundColor: item.color }} icon={<UserOutlined />} />
					<Typography className="ml-8" variant="body1">
						{item.ownerName}
					</Typography>
				</div>
			)
		},
		{
			title: 'Progress',
			align: 'center',
			dataIndex: 'status',
			key: 'status',
			width: '15%',
			render: (_, item) => <Progress percent={item.percentage} strokeColor={typeColor[item.typeName]} />
		}
	];
	return (
		<Table
			rowKey="prjID"
			expandable={{
				expandRowByClick: false,
				expandIconAsCell: false,
				expandIconColumnIndex: 1,
				fixed: false,
				expandIcon: ({ expanded, onExpand, record, expandable }) =>
					expandable.length === 0 ? (
						<CaretUpOutlined className="w-40" style={{ color: 'white' }} />
					) : expanded ? (
						<CaretUpOutlined
							className="w-40"
							onClick={e => onExpand(record, e)}
							style={{ fontSize: '10pt' }}
						/>
					) : (
						<CaretDownOutlined
							className="w-40"
							onClick={e => onExpand(record, e)}
							style={{ fontSize: '10pt' }}
						/>
					)
			}}
			childrenColumnName="lstProjectItem"
			pagination={false}
			scroll={{ x: entities && entities.length ? (matches ? 1520 : 1540) : matchesSM ? 1540 : null }}
			columns={columns}
			dataSource={[]}
		/>
	);
}

export default withRouter(TableProject);
