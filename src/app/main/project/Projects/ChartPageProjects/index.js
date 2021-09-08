/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Spin, Tooltip } from 'antd';
import React, { useMemo, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import Chart from 'react-apexcharts';
import { durationDay } from '@fuse/core/DtpConfig';
import { getTaskDetailAll } from '../../_redux/_projectActions';

export default function ChartPage() {
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { actionLoading, entitiesGantt } = currentState;
	const history = useHistory();
	const dispatch = useDispatch();
	const params = useParams();
	const handleChangePageTask = () => {
		history.push(`/quan-ly-du-an/${params.detail}`);
	};
	const ExitPage = () => {
		history.goBack();
	};
	useEffect(() => {
		dispatch(getTaskDetailAll(params.detail));
	}, [params.detail, dispatch]);
	const valueDuration = useMemo(() => {
		return entitiesGantt?.reduce((arr, curr) => [...arr, durationDay(curr.startDate, curr.endDate)], []);
	}, [entitiesGantt]);
	const valueName = useMemo(() => {
		return entitiesGantt?.reduce((arr, curr) => [...arr, curr.name], []);
	}, [entitiesGantt]);
	const valueColor = useMemo(() => {
		return entitiesGantt?.reduce((arr, curr) => [...arr, curr.color], []);
	}, [entitiesGantt]);
	return (
		<div className="container projects">
			<div className="projects__header px-16">
				<Typography color="primary" variant="h6">
					Statistical
				</Typography>
				<div className="projects__header--action flex ">
					<Tooltip placement="bottom" title="Open detail">
						<span onClick={handleChangePageTask} className="action--button">
							<Icon fontSize="small">visibility</Icon>
						</span>
					</Tooltip>
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="projects__content mt-8">
				<Spin spinning={actionLoading}>
					<div className="projects__content--chart">
						<Chart
							series={[
								{
									name: 'Duration',
									data: valueDuration || []
								}
							]}
							options={{
								chart: {
									toolbar: {
										show: false
									},
									type: 'bar'
								},
								plotOptions: {
									bar: {
										borderRadius: 4,
										horizontal: true,
										distributed: true,
										barHeight: valueName?.length < 4 ? '5%' : '30%'
									}
								},
								colors: valueColor,
								dataLabels: {
									enabled: false,
									formatter: val => {
										return `${val} days`;
									}
								},
								yaxis: {
									labels: {
										show: true,
										formatter: val => {
											return `${val} days`;
										}
									}
								},
								xaxis: {
									categories: valueName || [],
									labels: {
										formatter(val) {
											return `${val} days`;
										}
									}
								},
								legend: {
									show: true,
									showForSingleSeries: true,
									customLegendItems: ['TASK', 'PHASE', 'MILESTONE'],
									markers: {
										fillColors: ['#007AFF', '#FF9500', '#34C759']
									}
								}
							}}
							animations={{
								enabled: true,
								easing: 'linear',
								speed: 800,
								animateGradually: {
									enabled: true,
									delay: 150
								},
								dynamicAnimation: {
									enabled: true,
									speed: 350
								}
							}}
							type="bar"
							height="auto"
						/>
					</div>
				</Spin>
			</div>
		</div>
	);
}
