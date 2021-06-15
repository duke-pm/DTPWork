import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { FrappeGantt } from 'frappe-gantt-react';
import ActionHeaderProject from './ActionProjectComponent/ActionHeaderProject';
import DrawerComponent from './DrawerComponent';
import FormProjectDrawer from './FormProject';
import TableProject from './TableProject';

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
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesDetail, listLoading, actionLoading, entitiesGantt } = currentState;
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
				<div className={`grid ${entitiesGantt.length > 0 ? 'grid-cols-2' : 'grid-cols-1'}  gap-8`}>
					<div className="flex flex-col gap-8 mt-16 shadow-md  sm:border-1 sm:rounded-4 ">
						<TableProject actionLoading={actionLoading} entitiesDetail={entitiesDetail} />
					</div>
					<div className={classes.containerGrantt}>
						<div style={{ display: entitiesGantt.length === 0 && 'none' }}>
							{entitiesGantt.length > 0 && (
								<FrappeGantt
									tasks={entitiesGantt}
									onProgressChange={(task, progress) => console.log(task, progress)}
								/>
							)}
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}
