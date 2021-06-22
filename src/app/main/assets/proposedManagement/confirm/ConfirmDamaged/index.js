/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, Table, TableContainer } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import Panigation from '@fuse/core/FusePanigate';
import { Empty, Spin } from 'antd';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import { ConfirmContext } from '../ConfirmContext';
import TableBodyDamaged from './DamagedComponets/TableBodyDamaged';
import TableHeaderDamaged from './DamagedComponets/TableHeaderDamaged';
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
	const classes = DtpCustomStyles(props);
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
		dispatch(action.fetchDataConfirms(0, 2));
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
								<Table className={`${classes.tableGoverGroup}`} stickyHeader>
									<TableHeaderDamaged createSortHandler={createSortHandler} sort={sort} />
									<TableBodyDamaged
										handleOpenTimeLine={handleOpenTimeLine}
										entities={entities}
										lastErrors={lastErrors}
										classes={classes}
										handleOpenForm={handleOpenFormEdit}
									/>
								</Table>
								{entities?.length === 0 || lastErrors ? (
									<FuseAnimate delay={300}>
										<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
									</FuseAnimate>
								) : null}
							</Paper>
						</TableContainer>
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
				</FuseAnimate>
			</div>
		</>
	);
}
