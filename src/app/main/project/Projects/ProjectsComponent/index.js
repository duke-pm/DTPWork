import FuseAnimate from '@fuse/core/FuseAnimate';
import React from 'react';
import ActionHeaderProject from './ActionProjectComponent/ActionHeaderProject';
import TableProject from './TableProject';

export default function ProjectComponent() {
	return (
		<div className="w-full flex flex-col">
			<ActionHeaderProject />
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
					<TableProject />
				</div>
			</FuseAnimate>
		</div>
	);
}
