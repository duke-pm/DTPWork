import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Spin } from 'antd';
import Panigation from '@fuse/core/FusePanigate';
import { useHistory } from 'react-router';
import * as actions from '../_reduxGroupUser/groupUserActions';
import { GroupUserContext } from '../GroupUserContext';
import TableGroupUser from './Component';

export default function GroupUserContent() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.fetchsGroupUser());
	}, [dispatch]);
	const history = useHistory();
	const groupUserContext = useContext(GroupUserContext);
	const { page, rowPage, setPage, setRowPage, sort, setSort } = groupUserContext;
	const { currentState } = useSelector(state => ({ currentState: state.govern.groupUser }), shallowEqual);
	const { entities, listLoading, actionLoading, total_count } = currentState;
	const handleEditGroupUser = item => {
		history.push(`/quan-tri/nhom-nguoi-dung/cap-nhat`);
		dispatch(actions.setTaskEditGroupUser(item));
	};
	const handleEditGroupUserDelete = item => {
		dispatch(actions.deletedGroupUser(item));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.filterGroupUser(rowPage, newPage + 1, sort.id, sort.direction));
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(actions.filterGroupUser(rowPageParse, page, sort.id, sort.direction));
	};
	const createSortHandler = (direction, id) => {
		dispatch(actions.filterGroupUser(rowPage, page, id, direction));
		setSort({
			direction,
			id
		});
	};
	return (
		<div className="w-full flex flex-col">
			<div className="flex flex-col ">
				<TableGroupUser
					listLoading={listLoading}
					actionLoading={actionLoading}
					entities={entities}
					createSortHandler={createSortHandler}
					handleEditGroupUser={handleEditGroupUser}
					handleEditGroupUserDelete={handleEditGroupUserDelete}
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
