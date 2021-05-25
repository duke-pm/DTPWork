import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, TableContainer } from '@material-ui/core';
import React, { useContext } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useStyles } from '../StyleGroupUser';
import ListRoleSettingBody from './ListRoleSettingBody';
import ActionListRoleSetting from './ActionListRoleSetting';
import { ListRoleMenuSettingContext } from '../ListRoleMenuSettingContext';
import * as actions from '../_reduxListRoleMenu/listRoleMenuSettingActions';

export default function ListRoleSettingContent() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const useListRoleSettingContext = useContext(ListRoleMenuSettingContext);
	const { page, rowPage, setPage, sort, setRowPage, setSort } = useListRoleSettingContext;
	const { currentState, currentInfo } = useSelector(
		state => ({
			currentState: state.govern.listRole,
			currentInfo: state.possesion.entitiesInformation
		}),
		shallowEqual
	);
	const { entities, actionLoading, total_count } = currentState;
	return (
		<div className="w-full flex flex-col">
			<ActionListRoleSetting actionLoading={actionLoading} currentInfo={currentInfo} />
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
					<TableContainer className={`${classes.TableContainer} flex flex-1`}>
						<Paper className={classes.rootPaper}>
							<ListRoleSettingBody classes={classes} entities={entities} />
						</Paper>
					</TableContainer>
				</div>
			</FuseAnimate>
		</div>
	);
}
