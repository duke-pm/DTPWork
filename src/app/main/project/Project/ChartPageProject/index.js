/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Spin, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { FrappeGantt } from 'frappe-gantt-react';
import moment from 'moment';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import {
	getTaskDetailAll,
	updatedGantt,
	fetchProjectDetailFilter,
	addTaskActivity,
	fetchProjectDetail
} from '../../_redux/_projectActions';

export default function ChartPage() {
	const { currentState, project } = useSelector(
		state => ({ currentState: state.project, project: state.project.entitiesDetail }),
		shallowEqual
	);
	const { actionLoading, entitiesGantt } = currentState;
	const history = useHistory();
	const dispatch = useDispatch();
	const params = useParams();
	const ExitPage = () => {
		history.goBack();
	};
	useEffect(() => {
		dispatch(getTaskDetailAll(params.detail));
	}, [params.detail, dispatch]);
	useEffect(() => {
		dispatch(fetchProjectDetail(params.detail));
	}, [params.detail, dispatch]);
	const onHandleChangeDate = (task, start, end) => {
		const data = [];
		const { id } = task;
		if (task.status !== 5 && task.status !== 7) {
			const newData = [
				...data,
				{ TaskID: id, StartDate: moment(start).format('YYYY-MM-DD'), EndDate: moment(end).format('YYYY-MM-DD') }
			];
			dispatch(updatedGantt(newData, params.detail)).then(data => {
				if (data && !data.isError) {
					dispatch(fetchProjectDetailFilter(params.detail));
					if (
						task.start !== moment(start).format('YYYY-MM-DD') ||
						task.end !== moment(end).format('YYYY-MM-DD')
					) {
						const comment = `*THỜI GIAN thay đổi từ ${moment(task.start).format('DD/MM/YYYY')} - ${moment(
							task.end
						).format('DD/MM/YYYY')} đến ${moment(start).format('DD/MM/YYYY')} - ${moment(end).format(
							'DD/MM/YYYY'
						)}`;
						dispatch(addTaskActivity(task.id, comment, 'type'));
					}
					dispatch(getTaskDetailAll(params.detail));
				}
			});
		} else {
			notificationConfig(
				'warning',
				notificationContent.content.en.faild,
				notificationContent.description.project.task.updateFailDate
			);
			dispatch(getTaskDetailAll(params.detail));
		}
	};
	return (
		<div className="container projects">
			<div className="projects__header px-16">
				<Typography color="primary" variant="h6">
					Gantt Chart {project?.projectName}
				</Typography>
				<div className="projects__header--action flex ">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="projects__content mt-8">
				<Spin spinning={actionLoading}>
					<div className="projects__content--ganttchart">
						{entitiesGantt.length > 0 && (
							<FrappeGantt
								tasks={entitiesGantt}
								onDateChange={(task, start, end) => onHandleChangeDate(task, start, end)}
								// onProgressChange={(task, progress) => onHandleChangeProcess(task, progress)}
							/>
						)}
					</div>
				</Spin>
			</div>
		</div>
	);
}
