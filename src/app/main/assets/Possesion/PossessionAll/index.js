/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { Spin } from 'antd';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import { useHistory } from 'react-router';
import PossessionAll from './FormCustomAll';
import * as actions from '../_redux/possesionActions';
import { PossessionContext } from '../PossessionContext';
import TableAssetAll from './Component/TableAssetAll';
import ProcessingUseAsset from './Component/ProcessingUseAsset';

function PossessionAllPage(props) {
	const history = useHistory();
	const dispatch = useDispatch();
	const possesionContext = useContext(PossessionContext);
	const { rowPage, setRowPage, page, setPage, search, sort, setSort } = possesionContext;
	const [openHistory, setOpenHistory] = useState(false);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count, actionLoading } = currentState;
	useEffect(() => {
		dispatch(actions.fetchPossesionAll(0));
	}, [dispatch]);
	const HandleOpenHistory = items => {
		history.push('/tai-san/quan-ly-tai-san/qua-trinh-su-dung');
		dispatch(actions.setTaskEditPossesionAll(items));
	};
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPageParse = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAllPanigate(0, rowPageParse, 1, search, sort.id, sort.direction));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAllPanigate(0, rowPage, newPage + 1, search, sort.id, sort.direction));
	};
	const createSortHandler = (direction, id) => {
		dispatch(actions.fetchPossesionAllPanigate(0, rowPage, 1, search, id, direction));
		setSort({
			direction,
			id
		});
	};
	return (
		<>
			{/* <ProcessingUseAsset setOpenHistory={setOpenHistory} openHistory={openHistory} /> */}
			{/* <PossessionAll rowPage={rowPage} open={props.open} /> */}
			<div className="flex flex-col table--tab">
				<div className="flex flex-col">
					<TableAssetAll
						HandleOpenHistory={HandleOpenHistory}
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
export default React.memo(PossessionAllPage);
