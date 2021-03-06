/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Table, Dropdown, Radio, Spin, Popover } from 'antd';
import React, { useContext } from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import { getToken, sortDirestion, URL } from '@fuse/core/DtpConfig';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ActionsAllocation from './ActionsAllocation';
import { chipColor, chipText } from '../ConfrimAllocationConfig';
import { ConfirmContext } from '../../ConfirmContext';
import { searchConfirms } from '../../../_redux/confirmAction';

export default function TableConfirmAll({
	entities,
	listLoading,
	createSortHandler,
	handleOpenTimeLine,
	handleOpenForm
}) {
	const confirmConext = useContext(ConfirmContext);
	const dispatch = useDispatch();
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
	const { search, rowPage, page, setStatus, status, dateEnd, dateStart, sort } = confirmConext;
	const handleOnChangeStatus = e => {
		const { target } = e;
		setStatus(target.value);
		dispatch(
			searchConfirms(false, target.value, rowPage, page, 1, sort.id, sort.direction, search, dateStart, dateEnd)
		);
	};
	const onChange = (pagination, filters, sorter, extra) => {
		const sort = sortDirestion[sorter.order];
		createSortHandler(sort, sorter.field);
	};
	const ExportExcel = requestId => {
		const token = getToken();
		const dataReq = {
			UserToken: token,
			RequestID: requestId
		};
		window.location = `${URL}/api/RQAsset/ExportRequestAllocation?value=${JSON.stringify(dataReq)}`;
	};
	const columns = [
		{
			title: <AppsIcon />,
			align: 'center',
			key: 'operation',
			fixed: 'left',
			width: '4%',
			render: (_, item) => (
				<Popover
					overlayStyle={{ zIndex: '19' }}
					placement="rightTop"
					content={() => (
						<ActionsAllocation
							ExportExcel={ExportExcel}
							handleOpenTimeLine={handleOpenTimeLine}
							items={item}
							handleOpenForm={handleOpenForm}
						/>
					)}
					title="H??nh ?????ng"
				>
					<MoreVertIcon className="cursor-pointer" />
				</Popover>
			)
		},
		{
			title: '#',
			dataIndex: 'requestID',
			key: 'requestID',
			sorter: true,
			// defaultSortOrder: 'ascend',
			render: (_, item) => <Typography variant="body1">{item.requestID}</Typography>
		},
		{
			title: 'T??n nh??n vi??n ',
			dataIndex: 'fullName',
			key: 'fullName',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.fullName}</Typography>
		},
		{
			title: 'B??? ph???n',
			dataIndex: 'deptName',
			key: 'deptName',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.deptName}</Typography>
		},
		{
			title: 'Khu v???c',
			dataIndex: 'regionName',
			key: 'regionName',
			sorter: true,
			render: (_, item) => <Typography variant="body1">{item.regionName}</Typography>
		},
		{
			title: 'Ng??y y??u c???u',
			dataIndex: 'requestDate',
			key: 'requestDate',
			sorter: true,
			render: (_, item) => (
				<Typography variant="body1">
					{item.requestDate && moment(item.requestDate).format('DD-MM-YYYY')}
				</Typography>
			)
		},
		{
			title: () => {
				return (
					<div className="flex items-center ">
						Tr???ng th??i
						<Dropdown
							overlay={
								<div className="filter--status">
									<Radio.Group
										value={status}
										onChange={handleOnChangeStatus}
										options={[
											{ value: '0', label: 'T???t c???' },
											{ value: '1', label: 'Ch??? ph?? duy???t' },
											{ value: '2', label: '???? duy???t' },
											{ value: '3', label: 'Ho??n th??nh' },
											{ value: '4', label: 'T??? ch???i' }
										]}
									/>
								</div>
							}
							placement="bottomRight"
							arrow
						>
							<Icon className="cursor-pointer"> arrow_drop_down </Icon>
						</Dropdown>
					</div>
				);
			},
			dataIndex: 'statusID',
			key: 'statusID',
			render: (_, item) => (
				<Typography variant="body1" className={`rounded-full inline px-10 py-4 ${chipColor[item.statusID]}`}>
					{chipText[item.statusID]}
				</Typography>
			)
		}
	];
	return (
		<Table
			showSorterTooltip={false}
			rowKey="requestID"
			pagination={false}
			columns={columns}
			scroll={{
				x: matchesSM ? 1200 : null,
				y: null
			}}
			dataSource={entities}
			onChange={onChange}
			loading={listLoading && <Spin />}
		/>
	);
}
