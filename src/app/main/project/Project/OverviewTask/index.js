/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Divider, Grid, Icon, Typography } from '@material-ui/core';
import { Avatar, Badge, Dropdown, Menu, Slider, Spin, Tabs, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { checkDeadline, checkFile, nameFile, notificationConfig, URL } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import {
	CaretDownOutlined,
	FileExcelOutlined,
	FileImageOutlined,
	FileWordOutlined,
	UserOutlined
} from '@ant-design/icons';
import { getInformationCompany } from 'app/main/assets/Possesion/_redux/possesionActions';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { updatedTaskStatus, addTaskActivity, getTaskViewDetail, addTaskWatcher } from '../../_redux/_projectActions';
import { badgeText } from '../../ProjectsOverview/ProjectsOverviewComponent/ConfigTableProject';
import { priorityColor } from '../ProjectComponent/TableProject/ConfigTableProject';
import TabOverview from './Component';
import Watchers from './Component/Watchers';

const { TabPane } = Tabs;

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

export default function OverviewPage() {
	const [process, setProcess] = useState(0);
	const { currentState, information } = useSelector(
		state => ({ currentState: state.project, information: state.possesion.entitiesInformation }),
		shallowEqual
	);
	const { actionLoading, entitiesView, isWatcherOverView } = currentState;
	const history = useHistory();
	const dispatch = useDispatch();
	const params = useParams();
	useEffect(() => {
		const paramsMasterData = 'PrjStatus';
		dispatch(getInformationCompany(paramsMasterData));
	}, [dispatch]);
	useEffect(() => {
		dispatch(getTaskViewDetail(params.taskID));
	}, [dispatch, params.taskID]);
	useEffect(() => {
		if (entitiesView) {
			setProcess(entitiesView.detail.percentage);
		}
	}, [entitiesView]);
	const ArrProjectStatus = information?.projectStatus
		? information.projectStatus.reduce(
				(arr, curr) => [...arr, { label: curr.statusName, value: curr.statusID, colorCode: curr.colorCode }],
				[]
		  )
		: [];
	const handleChangeSlider = value => setProcess(value);
	const handleTraffic = () => {
		dispatch(addTaskWatcher(entitiesView.detail.taskID, isWatcherOverView, true, 'watcher'));
	};
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
				}
			});
		}
	};
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
				dispatch(getTaskViewDetail(entitiesView.detail.taskID));
			} else {
				dispatch(getTaskViewDetail(entitiesView.detail.taskID));
			}
		});
	};
	const ExitPage = () => {
		history.goBack();
	};
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
			<div className="projects__content">
				<Spin spinning={actionLoading}>
					<div className="overview--content">
						<Tabs defaultActiveKey="0">
							<TabPane
								tab={
									<Typography variant="subtitle2" color="primary">
										Overview
									</Typography>
								}
								key="0"
							>
								<Grid container item spacing={2} className="content__overview">
									<Grid className="" item md={12} sm={12} lg={12}>
										<Typography variant="subtitle2" className="title__view" color="primary">
											{' '}
											Information{' '}
										</Typography>
										<Divider className="mt-16" />
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography
											style={{ color: entitiesView?.detail.typeColor }}
											variant="subtitle2"
										>
											{entitiesView?.detail.typeName}
										</Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										{' '}
										<Typography variant="subtitle2">{entitiesView?.detail.taskName}</Typography>
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Created by: </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<Typography variant="body2">{entitiesView?.detail.crtdUser}</Typography>
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Last updated on: </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<Typography variant="body2">
											{moment(entitiesView?.detail.lUpdDate).format('DD MMM, YY')}
										</Typography>
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Description: </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<Typography variant="body2">
											{entitiesView?.detail.descr !== '' ? entitiesView?.detail.descr : '-'}
										</Typography>
									</Grid>
									<Grid className="mt-20" item sm={12} md={12} lg={12}>
										<Typography variant="subtitle2" className="title__view" color="primary">
											action
										</Typography>
										<Divider className="mt-16" />
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Status : </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<Dropdown
											// disabled={!entitiesView?.detail.isUpdated}
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
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Progress : </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<Slider
											disabled={entitiesView ? !entitiesView.detail.isUpdated : true}
											onChange={handleChangeSlider}
											onAfterChange={handleChangeSliderAfter}
											value={process}
											tipFormatter={formatter}
										/>
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Follow : </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<Button
											onClick={handleTraffic}
											type="submit"
											style={{ width: '15rem' }}
											className="h-26"
											variant="contained"
											color="primary"
											startIcon={!isWatcherOverView ? <VisibilityIcon /> : <VisibilityOffIcon />}
										>
											{!isWatcherOverView ? 'Follow' : 'Unfollow'}
										</Button>
									</Grid>
									<Grid className="mt-20" item md={12} sm={12} lg={12}>
										<Typography variant="subtitle2" className="title__view" color="primary">
											PEOPLE & TIME
										</Typography>
										<Divider className="mt-16" />
									</Grid>
									<Grid container spacing={2} item md={12} sm={12} lg={12}>
										<Grid item md={6} sm={6} lg={6} className="flex flex-row items-center">
											<Typography variant="subtitle2">Start date:</Typography>
											<Typography variant="body2" className="ml-20">
												{moment(entitiesView?.detail.startDate).format('DD/MM/YYYY')}
											</Typography>
										</Grid>
										<Grid item md={6} sm={6} lg={6} className="flex flex-row items-center">
											<Typography variant="subtitle2">End date: </Typography>
											<Typography variant="body2" className="ml-20">
												{moment(entitiesView?.detail.endDate).format('DD/MM/YYYY')}
											</Typography>
										</Grid>
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Assignee : </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<div className="flex flex-row items-center">
											<Avatar
												size={32}
												style={{ backgroundColor: entitiesView?.detail.colorCode }}
												icon={<UserOutlined />}
											/>
											<Typography className="ml-8" variant="body2">
												{entitiesView?.detail.ownerName}
											</Typography>
										</div>
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Members : </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<Avatar.Group
											maxCount={5}
											maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
										>
											{entitiesView?.detail.lstUserInvited?.map(av => (
												<Tooltip key={av.userID} title={av.fullName} placement="top">
													<Avatar>{av.alphabet}</Avatar>
												</Tooltip>
											))}
										</Avatar.Group>
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Priority : </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<Typography
											variant="body2"
											style={{ color: priorityColor[entitiesView?.detail.priority] }}
										>
											{entitiesView?.detail.priorityName}
										</Typography>
									</Grid>
									{checkDeadline(entitiesView?.detail.endDate) > 0 &&
										entitiesView?.detail.statusID !== 5 &&
										entitiesView?.detail.statusID !== 6 &&
										entitiesView?.detail.statusID !== 7 &&
										entitiesView?.detail.typeName === 'TASK' && (
											<>
												<Grid item md={3} sm={3} lg={3}>
													<Typography variant="subtitle2"> Deadline : </Typography>
												</Grid>
												<Grid item md={9} sm={9} lg={9}>
													<Typography variant="body1" style={{ color: 'red' }}>
														Expired {checkDeadline(entitiesView?.detail.endDate)} days
													</Typography>
												</Grid>
											</>
										)}
									<Grid className="mt-20" item md={12} sm={12} lg={12}>
										<Typography variant="subtitle2" className="title__view" color="primary">
											DETAIL
										</Typography>
										<Divider className="mt-16" />
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Sector : </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<Typography variant="body2">
											{entitiesView?.detail.sectorName !== ''
												? entitiesView?.detail.sectorName
												: '-'}
										</Typography>
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Grade : </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<Typography variant="body2">
											{entitiesView?.detail.gradeName !== ''
												? entitiesView?.detail.gradeName
												: '-'}
										</Typography>
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Component : </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<Typography variant="body2">
											{entitiesView?.detail.componentName !== ''
												? entitiesView?.detail.componentName
												: '-'}
										</Typography>
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Author : </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<Typography variant="body2">
											{entitiesView?.detail.author !== '' ? entitiesView?.detail.author : '-'}
										</Typography>
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Origin Publisher : </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<Typography variant="body2">
											{entitiesView?.detail.originPublisher !== ''
												? entitiesView?.detail.originPublisher
												: '-'}
										</Typography>
									</Grid>
									<Grid item md={3} sm={3} lg={3}>
										<Typography variant="subtitle2"> Ownership DTP : </Typography>
									</Grid>
									<Grid item md={9} sm={9} lg={9}>
										<Typography variant="body2">
											{entitiesView?.detail.ownershipDTP !== ''
												? entitiesView?.detail.ownershipDTP
												: '-'}
										</Typography>
									</Grid>
									{entitiesView?.detail.attachFiles && (
										<Grid item sm={12} md={12} lg={12}>
											<div className="flex flex-col mt-20">
												<Typography variant="subtitle2" className="title__view" color="primary">
													FILES
												</Typography>
												<Divider className="mt-16" />
												<div className="flex flex-row justify-between mt-16">
													<div className="flex flex-row items-center">
														<Avatar
															shape="square"
															size="large"
															style={{ backgroundColor: '#87d068' }}
															icon={
																entitiesView &&
																file[checkFile(entitiesView?.detail.attachFiles)]
															}
														/>
														<Button
															style={{ backgroundColor: 'none', marginLeft: '10px' }}
															href={`${URL}/${entitiesView?.detail.attachFiles}`}
														>
															<Typography variant="button">
																{entitiesView &&
																	nameFile(entitiesView?.detail.attachFiles)}
															</Typography>
														</Button>
													</div>
												</div>
											</div>
										</Grid>
									)}
								</Grid>
							</TabPane>
							<TabPane
								tab={
									<Typography variant="subtitle2" color="primary">
										Activity
									</Typography>
								}
								key="1"
							>
								<TabOverview />
							</TabPane>
							<TabPane
								tab={
									<Typography variant="subtitle2" color="primary">
										Watchers
									</Typography>
								}
								key="2"
							>
								<Watchers />
							</TabPane>
						</Tabs>
					</div>
				</Spin>
			</div>
		</div>
	);
}
