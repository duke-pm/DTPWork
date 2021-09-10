import FuseAnimate from '@fuse/core/FuseAnimate';
import React, { useState, useContext } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import Panigation from '@fuse/core/FusePanigate';
import { useHistory } from 'react-router';
import { ListUserContext } from '../ListUserContext';
import * as actions from '../_reduxListUser/listUserActions';
import TableListUser from './Component';

export default function ListUserContent() {
	const dispatch = useDispatch();
	const history = useHistory();
	const useListUserContext = useContext(ListUserContext);
	const { page, rowPage, setPage, sort, setRowPage, setSort } = useListUserContext;
	const { currentState } = useSelector(state => ({ currentState: state.govern.listUser }), shallowEqual);
	const { entities, actionLoading, total_count, listLoading } = currentState;
	const handleEditListUser = item => {
		history.push(`/quan-tri/danh-sach-nguoi-dung/cap-nhat/${item.userID}`);
		dispatch(actions.setTaskEditListUser(item));
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
	const createSortHandler = (direction, id) => {
		dispatch(actions.fetchsListFilter(page, rowPage, id, direction));
		setSort({
			direction,
			id
		});
	};
	return (
		<div className="w-full flex flex-col">
			<div className="flex flex-col ">
				<TableListUser
					listLoading={listLoading}
					actionLoading={actionLoading}
					entities={entities}
					createSortHandler={createSortHandler}
					handleEditListUser={handleEditListUser}
				/>
				{entities?.length !== 0 && (
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
		</div>
	);
}
