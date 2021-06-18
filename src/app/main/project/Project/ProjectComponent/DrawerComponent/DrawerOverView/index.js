/* eslint-disable jsx-a11y/anchor-is-valid */
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Divider } from '@material-ui/core';
import { Dropdown, Menu, Badge, Avatar, Slider } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as moment from 'moment';
import { CaretDownOutlined, FileExcelOutlined, FileImageOutlined, FileWordOutlined } from '@ant-design/icons';
import { updatedTaskStatus, addTaskWatcher, fetchProjectDetailFilter } from 'app/main/project/_redux/_projectActions';
import { checkFile, nameFile, notificationConfig, URL } from '@fuse/core/DtpConfig';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useParams } from 'react-router';
import { badgeStatus, priorityColor } from '../../TableProject/ConfigTableProject';
import { ProjectContext } from '../../../ProjectContext';

function formatter(value) {
	return `${value}%`;
}
const file = {
	docx: <FileWordOutlined />,
	xlsx: <FileExcelOutlined />,
	png: <FileImageOutlined />,
	jpg: <FileImageOutlined />,
	jpge: <FileImageOutlined />
};
export default function DrawerOverView({ closeVisible }) {
	const dispatch = useDispatch();
	const params = useParams();
	const [process, setProcess] = useState(0);
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesView } = currentState;
	const projectContext = useContext(ProjectContext);
	const { rowPage, page, ownerFilter, status, dateStart, sector, search } = projectContext;
	useEffect(() => {
		if (entitiesView) {
			setProcess(entitiesView.detail.percentage);
		}
	}, [entitiesView]);
	const updatedStatus = type => {
		dispatch(updatedTaskStatus(entitiesView.detail, type)).then(data => {
			if (data && !data.isError) {
				closeVisible();
				notificationConfig('success', 'Success', 'Updated status success');
				dispatch(
					fetchProjectDetailFilter(
						params.detail,
						rowPage,
						page,
						ownerFilter,
						status,
						dateStart,
						sector,
						search
					)
				);
			}
		});
	};
	const handleChangeSlider = value => setProcess(value);
	const handleChangeSliderAfter = value => {
		dispatch(updatedTaskStatus(entitiesView.detail, entitiesView.detail.statusID, value)).then(data => {
			if (data && !data.isError) {
				notificationConfig('success', 'Success', 'Updated processing success');
				dispatch(
					fetchProjectDetailFilter(
						params.detail,
						rowPage,
						page,
						ownerFilter,
						status,
						dateStart,
						sector,
						search
					)
				);
			}
		});
	};
	const handleTraffic = () => {
		dispatch(addTaskWatcher(entitiesView.detail.taskID));
	};
	return (
		<FuseAnimate animation="transition.slideUpBigIn" delay={300}>
			<div className="flex flex-col">
				<div className="flex flex-row">
					<p className="text-xl font-medium" style={{ color: entitiesView && entitiesView.detail.typeColor }}>
						{' '}
						{entitiesView && entitiesView.detail.typeName}{' '}
					</p>
					<p className="text-xl font-medium ml-8 "> {entitiesView && entitiesView.detail.taskName} </p>
				</div>
				<div className="flex flex-row">
					<p>
						{' '}
						Created by {entitiesView && entitiesView.detail.author}. Last updated on{' '}
						{moment(entitiesView && entitiesView.detail.lUpdDate).format('DD/MM/YYYY')}{' '}
					</p>
				</div>
				<Divider />
				<div className="flex flex-col mt-16">
					<p className="text-xl font-medium">Action</p>
					<div className="flex flex-row justify-between">
						<div className="flex flex-row">
							<p className="text-base font-normal "> Status </p>
							<Dropdown
								className="ml-8"
								disabled={entitiesView && !entitiesView.detail.isUpdated}
								overlay={
									<Menu>
										<Menu.Item onClick={() => updatedStatus(1)} style={{ color: '#1890ff' }}>
											New
										</Menu.Item>
										<Menu.Item onClick={() => updatedStatus(2)} style={{ color: '#560bad' }}>
											To be scheduled
										</Menu.Item>
										<Menu.Item onClick={() => updatedStatus(3)} style={{ color: '#e85d04' }}>
											Scheduled
										</Menu.Item>
										<Menu.Item onClick={() => updatedStatus(4)} style={{ color: '#faad14' }}>
											In progress
										</Menu.Item>
										<Menu.Item onClick={() => updatedStatus(5)} style={{ color: '#d9d9d9' }}>
											Closed
										</Menu.Item>
										<Menu.Item onClick={() => updatedStatus(6)} style={{ color: '#52c41a' }}>
											On hold
										</Menu.Item>
										<Menu.Item onClick={() => updatedStatus(7)} style={{ color: '#ff4d4f' }}>
											Rejected
										</Menu.Item>
									</Menu>
								}
								placement="bottomLeft"
								arrow
							>
								<div className="flex flex-row">
									{' '}
									<Badge
										size="default"
										style={{
											color: badgeStatus[entitiesView && entitiesView.detail.statusID],
											cursor: 'pointer'
										}}
										color={badgeStatus[entitiesView && entitiesView.detail.statusID]}
										text={entitiesView && entitiesView.detail.statusName}
									/>
									<CaretDownOutlined style={{ cursor: 'pointer', marginLeft: '10px' }} />
								</div>
							</Dropdown>
						</div>
						<div className="flex flex-row ml-8">
							<p className="text-base font-normal "> Processing </p>
							<Slider
								disabled={entitiesView ? !entitiesView.detail.isUpdated || process === 100 : true}
								onChange={handleChangeSlider}
								onAfterChange={handleChangeSliderAfter}
								value={process}
								style={{ width: ' 240px', marginLeft: 30 }}
								tipFormatter={formatter}
							/>
						</div>
					</div>
					<Button
						onClick={handleTraffic}
						type="submit"
						style={{ width: '10rem' }}
						className="h-26 font-sans mb-16 "
						variant="contained"
						color="primary"
						startIcon={<VisibilityIcon />}
					>
						Watchers
					</Button>
				</div>
				<Divider />
				<div className="flex flex-col mt-16">
					<p className="text-xl font-medium">PEOPLE</p>
					<div className="flex flex-row">
						<p className="text-base font-normal "> Owner </p>
						<p className="text-base font-normal text-gray-500 ml-56 ">
							{' '}
							{entitiesView && entitiesView.detail.ownerName}{' '}
						</p>
					</div>
					<div className="flex flex-row">
						<p className="text-base font-normal "> Priority </p>
						<div className="text-base font-normal text-gray-500 ml-56 ">
							<Badge
								size="default"
								style={{ color: priorityColor[entitiesView && entitiesView.detail.priority] }}
								color={priorityColor[entitiesView && entitiesView.detail.priority]}
								text={entitiesView && entitiesView.detail.priorityName}
							/>
						</div>
					</div>
				</div>
				<Divider />
				<div className="flex flex-col mt-16">
					<p className="text-xl font-medium">ESTIMATE & TIME</p>
					<div className="flex flex-row">
						<p className="text-base font-normal "> Start date task </p>
						<p className="text-base font-normal text-gray-500 ml-56 ">
							{moment(entitiesView && entitiesView.detail.startDate).format('DD/MM/YYYY')}{' '}
						</p>
					</div>
					<div className="flex flex-row">
						<p className="text-base font-normal "> End date task </p>
						<div className="text-base font-normal text-gray-500 ml-56 ">
							{moment(entitiesView && entitiesView.detail.endDate).format('DD/MM/YYYY')}{' '}
						</div>
					</div>
				</div>
				<Divider />
				<div className="flex flex-col mt-16">
					<p className="text-xl font-medium">FILES</p>
					<div className="flex flex-row justify-between">
						{entitiesView && entitiesView.detail.attachFiles && (
							<div className="flex flex-row">
								<Avatar
									shape="square"
									size={54}
									style={{ backgroundColor: '#87d068' }}
									icon={
										entitiesView && file[checkFile(entitiesView && entitiesView.detail.attachFiles)]
									}
								/>
								<Button
									style={{ backgroundColor: 'none', marginLeft: '10px' }}
									href={`${URL}/${entitiesView && entitiesView.detail.attachFiles}`}
								>
									{' '}
									{entitiesView && nameFile(entitiesView && entitiesView.detail.attachFiles)}
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</FuseAnimate>
	);
}
