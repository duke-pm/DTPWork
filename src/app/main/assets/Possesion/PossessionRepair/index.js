/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { PossessionContext } from '../PossessionContext';
import * as actions from '../_redux/possesionActions';
import TableAssetRepair from './Component/TableAssetRepair';

// import FormCustomUsed from './FormCustomUsed';

export default function PossessionRepair(props) {
	const dispatch = useDispatch();
	const possessionContext = useContext(PossessionContext);
	const { rowPage, setRowPage, page, setPage, search, sort, setSort } = possessionContext;
	const history = useHistory();
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, total_count } = currentState;
	const handleOpenFormLiquiAsset = items => {
		history.push('/tai-san/quan-ly-tai-san/thanh-ly?type=repair');
		dispatch(actions.setTaskEditPossesionAll(items));
	};
	const handleOpenFormCycleView = type => {
		history.push('/tai-san/quan-ly-tai-san/dua-vao-su-dung-lai');
		dispatch(actions.setTaskEditPossesionAll(type));
	};
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPageParse = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAllPanigate(3, rowPageParse, 1, search, sort.id, sort.direction));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAllPanigate(3, rowPage, newPage + 1, search, sort.id, sort.direction));
	};
	const createSortHandler = (direction, id) => {
		dispatch(actions.fetchPossesionAllPanigate(3, rowPage, 1, search, id, direction));
		setSort({
			direction,
			id
		});
	};
	useEffect(() => {
		dispatch(actions.fetchPossesionAll(3));
	}, [dispatch]);
	return (
		<>
			<div className="flex flex-col table--tab">
				<div className="flex flex-col">
					<TableAssetRepair
						handleOpenFormCycleView={handleOpenFormCycleView}
						handleOpenFormLiquiAsset={handleOpenFormLiquiAsset}
						createSortHandler={createSortHandler}
						entities={entities}
						listLoading={listloading}
					/>
					{entities?.length !== 0 && (
						<Panigation
							page={page}
							handleChangePage={handleChangePage}
							rowPage={rowPage}
							handleChangeRowsPerPage={handleRowChange}
							count={total_count}
						/>
					)}
				</div>
			</div>
		</>
	);
}
