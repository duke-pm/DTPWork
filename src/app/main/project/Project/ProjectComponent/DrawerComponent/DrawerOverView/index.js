/* eslint-disable jsx-a11y/anchor-is-valid */
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Divider, Typography, Grid } from '@material-ui/core';
import { Dropdown, Menu, Badge, Avatar, Slider, Tooltip } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as moment from 'moment';
import {
	CaretDownOutlined,
	FileExcelOutlined,
	FileImageOutlined,
	FileWordOutlined,
	UserOutlined
} from '@ant-design/icons';
import {
	updatedTaskStatus,
	addTaskWatcher,
	fetchProjectDetailFilter,
	getTaskDetailAll,
	addTaskActivity,
	getTaskViewDetail
} from 'app/main/project/_redux/_projectActions';
import { checkDeadline, checkFile, nameFile, notificationConfig, URL } from '@fuse/core/DtpConfig';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useParams } from 'react-router';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { badgeText, priorityColor } from '../../TableProject/ConfigTableProject';
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
export default function DrawerOverView({ closeVisible, ArrProjectStatus }) {
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
	const dispatch = useDispatch();
	const params = useParams();
	const [process, setProcess] = useState(0);
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesView, isWatcherOverView } = currentState;
	const projectContext = useContext(ProjectContext);
	const { rowPage, page, ownerFilter, status, dateStart, sector, search } = projectContext;
	useEffect(() => {
		if (entitiesView) {
			setProcess(entitiesView.detail.percentage);
		}
	}, [entitiesView]);
	const updatedStatus = type => {
		if (type === 5) {
			dispatch(updatedTaskStatus(entitiesView.detail, type, 100)).then(data => {
				if (data && !data.isError) {
					dispatch(getTaskViewDetail(entitiesView.detail.taskID));
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.project.task.updateStatusTask
					);
					let str = '';
					if (entitiesView.detail.percentage !== 100) {
						str = `${str} *TIẾN ĐỘ (%) được thay đổi từ ${entitiesView.detail.percentage} đến 100.`;
					}
					if (entitiesView.detail.statusName !== type) {
						str = `${str} *TRẠNG THÁI được thay đổi từ ${entitiesView.detail.statusName} đến ${badgeText[type]}`;
					}
					if (str !== '') dispatch(addTaskActivity(entitiesView.detail.taskID, str));
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
					dispatch(getTaskDetailAll(params.detail, ownerFilter, status, sector, search));
				}
			});
		} else {
			dispatch(updatedTaskStatus(entitiesView.detail, type)).then(data => {
				if (data && !data.isError) {
					dispatch(getTaskViewDetail(entitiesView.detail.taskID));
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.project.task.updateStatusTask
					);
					if (entitiesView.detail.statusName !== type) {
						const comment = `*TRẠNG THÁI được thay đổi từ ${entitiesView.detail.statusName} đến ${badgeText[type]}`;
						dispatch(addTaskActivity(entitiesView.detail.taskID, comment));
					}
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
					dispatch(getTaskDetailAll(params.detail, ownerFilter, status, sector, search));
				}
			});
		}
	};
	const handleChangeSlider = value => setProcess(value);
	const handleChangeSliderAfter = value => {
		dispatch(updatedTaskStatus(entitiesView.detail, entitiesView.detail.statusID, value)).then(data => {
			if (data && !data.isError) {
				setProcess(value);
				notificationConfig(
					'success',
					notificationContent.content.en.success,
					notificationContent.description.project.task.updateProcessingTask
				);
				if (entitiesView.detail.percentage !== value) {
					const comment = `*TIẾN ĐỘ (%) được thay đổi từ ${entitiesView.detail.percentage} đến ${value}`;
					dispatch(addTaskActivity(entitiesView.detail.taskID, comment));
				}
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
				dispatch(getTaskDetailAll(params.detail, ownerFilter, status, sector, search));
				dispatch(getTaskViewDetail(entitiesView.detail.taskID));
			} else {
				dispatch(getTaskViewDetail(entitiesView.detail.taskID));
			}
		});
	};
	const handleTraffic = () => {
		dispatch(addTaskWatcher(entitiesView.detail.taskID, isWatcherOverView, true, 'watcher'));
	};
	return (
		<FuseAnimate animation="transition.slideUpBigIn" delay={300}>
			<div className="flex flex-col">
				<div className="flex flex-row items-center">
					<Typography variant="h6" style={{ color: entitiesView?.detail.typeColor }}>
						{entitiesView?.detail.typeName}
					</Typography>
					<Typography className="ml-16" variant="h6">{entitiesView?.detail.taskName}</Typography>
				</div>
				<Typography variant="caption">
					Created by <span style={{ fontWeight: 'bold' }}>{entitiesView?.detail.crtdUser}</span>. Last updated
					on {moment(entitiesView?.detail.lUpdDate).format('DD/MM/YYYY')}{' '}
				</Typography>

				<div className="mt-16">
					<Grid container className="flex flex-row items-center">
						<Grid item xs={4} md={2}>
							<Typography variant="body1">Description:</Typography>
						</Grid>
						<Grid item xs={8} md={10}>
							<Typography variant="body1">{entitiesView?.detail.descr}</Typography>
						</Grid>
					</Grid>
				</div>
				<div className="flex flex-col mt-20">
					<Typography className="font-extrabold" variant="subtitle2">
						ACTION
					</Typography>
					<Divider />
					<Grid container>
						<Grid item xs={12} md={6} className="mt-16">
							<Grid container className="flex flex-row items-center">
								<Grid item xs={3}>
									<Typography variant="body1">Status</Typography>
								</Grid>
								<Grid item xs={9}>
									<Dropdown
										disabled={!entitiesView?.detail.isUpdated}
										overlay={
											<Menu>
												{ArrProjectStatus?.map(itemStatus => (
													<Menu.Item
														key={itemStatus.value}
														onClick={() => updatedStatus(itemStatus.value)}
														style={{ color: itemStatus.colorCode }}
													>
														{itemStatus.label}
													</Menu.Item>
												))}
											</Menu>
										}
										placement="bottomLeft"
										arrow
									>
										<div className="flex flex-row items-center">
											<Badge
												size="default"
												style={{
													color: entitiesView?.detail.colorCode,
													cursor: 'pointer'
												}}
												color={entitiesView?.detail.colorCode}
												text={entitiesView?.detail.statusName}
											/>
											<CaretDownOutlined style={{ cursor: 'pointer', marginLeft: '10px' }} />
										</div>
									</Dropdown>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={12} md={6} className="mt-16">
							<Grid container className="flex flex-row items-center">
								<Grid item xs={3}>
									<Typography variant="body1">Progress</Typography>
								</Grid>
								<Grid item xs={9}>
									<Slider
										disabled={entitiesView ? !entitiesView.detail.isUpdated : true}
										onChange={handleChangeSlider}
										onAfterChange={handleChangeSliderAfter}
										value={process}
										tipFormatter={formatter}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Button
						onClick={handleTraffic}
						type="submit"
						style={{ width: '15rem' }}
						className="h-26 font-sans mt-16"
						variant="contained"
						color="primary"
						startIcon={!isWatcherOverView ? <VisibilityIcon /> : <VisibilityOffIcon />}
					>
						{!isWatcherOverView ? 'Follow' : 'Unfollow'}
					</Button>
				</div>
				<div className="flex flex-col mt-20">
					<Typography className="font-extrabold" variant="subtitle2">
						PEOPLE & TIME
					</Typography>
					<Divider />
					<div className="flex flex-row items-center">
						<Grid container className="flex flex-row items-center">
							<Grid item xs={12} md={5} className="mt-16">
								<Grid container className="flex flex-row items-center">
									<Grid item xs={6}>
										<Typography variant="body1">Start date</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="body1">
											{moment(entitiesView?.detail.startDate).format('DD/MM/YYYY')}
										</Typography>
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={0} md={2} />

							<Grid item xs={12} md={5} className="mt-16">
								<Grid container className="flex flex-row items-center">
									<Grid item xs={6}>
										<Typography variant="body1">End date</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="body1">
											{moment(entitiesView?.detail.endDate).format('DD/MM/YYYY')}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</div>
					<div className="mt-16">
						<Grid container className="flex flex-row items-center">
							<Grid item xs={4}>
								<Typography variant="body1">Assignee</Typography>
							</Grid>
							<Grid item xs={8}>
								<div className="flex flex-row items-center">
									<Avatar size={32} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
									<Typography className="ml-8" variant="body1">
										{entitiesView?.detail.ownerName}
									</Typography>
								</div>
							</Grid>
						</Grid>
					</div>
					<div className="mt-16">
						<Grid container className="flex flex-row items-center">
							<Grid item xs={4}>
								<Typography variant="body1">Members</Typography>
							</Grid>
							<Grid item xs={8}>
								<Avatar.Group maxCount={5} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
									{entitiesView?.detail.lstUserInvited?.map(av => (
										<Tooltip key={av.userID} title={av.fullName} placement="top">
											<Avatar style={{ backgroundColor: '#87d068' }}>
												<Typography color="inherit" variant="subtitle1">
													{av.alphabet}
												</Typography>
											</Avatar>
										</Tooltip>
									))}
								</Avatar.Group>
							</Grid>
						</Grid>
					</div>
					<div className="mt-16">
						<Grid container className="flex flex-row items-center">
							<Grid item xs={4}>
								<Typography variant="body1">Priority</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography
									variant="body1"
									style={{ color: priorityColor[entitiesView?.detail.priority] }}
								>
									{entitiesView?.detail.priorityName}
								</Typography>
							</Grid>
						</Grid>
					</div>
					{checkDeadline(entitiesView?.detail.endDate) > 0 &&
						entitiesView?.detail.statusID !== 5 &&
						entitiesView?.detail.statusID !== 6 &&
						entitiesView?.detail.statusID !== 7 &&
						entitiesView?.detail.typeName === 'TASK' && (
							<div className="mt-16">
								<Grid container className="flex flex-row items-center">
									<Grid item xs={4}>
										<Typography variant="body1">Deadline</Typography>
									</Grid>
									<Grid item xs={8}>
										<Typography variant="body1" style={{ color: 'red' }}>
											Expired {checkDeadline(entitiesView?.detail.endDate)} days
										</Typography>
									</Grid>
								</Grid>
							</div>
						)}
				</div>
				<div className="flex flex-col mt-20">
					<Typography className="font-extrabold" variant="subtitle2">
						DETAIL
					</Typography>
					<Divider />
					<div className="mt-16">
						<Grid container className="flex flex-row items-center">
							<Grid item xs={4}>
								<Typography variant="body1">Sector</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant="body1">{entitiesView?.detail.sectorName}</Typography>
							</Grid>
						</Grid>
					</div>
					<div className="mt-16">
						<Grid container className="flex flex-row items-center">
							<Grid item xs={4}>
								<Typography variant="body1">Grade</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant="body1">{entitiesView?.detail.gradeName}</Typography>
							</Grid>
						</Grid>
					</div>
					<div className="mt-16">
						<Grid container className="flex flex-row items-center">
							<Grid item xs={4}>
								<Typography variant="body1">Component</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant="body1">{entitiesView?.detail.componentName}</Typography>
							</Grid>
						</Grid>
					</div>
					<div className="mt-16">
						<Grid container className="flex flex-row items-center">
							<Grid item xs={4}>
								<Typography variant="body1">Author</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant="body1">{entitiesView?.detail.author}</Typography>
							</Grid>
						</Grid>
					</div>
					<div className="mt-16">
						<Grid container className="flex flex-row items-center">
							<Grid item xs={4}>
								<Typography variant="body1">Origin Publisher</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant="body1">{entitiesView?.detail.originPublisher}</Typography>
							</Grid>
						</Grid>
					</div>
					<div className="mt-16">
						<Grid container className="flex flex-row items-center">
							<Grid item xs={4}>
								<Typography variant="body1">Ownership DTP</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant="body1">{entitiesView?.detail.ownershipDTP}</Typography>
							</Grid>
						</Grid>
					</div>
				</div>
				<div className="flex flex-col mt-20">
					<Typography className="font-extrabold" variant="subtitle2">
						FILES
					</Typography>
					<Divider />
					<div className="flex flex-row justify-between mt-16">
						{entitiesView?.detail.attachFiles && (
							<div className="flex flex-row items-center">
								<Avatar
									shape="square"
									size={54}
									style={{ backgroundColor: '#87d068' }}
									icon={entitiesView && file[checkFile(entitiesView?.detail.attachFiles)]}
								/>
								<Button
									style={{ backgroundColor: 'none', marginLeft: '10px' }}
									href={`${URL}/${entitiesView?.detail.attachFiles}`}
								>
									<Typography variant="button">
										{entitiesView && nameFile(entitiesView?.detail.attachFiles)}
									</Typography>
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</FuseAnimate>
	);
}
