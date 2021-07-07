/* eslint-disable no-shadow */
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useContext } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { FrappeGantt } from 'frappe-gantt-react';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import Panigation from '@fuse/core/FusePanigate';
import { Spin, Tag } from 'antd';
import * as moment from 'moment';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import ActionHeaderProject from './ActionProjectComponent/ActionHeaderProject';
import DrawerComponent from './DrawerComponent';
import FormProjectDrawer from './FormProject';
import TableProject from './TableProject';
import { ProjectContext } from '../ProjectContext';
import {
	fetchProjectDetailFilter,
	updatedGantt,
	getTaskDetailAll,
	addTaskActivity
} from '../../_redux/_projectActions';

export default function ProjectComponent({
	owner,
	gradeGolbal,
	ArrProjectStatus,
	ArrTaskPri,
	ArrTaskComponent,
	taskSub,
	params,
	sectorArr,
	project
}) {
	const classes = DtpCustomStyles();
	const dispatch = useDispatch();
	const projectContext = useContext(ProjectContext);
	const { gantt, setGantt, sector, setPage, setRowPage, rowPage, page, status, ownerFilter, dateStart, search } =
		projectContext;
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesDetail, listLoading, actionLoading, entitiesGantt, total_count } = currentState;
	const handleCloseGantt = () => setGantt(false);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(
			fetchProjectDetailFilter(
				params.detail,
				rowPage,
				newPage + 1,
				ownerFilter,
				status,
				dateStart,
				sector,
				search
			)
		);
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(
			fetchProjectDetailFilter(params.detail, rowPageParse, page, ownerFilter, status, dateStart, sector, search)
		);
	};
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
					dispatch(getTaskDetailAll(params.detail, ownerFilter, status, sector, search));
				}
			});
		} else {
			notificationConfig(
				'warning',
				notificationContent.content.en.faild,
				notificationContent.description.project.task.updateFailDate
			);
			dispatch(getTaskDetailAll(params.detail, ownerFilter, status, sector, search));
		}
	};
	if (listLoading) {
		return <FuseLoading />;
	}
	return (
		<div className="w-full flex flex-col ">
			<DrawerComponent params={params} />
			<FormProjectDrawer
				owner={owner}
				sectorArr={sectorArr}
				gradeGolbal={gradeGolbal}
				taskSub={taskSub}
				ArrTaskComponent={ArrTaskComponent}
				ArrProjectStatus={ArrProjectStatus}
				ArrTaskPri={ArrTaskPri}
				params={params}
				classes={classes}
			/>
			<ActionHeaderProject
				project={project}
				params={params}
				sectorArr={sectorArr}
				ArrProjectStatus={ArrProjectStatus}
				owner={owner}
				entitiesDetail={entitiesDetail}
				classes={classes}
			/>
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className={`'grid-cols-1'}  gap-8`}>
					{!gantt ? (
						<div className="flex flex-col gap-8 mt-16 shadow-md  sm:border-1 sm:rounded-4 ">
							<TableProject
								params={params}
								actionLoading={actionLoading}
								entitiesDetail={entitiesDetail}
							/>
							{entitiesDetail?.listTask?.length !== 0 && (
								<div className="flex flex-row items-center justify-between">
									<div className="flex flex-row">
										<Tag
											className="shadow-md"
											style={{ width: '25px', height: '25px', marginLeft: '8px' }}
											color="#fff7e6"
										/>
										<p style={{ fontWeight: '400', color: '#006565' }}>Late deadline</p>
									</div>

									<div>
										{actionLoading && <Spin />}
										<Panigation
											page={page}
											handleChangePage={handleChangePage}
											rowPage={rowPage}
											handleChangeRowsPerPage={handleRowPage}
											count={total_count}
										/>
									</div>
								</div>
							)}
						</div>
					) : (
						<div className={classes.containerGrantt}>
							{gantt && entitiesGantt.length > 0 && (
								<IconButton
									onClick={handleCloseGantt}
									className={classes.customHoverFocus}
									aria-label="close"
								>
									<CloseIcon />
								</IconButton>
							)}
							<div style={{ display: !gantt || entitiesGantt.length === 0 ? 'none' : 'block' }}>
								{entitiesGantt.length > 0 && (
									<FrappeGantt
										tasks={entitiesGantt}
										onDateChange={(task, start, end) => onHandleChangeDate(task, start, end)}
										// onProgressChange={(task, progress) => onHandleChangeProcess(task, progress)}
									/>
								)}
							</div>
						</div>
					)}
				</div>
			</FuseAnimate>
		</div>
	);
}
