import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useContext } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { FrappeGantt } from 'frappe-gantt-react';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import Panigation from '@fuse/core/FusePanigate';
import { Spin } from 'antd';
import ActionHeaderProject from './ActionProjectComponent/ActionHeaderProject';
import DrawerComponent from './DrawerComponent';
import FormProjectDrawer from './FormProject';
import TableProject from './TableProject';
import { ProjectContext } from '../ProjectContext';

import { fetchProjectDetailFilter } from '../../_redux/_projectActions';

export default function ProjectComponent({
	owner,
	gradeGolbal,
	ArrProjectStatus,
	ArrTaskPri,
	ArrTaskComponent,
	taskSub,
	params,
	sectorArr
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
	if (listLoading) {
		return <FuseLoading />;
	}
	return (
		<div className="w-full flex flex-col ">
			<DrawerComponent />
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
							<TableProject actionLoading={actionLoading} entitiesDetail={entitiesDetail} />
							{entitiesDetail && entitiesDetail.listTask && entitiesDetail.listTask.length !== 0 && (
								<div className="flex flex-row items-center justify-end">
									{actionLoading && <Spin />}
									<Panigation
										page={page}
										handleChangePage={handleChangePage}
										rowPage={rowPage}
										handleChangeRowsPerPage={handleRowPage}
										count={total_count}
									/>
								</div>
							)}
						</div>
					) : (
						<div className={classes.containerGrantt}>
							{gantt && entitiesGantt.length > 0 && (
								<IconButton
									onClick={handleCloseGantt}
									edge="start"
									color="inherit"
									className="float-right"
									aria-label="close"
								>
									<CloseIcon />
								</IconButton>
							)}
							<div style={{ display: !gantt || entitiesGantt.length === 0 ? 'none' : 'block' }}>
								{entitiesGantt.length > 0 && (
									<FrappeGantt
										tasks={entitiesGantt}
										onDateChange={(task, start, end) => console.log(task, start, end)}
										onProgressChange={(task, progress) => console.log(task, progress)}
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
