import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useContext } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { FrappeGantt } from 'frappe-gantt-react';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import ActionHeaderProject from './ActionProjectComponent/ActionHeaderProject';
import DrawerComponent from './DrawerComponent';
import FormProjectDrawer from './FormProject';
import TableProject from './TableProject';
import { ProjectContext } from '../ProjectContext';

export default function ProjectComponent({
	owner,
	gradeGolbal,
	ArrProjectStatus,
	ArrTaskPri,
	ArrTaskComponent,
	taskSub,
	params
}) {
	const classes = DtpCustomStyles();
	const projectContext = useContext(ProjectContext);
	const { gantt, setGantt } = projectContext;
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesDetail, listLoading, actionLoading, entitiesGantt } = currentState;
	const handleCustomPopUp = task => {
		console.log(task);
	};
	const handleCloseGantt = () => setGantt(false);
	if (listLoading) {
		return <FuseLoading />;
	}
	return (
		<div className="w-full flex flex-col ">
			<DrawerComponent />
			<FormProjectDrawer
				owner={owner}
				gradeGolbal={gradeGolbal}
				taskSub={taskSub}
				ArrTaskComponent={ArrTaskComponent}
				ArrProjectStatus={ArrProjectStatus}
				ArrTaskPri={ArrTaskPri}
				params={params}
				classes={classes}
			/>
			<ActionHeaderProject entitiesDetail={entitiesDetail} classes={classes} />
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className={`'grid-cols-1'}  gap-8`}>
					{!gantt ? (
						<div className="flex flex-col gap-8 mt-16 shadow-md  sm:border-1 sm:rounded-4 ">
							<TableProject actionLoading={actionLoading} entitiesDetail={entitiesDetail} />
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
