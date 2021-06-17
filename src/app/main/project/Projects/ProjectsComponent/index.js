import FuseAnimate from '@fuse/core/FuseAnimate';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import ActionHeaderProject from './ActionProjectComponent/ActionHeaderProject';
import TableProject from './TableProject';

export default function ProjectComponent({ sectorArr, ArrProjectStatus, owner }) {
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entities, listLoading, actionLoading } = currentState;
	const classes = DtpCustomStyles();
	if (listLoading) {
		return <FuseLoading />;
	}
	return (
		<div className="w-full flex flex-col">
			<ActionHeaderProject
				sectorArr={sectorArr}
				ArrProjectStatus={ArrProjectStatus}
				owner={owner}
				classes={classes}
			/>
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
					<TableProject actionLoading={actionLoading} classes={classes} entities={entities} />
				</div>
			</FuseAnimate>
		</div>
	);
}
