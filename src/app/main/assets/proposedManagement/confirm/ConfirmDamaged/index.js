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
import TableBodyDamaged from './DamagedComponets/TableBodyDamaged';
import TableHeaderDamaged from './DamagedComponets/TableHeaderDamaged';
import { useStyles } from './StyleCustomAll';
import * as action from '../../_redux/confirmAction';
import ActionComponent from './DamagedComponets/FilterActionComponent';

export default function ConfirmDamaged(props) {
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
		setFormControl(true);
		setType('damaged');
		dispatch(action.fetchDataConfirm(items));
	};
	const handleOpenTimeLine = item => {
		setTimeLine({
			open: true,
			title: 'báo hư hỏng'
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
				2,
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
				2,
				sort.id,
				sort.direction,
				search,
				dateStart,
				dateEnd
			)
		);
	};
	useEffect(() => {
		dispatch(action.fetchDataConfirms(0, rowPage, page, search, dateStart, dateEnd, 2));
	}, [dispatch]);
	const createSortHandler = property => event => {
		const id = property;
		let direction = 'desc';

		if (sort.id === property && sort.direction === 'desc') {
			direction = 'asc';
		}
		dispatch(action.searchConfirms(false, status, rowPage, page, 2, id, direction, search, dateStart, dateEnd));
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
									<TableHeaderDamaged createSortHandler={createSortHandler} sort={sort} />
									<TableBodyDamaged
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
