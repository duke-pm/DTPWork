/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, Table, TableContainer } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import Panigation from '@fuse/core/FusePanigate';
import { Spin } from 'antd';
import image from '@fuse/assets/group.png';
import { ConfirmContext } from '../ConfirmContext';
import { useStyles } from './StyleCustomAll';
import * as action from '../../_redux/confirmAction';
import TableBodyLose from './Components/TableBodyLose';
import TableHeader from './Components/TableHeader';
import ActionComponent from './Components/FilterActionComponent';
// import ActionComponent from './DamagedComponets/FilterActionComponent';

export default function ConfirmLose(props) {
	const ConfirmContextDamage = useContext(ConfirmContext);
	const {
		setFormControl,
		setType,
		page,
		rowPage,
		setRowPage,
		status,
		search,
		dateStart,
		dateEnd,
		setPage,
		sort,
		setSort,
		setTimeLine
	} = ConfirmContextDamage;
	const { currentState } = useSelector(state => ({ currentState: state.confirm }), shallowEqual);
	const { listloading, entities, lastErrors, total_count, actionLoading } = currentState;
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const handleOpenFormEdit = items => {
		dispatch(action.fetchDataConfirm(items));
		setFormControl(true);
		setType('lose');
	};
	const handleOpenTimeLine = item => {
		setTimeLine({
			open: true,
			title: 'báo mất'
		});
		dispatch(action.timeLineApproval(item));
	};
	const handleRowChange = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(
			action.searchConfirms(
				false,
				status,
				rowPageParse,
				page,
				3,
				sort.id,
				sort.direction,
				search,
				dateStart,
				dateEnd
			)
		);
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(
			action.searchConfirms(
				false,
				status,
				rowPage,
				newPage + 1,
				3,
				sort.id,
				sort.direction,
				search,
				dateStart,
				dateEnd
			)
		);
	};
	useEffect(() => {
		dispatch(action.fetchDataConfirms(0, 3));
	}, [dispatch]);
	const createSortHandler = property => event => {
		const id = property;
		let direction = 'desc';

		if (sort.id === property && sort.direction === 'desc') {
			direction = 'asc';
		}
		dispatch(action.searchConfirms(false, status, rowPage, page, 3, id, direction, search, dateStart, dateEnd));
		setSort({
			direction,
			id
		});
	};
	if (listloading) {
		return <FuseLoading />;
	}
	return (
		<>
			<div className="flex flex-col">
				<ActionComponent actionLoading={actionLoading} />
				<FuseAnimate animation="transition.slideUpIn" delay={200}>
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className={`${classes.TableContainer} flex flex-1`}>
							<Paper className={classes.rootPaper}>
								<Table className={`${classes.table}`} stickyHeader>
									<TableHeader createSortHandler={createSortHandler} sort={sort} />
									<TableBodyLose
										handleOpenTimeLine={handleOpenTimeLine}
										entities={entities}
										lastErrors={lastErrors}
										classes={classes}
										handleOpenForm={handleOpenFormEdit}
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
				</FuseAnimate>
			</div>
		</>
	);
}
