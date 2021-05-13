import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Table } from '@material-ui/core';
import React, { useEffect, useContext } from 'react';
import image from '@fuse/assets/group.png';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseLoading from '@fuse/core/FuseLoading';
import Panigation from '@fuse/core/FusePanigate';
import { Spin } from 'antd';
import SettingMenuContentHeader from './SettingMenuContentHeader';
import * as actions from '../../_redux/menuActions';
import SettingMenuContentBody from './SettingMenuContentBody';
import { useStyles } from '../../StyleCustomAll';
import { SettingmenuContext } from '../../SettingMenuContext';

export default function SettingMenuContent() {
	const dispatch = useDispatch();
	const settingContext = useContext(SettingmenuContext);
	const { page, rowPage } = settingContext;
	const { currentState } = useSelector(state => ({ currentState: state.govern.menu }), shallowEqual);
	const { entities, lastErrors, listloading, actionLoading, total_count } = currentState;
	useEffect(() => {
		dispatch(actions.fetchsListMenuSettings());
	}, [dispatch]);
	const classes = useStyles();
	if (listloading) {
		return <FuseLoading />;
	}
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
							<SettingMenuContentBody classes={classes} entities={entities} lastErrors={lastErrors} />
						</Table>
						{entities === null || lastErrors ? (
							<div className="flex items-center justify-center h-auto">
								<img className="rounded-full mx-auto" src={image} alt="" width="484" height="512" />
							</div>
						) : null}
					</FuseAnimateGroup>
				</FuseScrollbars>
				{entities && entities.length !== 0 && (
					<div className="flex flex-row items-center justify-end">
						{actionLoading && <Spin />}
						<Panigation
							page={page}
							// handleChangePage={handleChangePage}
							rowPage={rowPage}
							// handleChangeRowsPerPage={handleRowChange}
							count={total_count}
						/>
					</div>
				)}
			</div>
		</>
	);
}
