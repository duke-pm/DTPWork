/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import { Paper, Table, TableContainer } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import { Empty } from 'antd';
import { PossessionContext } from '../PossessionContext';
import ActionComponent from './Component/ActionComponent';
import * as actions from '../_redux/possesionActions';
import TableBodyRepair from './Component/TableBodyRepair';
import TableHeaderRepair from './Component/TableHeaderRepair';
import TableAssetRepair from './Component/TableAssetRepair';

// import FormCustomUsed from './FormCustomUsed';

export default function PossessionRepair(props) {
	const dispatch = useDispatch();
	const possessionContext = useContext(PossessionContext);
	const {
		handleOpenFormCycle,
		rowPage,
		setRowPage,
		page,
		setPage,
		search,
		setLiquiAsset,
		setTypeLiquiAsset,
		sort,
		setSort
	} = possessionContext;
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count } = currentState;
	const handleOpenFormLiquiAsset = items => {
		setLiquiAsset(true);
		setTypeLiquiAsset('repair');
		dispatch(actions.setTaskEditPossesionAll(items));
	};
	const handleOpenFormCycleView = type => {
		handleOpenFormCycle(type);
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
