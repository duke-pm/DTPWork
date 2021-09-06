/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Spin, Tooltip } from 'antd';
import React, { useMemo, useEffect } from 'react';
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
	addTaskActivity
} from '../../_redux/_projectActions';

export default function OverviewPage() {
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { actionLoading, entitiesGantt } = currentState;
	const history = useHistory();
	const dispatch = useDispatch();
	const params = useParams();
	console.log(params);
	const ExitPage = () => {
		history.goBack();
	};
	// useEffect(() => {
	// 	dispatch(getTaskDetailAll(params.detail));
	// }, [params.detail]);
	return (
		<div className="container projects">
			<div className="projects__header px-16">
				<Typography color="primary" variant="h6">
					Overview
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
					<div className="projects__content--ganttchart">chartjs</div>
				</Spin>
			</div>
		</div>
	);
}
