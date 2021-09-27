import React, { useEffect, useState } from 'react';
import { Avatar, Checkbox, Table } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { sliceString } from '@fuse/core/DtpConfig';
import { Button, Grid } from '@material-ui/core';
import { addTaskWatcher } from 'app/main/project/_redux/_projectActions';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseAnimate from '@fuse/core/FuseAnimate';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useTheme } from '@material-ui/core/styles';
import Text from 'app/components/Text';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function Watchers() {
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
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
			width: '7%',
			className: 'items-center',
			render: (_, item) => <Avatar>{sliceString(item.userName).toUpperCase()}</Avatar>
		},
		{
			title: 'Full name',
			dataIndex: 'fullName',
			key: 'fullName',
			width: '30%',
			render: (_, item) => <Text type="body">{item.fullName}</Text>
		},
		{
			title: 'Receive Email',
			dataIndex: 'IsReceiveEmail',
			width: '15%',
			align: 'center',
			render: (text, record, index) => <Checkbox checked={record.isReceiveEmail} />
		},
		{
			title: 'Date view',
			dataIndex: 'timeUpdate',
			key: 'timeUpdate',
			width: '20%',
			render: (_, item) => <Text type="body">{item.timeUpdate}</Text>
		}
	];
	return (
		<div>
			<div className="flex flex-col">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<Grid container className="flex flex-row sm:items-start md:items-center">
						<Grid item xs={5} md={3}>
							<Button
								onClick={handleTraffic}
								type="submit"
								style={{ width: '10rem' }}
								className="h-26"
								variant="contained"
								color="primary"
							>
								{isWatcherOverView ? <VisibilityOffIcon /> : <VisibilityIcon />}
							</Button>
						</Grid>
						<Grid item xs={7} md={9}>
							<div>
								<Checkbox checked={isReceiveEmail} disabled={!isWatcherOverView} onChange={onChange}>
									<Text type="caption" style={{ color: '#006565' }}>
										Recieve email notifications when members about changes
									</Text>
								</Checkbox>
							</div>
						</Grid>
					</Grid>
				</FuseAnimateGroup>
			</div>
			<div className="mt-16 table__overview">
				<Text type="caption">List of user following your tasks</Text>
				<FuseAnimate animation="transition.slideUpBigIn" delay={300}>
					<Table
						rowKey="rowNum"
						className="virtual-table"
						scroll={{ x: matchesSM && 620, y: null }}
						pagination={false}
						columns={columns}
						dataSource={entitiesView && entitiesView.watcher}
					/>
				</FuseAnimate>
			</div>
		</div>
	);
}
