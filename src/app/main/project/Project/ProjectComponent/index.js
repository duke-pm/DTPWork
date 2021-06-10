import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useStyles } from '../../Projects/styleProject';
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
	const classes = useStyles();
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesDetail, listLoading } = currentState;
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
			/>
			<ActionHeaderProject entitiesDetail={entitiesDetail} classes={classes} />
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
					<TableProject entitiesDetail={entitiesDetail} />
				</div>
			</FuseAnimate>
		</div>
	);
}
