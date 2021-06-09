import FuseAnimate from '@fuse/core/FuseAnimate';
import { Drawer } from 'antd';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useStyles } from '../../Projects/styleProject';
import ActionHeaderProject from './ActionProjectComponent/ActionHeaderProject';
import DrawerComponent from './DrawerComponent';
import TableProject from './TableProject';

export default function ProjectComponent() {
	const classes = useStyles();
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesDetail, listLoading } = currentState;
	return (
		<div className="w-full flex flex-col ">
			<DrawerComponent />
			<ActionHeaderProject classes={classes} />
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
					<TableProject entitiesDetail={entitiesDetail} />
				</div>
			</FuseAnimate>
		</div>
	);
}
