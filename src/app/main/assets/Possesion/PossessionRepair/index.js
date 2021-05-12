/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import { Paper, Table, TableContainer } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import image from '@fuse/assets/group.png';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { PossessionContext } from '../PossessionContext';
import ActionComponent from './Component/ActionComponent';
import * as actions from '../_redux/possesionActions';
import { useStyles } from './StyleCustomAll';
import TableBodyRepair from './Component/TableBodyRepair';
import TableHeaderRepair from './Component/TableHeaderRepair';

// import FormCustomUsed from './FormCustomUsed';

export default function PossessionRepair(props) {
	const { value } = props;
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
		dispatch(actions.fetchPossesionAllPanigate(value, rowPageParse, 1, search, sort.id, sort.direction));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAllPanigate(value, rowPage, newPage + 1, search, sort.id, sort.direction));
	};
	const createSortHandler = property => event => {
		const id = property;
		let direction = 'desc';

		if (sort.id === property && sort.direction === 'desc') {
			direction = 'asc';
		}
		dispatch(actions.fetchPossesionAllPanigate(value, rowPage, 1, search, id, direction));
		setSort({
			direction,
			id
		});
	};
	useEffect(() => {
		dispatch(actions.fetchPossesionAll(3));
	}, [dispatch]);
	const classes = useStyles(props);
	if (listloading) {
		return <FuseLoading />;
	}
	return (
		<>
			<div className="flex flex-col">
				<ActionComponent value={props.value} />
				<FuseAnimate delay={200} animation="transition.slideUpIn">
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className={`${classes.TableContainer} flex flex-1`}>
							<Paper className={classes.rootPaper}>
								<Table
									className={entities && entities.length === 0 ? classes.tableNodata : classes.table}
									stickyHeader
								>
									<TableHeaderRepair createSortHandler={createSortHandler} sort={sort} />
									<TableBodyRepair
										handleOpenFormCycleView={handleOpenFormCycleView}
										handleOpenFormLiquiAsset={handleOpenFormLiquiAsset}
										entities={entities}
										lastErrors={lastErrors}
										classes={classes}
									/>
								</Table>
								{(entities && entities.length === 0) || lastErrors ? (
									<FuseAnimate delay={300}>
										<div className="flex items-center justify-center h-auto">
											<img
												className="rounded-full mx-auto"
												src={image}
												alt=""
												width="384"
												height="512"
											/>
										</div>
									</FuseAnimate>
								) : null}
							</Paper>
						</TableContainer>
						{entities && entities.length !== 0 && (
							<Panigation
								page={page}
								handleChangePage={handleChangePage}
								rowPage={rowPage}
								handleChangeRowsPerPage={handleRowChange}
								count={total_count}
							/>
						)}
					</div>
				</FuseAnimate>
			</div>
		</>
	);
}
