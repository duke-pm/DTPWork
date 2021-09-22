/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import React, { useContext, useEffect } from 'react';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { useHistory } from 'react-router';
import * as actions from '../_redux/possesionActions';
import { PossessionContext } from '../PossessionContext';
import TableAssetUsed from './Component/TableAssetUsed';

export default function PossessionUsed(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const possessionContext = useContext(PossessionContext);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, total_count, actionLoading } = currentState;
	const { rowPage, setRowPage, page, setPage, search, sort, setSort, setFormService, typeSetFormService } =
		possessionContext;
	useEffect(() => {
		dispatch(actions.fetchPossesionAll(2));
	}, [dispatch]);
	const handleOpenForm = items => {
		dispatch(actions.setTaskEditPossesionAll(items));
		history.push('/tai-san/quan-ly-tai-san/thu-hoi');
	};
	const handleOpenFromService = items => {
		history.push('/tai-san/quan-ly-tai-san/sua-chua-bao-hanh?type=use');
		typeSetFormService('use');
		dispatch(actions.setTaskEditPossesionAll(items));
		setFormService(true);
	};
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPage = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAllPanigate(2, rowPage, page + 1, search, sort.id, sort.direction));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAllPanigate(2, rowPage, newPage + 1, search, sort.id, sort.direction));
	};
	const createSortHandler = (direction, id) => {
		dispatch(actions.fetchPossesionAllPanigate(2, rowPage, 1, search, id, direction));
		setSort({
			direction,
			id
		});
	};
	return (
		<>
			<div className="flex flex-col table--tab">
				<div className="flex flex-col">
					<TableAssetUsed
						handleOpenFromService={handleOpenFromService}
						handleOpenForm={handleOpenForm}
						createSortHandler={createSortHandler}
						entities={entities}
						listLoading={listloading}
					/>
					{entities?.length !== 0 && (
						<div className="flex flex-row items-center justify-end">
							{actionLoading && <Spin />}
							<Panigation
								page={page}
								handleChangePage={handleChangePage}
								rowPage={rowPage}
								handleChangeRowsPerPage={handleRowChange}
								count={total_count}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
