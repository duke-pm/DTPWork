import React, { useEffect, useState } from 'react';
import { Avatar, Checkbox, Table } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { sliceString } from '@fuse/core/DtpConfig';
import { Button } from '@material-ui/core';
import { addTaskWatcher } from 'app/main/project/_redux/_projectActions';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseAnimate from '@fuse/core/FuseAnimate';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export default function DrawerWatchers() {
	const dispatch = useDispatch();
	const [isReceiveEmail, setIsReceiveEmail] = useState(false);
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesView, isWatcherOverView, isEmailOverView } = currentState;
	useEffect(() => {
		setIsReceiveEmail(isEmailOverView);
	}, [isEmailOverView]);
	const handleTraffic = () => {
		dispatch(addTaskWatcher(entitiesView.detail.taskID, isWatcherOverView, true, 'watcher'));
		setIsReceiveEmail(!isWatcherOverView);
	};
	const onChange = e => {
		dispatch(addTaskWatcher(entitiesView.detail.taskID, !isWatcherOverView, e.target.checked, 'isEmail'));
		setIsReceiveEmail(e.target.checked);
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
			title: 'Receive Email',
			dataIndex: 'IsReceiveEmail',
			width: '1%',
			render: (text, record, index) => (
				<>
					<Checkbox checked={record.isReceiveEmail} />
				</>
			)
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
					<div className="flex flex-row">
						<Button
							onClick={handleTraffic}
							type="submit"
							style={{ width: '10rem' }}
							className="h-26 font-sans mt-8"
							variant="contained"
							color="primary"
						>
							{isWatcherOverView ? <VisibilityOffIcon /> : <VisibilityIcon />}
						</Button>
						<div className="ml-8 mt-16">
							<Checkbox checked={isReceiveEmail} disabled={!isWatcherOverView} onChange={onChange}>
								<p style={{ fontWeight: 'bold', color: '#006565' }}>
									Recieve email notifications when members about changes{' '}
								</p>
							</Checkbox>
						</div>
					</div>
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
