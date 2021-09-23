/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Grid, Icon } from '@material-ui/core';
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
import Text from 'app/components/Text';
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
	const ExitPage = () => history.goBack();
	return (
		<div className="container projects">
			<div className="projects__header px-16">
				<Text color="primary" type="title">
					Detail
				</Text>
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
					<Grid container className="w-full p-16">
						<Grid item lg={3} md={3} sm={false} xs={false} />
						<Grid item lg={6} md={6} sm={12} xs={12}>
							{/* <div className="overview--content"> */}
							<Tabs defaultActiveKey="0">
								<TabPane tab={<Text type="subTitle">Overview</Text>} key="0">
									<Text type="subTitle" color="primary" borderBottom>
										BASIC INFORMATIONS
									</Text>
									<Grid container spacing={4}>
										<Grid item xs={3} md={3} sm={3} lg={3}>
											<Text style={{ color: entitiesView?.detail.typeColor }} type="subTitle">
												{entitiesView?.detail.typeName}
											</Text>
										</Grid>
										<Grid item xs={9} md={9} sm={9} lg={9}>
											<Text type="subTitle">{entitiesView?.detail.taskName}</Text>
										</Grid>
									</Grid>

									<Grid container spacing={4}>
										<Grid item xs={3} md={3} sm={3} lg={3}>
											<Text type="body">Created by:</Text>
										</Grid>
										<Grid item xs={9} md={9} sm={9} lg={9}>
											<Text type="body">{entitiesView?.detail.crtdUser}</Text>
										</Grid>
									</Grid>

									<Grid container spacing={4}>
										<Grid item xs={3} md={3} sm={3} lg={3}>
											<Text type="body">Last updated:</Text>
										</Grid>
										<Grid item xs={9} md={9} sm={9} lg={9}>
											<Text type="body">
												{moment(entitiesView?.detail.lUpdDate).format('DD MMM, YY')}
											</Text>
										</Grid>
									</Grid>

									<Grid container spacing={4}>
										<Grid item xs={12} md={3} sm={3} lg={3}>
											<Text type="body">Description:</Text>
										</Grid>
										<Grid item xs={12} md={9} sm={9} lg={9}>
											<Text type="body">
												{entitiesView?.detail.descr !== '' ? entitiesView?.detail.descr : '-'}
											</Text>
										</Grid>
									</Grid>

									<Text className="mt-20" type="subTitle" color="primary" borderBottom>
										ACTION
									</Text>

									<Grid container spacing={4} className="flex flex-row items-center justify-between">
										<Grid item xs={3} md={3} sm={3} lg={3}>
											<Text type="body">Status:</Text>
										</Grid>
										<Grid
											item
											xs={9}
											md={9}
											sm={9}
											lg={9}
											className="flex flex-row items-center justify-between"
										>
											<Dropdown
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
													<CaretDownOutlined
														style={{ cursor: 'pointer', marginLeft: '10px' }}
													/>
												</div>
											</Dropdown>

											<Button
												onClick={handleTraffic}
												type="submit"
												style={{ width: '15rem' }}
												className="h-26"
												variant="contained"
												color="primary"
												startIcon={
													!isWatcherOverView ? <VisibilityIcon /> : <VisibilityOffIcon />
												}
											>
												<Text type="button" color="white">
													{!isWatcherOverView ? 'Follow' : 'Unfollow'}
												</Text>
											</Button>
										</Grid>
									</Grid>

									<Grid container spacing={4}>
										<Grid item xs={3} md={3} sm={3} lg={3}>
											<Text type="body">Progress:</Text>
										</Grid>
										<Grid item xs={9} md={9} sm={9} lg={9}>
											<Slider
												disabled={entitiesView ? !entitiesView.detail.isUpdated : true}
												onChange={handleChangeSlider}
												onAfterChange={handleChangeSliderAfter}
												value={process}
												tipFormatter={formatter}
											/>
										</Grid>
									</Grid>

									<Text className="mt-20" type="subTitle" color="primary" borderBottom>
										PEOPLE & TIME
									</Text>

									<Grid container spacing={4}>
										<Grid item xs={12} md={6} sm={6} lg={6} className="flex flex-row items-center">
											<Text type="body">Start date:</Text>
											<Text type="body" className="ml-20">
												{moment(entitiesView?.detail.startDate).format('DD/MM/YYYY')}
											</Text>
										</Grid>
										<Grid item xs={12} md={6} sm={6} lg={6} className="flex flex-row items-center">
											<Text type="body">End date: </Text>
											<Text type="body" className="ml-20">
												{moment(entitiesView?.detail.endDate).format('DD/MM/YYYY')}
											</Text>
										</Grid>
									</Grid>

									<Grid container spacing={4}>
										<Grid item xs={12} md={6} sm={6} lg={6} className="flex flex-row items-center">
											<Text type="body">Assignee:</Text>
											<div className="flex flex-row items-center ml-20">
												<Avatar
													size={32}
													style={{ backgroundColor: entitiesView?.detail.colorCode }}
													icon={<UserOutlined />}
												/>
												<Text className="ml-8" type="body">
													{entitiesView?.detail.ownerName}
												</Text>
											</div>
										</Grid>
										<Grid item xs={12} md={6} sm={6} lg={6} className="flex flex-row items-center">
											<Text type="body">Members:</Text>
											<Avatar.Group
												className="ml-20"
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
									</Grid>

									{checkDeadline(entitiesView?.detail.endDate) > 0 &&
										entitiesView?.detail.statusID !== 5 &&
										entitiesView?.detail.statusID !== 6 &&
										entitiesView?.detail.statusID !== 7 &&
										entitiesView?.detail.typeName === 'TASK' && (
											<Grid container spacing={2}>
												<Grid item xs={3} md={3} sm={3} lg={3}>
													<Text type="body"> Deadline : </Text>
												</Grid>
												<Grid item xs={9} md={9} sm={9} lg={9}>
													<Text type="body" color="error">
														Expired {checkDeadline(entitiesView?.detail.endDate)} days
													</Text>
												</Grid>
											</Grid>
										)}

									<Text className="mt-20" type="subTitle" color="primary" borderBottom>
										DETAIL
									</Text>

									<Grid container spacing={4}>
										<Grid item xs={3} md={3} sm={3} lg={3}>
											<Text type="body">Priority:</Text>
										</Grid>
										<Grid item xs={9} md={9} sm={9} lg={9}>
											<Text
												type="body"
												style={{ color: priorityColor[entitiesView?.detail.priority] }}
											>
												{entitiesView?.detail.priorityName}
											</Text>
										</Grid>
									</Grid>

									<Grid container spacing={4}>
										<Grid item xs={3} md={3} sm={3} lg={3}>
											<Text type="body">Sector:</Text>
										</Grid>
										<Grid item xs={9} md={9} sm={9} lg={9}>
											<Text type="body">
												{entitiesView?.detail.sectorName !== ''
													? entitiesView?.detail.sectorName
													: '-'}
											</Text>
										</Grid>
									</Grid>

									<Grid container spacing={4}>
										<Grid item xs={3} md={3} sm={3} lg={3}>
											<Text type="body">Grade:</Text>
										</Grid>
										<Grid item xs={9} md={9} sm={9} lg={9}>
											<Text type="body">
												{entitiesView?.detail.gradeName !== ''
													? entitiesView?.detail.gradeName
													: '-'}
											</Text>
										</Grid>
									</Grid>

									<Grid container spacing={4}>
										<Grid item xs={3} md={3} sm={3} lg={3}>
											<Text type="body">Component:</Text>
										</Grid>
										<Grid item xs={9} md={9} sm={9} lg={9}>
											<Text type="body">
												{entitiesView?.detail.componentName !== ''
													? entitiesView?.detail.componentName
													: '-'}
											</Text>
										</Grid>
									</Grid>

									<Grid container spacing={4}>
										<Grid item xs={3} md={3} sm={3} lg={3}>
											<Text type="body">Author:</Text>
										</Grid>
										<Grid item xs={9} md={9} sm={9} lg={9}>
											<Text type="body">
												{entitiesView?.detail.author !== '' ? entitiesView?.detail.author : '-'}
											</Text>
										</Grid>
									</Grid>

									<Grid container spacing={4}>
										<Grid item xs={3} md={3} sm={3} lg={3}>
											<Text type="body">Origin Publisher:</Text>
										</Grid>
										<Grid item xs={9} md={9} sm={9} lg={9}>
											<Text type="body">
												{entitiesView?.detail.originPublisher !== ''
													? entitiesView?.detail.originPublisher
													: '-'}
											</Text>
										</Grid>
									</Grid>

									<Grid container spacing={4}>
										<Grid item xs={3} md={3} sm={3} lg={3}>
											<Text type="body">Ownership DTP:</Text>
										</Grid>
										<Grid item xs={9} md={9} sm={9} lg={9}>
											<Text type="body">
												{entitiesView?.detail.ownershipDTP !== ''
													? entitiesView?.detail.ownershipDTP
													: '-'}
											</Text>
										</Grid>
									</Grid>

									{entitiesView?.detail.attachFiles && (
										<>
											<Text className="mt-20" type="subTitle" color="primary" borderBottom>
												FILES
											</Text>
											<Grid container spacing={2}>
												<Grid item sm={12} md={12} lg={12}>
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
																style={{
																	backgroundColor: 'none',
																	marginLeft: '10px'
																}}
																href={`${URL}/${entitiesView?.detail.attachFiles}`}
															>
																<Text type="button">
																	{entitiesView &&
																		nameFile(entitiesView?.detail.attachFiles)}
																</Text>
															</Button>
														</div>
													</div>
												</Grid>
											</Grid>
										</>
									)}
								</TabPane>
								<TabPane tab={<Text type="subTitle">Activity</Text>} key="1">
									<TabOverview />
								</TabPane>
								<TabPane tab={<Text type="subTitle">Watchers</Text>} key="2">
									<Watchers />
								</TabPane>
							</Tabs>
							{/* </div> */}
						</Grid>
						<Grid item lg={3} md={3} sm={false} xs={false} />
					</Grid>
				</Spin>
			</div>
		</div>
	);
}
