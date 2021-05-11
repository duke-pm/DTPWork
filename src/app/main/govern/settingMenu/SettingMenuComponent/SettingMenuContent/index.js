import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Table } from '@material-ui/core';
import React from 'react';
import image from '@fuse/assets/group.png';
import { useSelector, shallowEqual } from 'react-redux';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import SettingMenuContentHeader from './SettingMenuContentHeader';

export default function SettingMenuContent() {
	const { currentState } = useSelector(state => ({ currentState: state.govern.menu }), shallowEqual);
	const { entities, lastErrors } = currentState;
	return (
		<>
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<FuseAnimateGroup
						enter={{
							animation: 'transition.expandIn'
						}}
					>
						<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
							<SettingMenuContentHeader />
						</Table>
						{entities === null || lastErrors ? (
							<div className="flex items-center justify-center h-auto">
								<img className="rounded-full mx-auto" src={image} alt="" width="484" height="512" />
							</div>
						) : null}
					</FuseAnimateGroup>
				</FuseScrollbars>
			</div>
		</>
	);
}
