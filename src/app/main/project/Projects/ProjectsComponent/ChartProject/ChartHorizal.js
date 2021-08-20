import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { durationDay } from '@fuse/core/DtpConfig';

export default function ChartHorizal({ entitiesGantt }) {
	const valueDuration = useMemo(() => {
		return entitiesGantt?.reduce((arr, curr) => [...arr, durationDay(curr.startDate, curr.endDate)], []);
	}, [entitiesGantt]);
	const valueName = useMemo(() => {
		return entitiesGantt?.reduce((arr, curr) => [...arr, curr.name], []);
	}, [entitiesGantt]);
	const valueColor = useMemo(() => {
		return entitiesGantt?.reduce((arr, curr) => [...arr, curr.color], []);
	}, [entitiesGantt]);
	console.log(valueColor);
	return (
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
	);
}
