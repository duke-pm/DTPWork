import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, TableContainer } from '@material-ui/core';
import React, { useContext } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import Panigation from '@fuse/core/FusePanigate';
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
	const { currentState } = useSelector(state => ({ currentState: state.govern.listUser }), shallowEqual);
	const { entities, actionLoading, total_count } = currentState;
	const handleDeleteListUser = item => {
		dispatch(actions.deletedListUser(item));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchsListFilter(newPage + 1, rowPage, sort.id, sort.direction));
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(actions.fetchsListFilter(page, rowPageParse, sort.id, sort.direction));
	};
	const createSortHandler = property => event => {
		const id = property;
		let direction = 'desc';

		if (sort.id === property && sort.direction === 'desc') {
			direction = 'asc';
		}
		dispatch(actions.fetchsListFilter(page, rowPage, id, direction));
		setSort({
			direction,
			id
		});
	};
	return (
		<div className="w-full flex flex-col">
			<ActionListRoleSetting />
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
					<TableContainer className={`${classes.TableContainer} flex flex-1`}>
						<Paper className={classes.rootPaper}>
							<ListRoleSettingBody classes={classes} entities={entities} />
						</Paper>
					</TableContainer>
					{entities && entities.length !== 0 && (
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
			</FuseAnimate>
		</div>
	);
}
