import React from 'react';
import { Avatar, Table } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { sliceString } from '@fuse/core/DtpConfig';
import { Button } from '@material-ui/core';
import { addTaskWatcher } from 'app/main/project/_redux/_projectActions';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseAnimate from '@fuse/core/FuseAnimate';
import VisibilityIcon from '@material-ui/icons/Visibility';

export default function DrawerWatchers() {
	const dispatch = useDispatch();
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesView } = currentState;
	const handleTraffic = () => {
		dispatch(addTaskWatcher(entitiesView.detail.taskID));
	};
	const columns = [
		{
			title: '',
			dataIndex: 'userName',
			key: 'userName',
			width: '1%',
			render: (_, item) => (
				<div className="flex flex-row">
					{' '}
					<Avatar
						style={{
							backgroundColor: '#87d068',
							verticalAlign: 'middle',
							marginTop: 5
						}}
						size="large"
					>
						<p className="uppercase"> {sliceString(item.userName)}</p>
					</Avatar>{' '}
				</div>
			)
		},
		{
			title: 'User name',
			dataIndex: 'userName',
			key: 'userName',
			width: '2%'
		},
		{
			title: 'Full name',
			dataIndex: 'fullName',
			key: 'fullName',
			width: '2%'
		},
		{
			title: 'Date view',
			dataIndex: 'timeUpdate',
			key: 'timeUpdate',
			width: '2%'
		}
	];
	return (
		<div>
			<div className="flex flex-col ml-8">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<div className="text-sm font-medium text-black head-example "> View </div>
					<div className="w-full flex-none text-sm font-normal text-gray-500">
						List of user viewing your tasks{' '}
					</div>
					<Button
						onClick={handleTraffic}
						type="submit"
						style={{ width: '10rem' }}
						className="h-26 font-sans mt-8"
						variant="contained"
						color="primary"
					>
						<VisibilityIcon />
					</Button>
				</FuseAnimateGroup>
			</div>
			<div className="mt-16">
				<FuseAnimate animation="transition.slideUpBigIn" delay={300}>
					<Table
						rowKey="rowNum"
						className="virtual-table"
						// scroll={{ y: 290 }}
						pagination={false}
						columns={columns}
						dataSource={entitiesView && entitiesView.watcher}
					/>
				</FuseAnimate>
			</div>
		</div>
	);
}
