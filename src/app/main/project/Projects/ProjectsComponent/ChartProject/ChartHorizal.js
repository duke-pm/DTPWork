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
	console.log(valueName?.length);
	return (
		<Chart
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
						barHeight: valueName?.length < 4 ? '5%' : '30%'
					}
				},
				colors: ['#006565'],
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
				}
			}}
			series={[
				{
					name: 'Duration',
					data: valueDuration || []
				}
			]}
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
