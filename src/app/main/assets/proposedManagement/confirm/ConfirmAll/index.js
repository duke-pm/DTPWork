/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import Panigation from '@fuse/core/FusePanigate';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, Table, TableContainer } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { Empty, Spin } from 'antd';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import HeaderTableAllocation from './Components/HeaderTableAllocation';
import BodyTableAllocation from './Components/BodyTableAllocation';
import { ConfirmContext } from '../ConfirmContext';
import ActionComponent from './Components/FilterActionComponent';
import * as action from '../../_redux/confirmAction';
import HistoryAllocation from './Components/HistoryAllocation';

export default function ConfrimAllocation(props) {
	const dispatch = useDispatch();
	const [history, setHistory] = useState(false);
	const AllocationContext = useContext(ConfirmContext);
	const {
		setFormAllocation,
		setPage,
		status,
		page,
		rowPage,
		setRowPage,
		search,
		dateStart,
		dateEnd,
		sort,
		setSort,
		setTimeLine
	} = AllocationContext;
	const { currentState } = useSelector(state => ({ currentState: state.confirm }), shallowEqual);
	const { listloading, entities, lastErrors, total_count, actionLoading } = currentState;
	const classes = DtpCustomStyles(props);
	const handleOpenHistory = () => setHistory(true);
	const handleCloseHistory = () => setHistory(false);
	const handleOpenTimeLine = item => {
		setTimeLine({
			open: true,
			title: 'cấp phát'
		});
		dispatch(action.timeLineApproval(item));
	};
	const handleOpenForm = items => {
		dispatch(action.fetchDataConfirm(items));
		setFormAllocation(true);
	};
	useEffect(() => {
		dispatch(action.fetchDataConfirms(0, 1));
	}, [dispatch]);
	const handleRowChange = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(
			action.searchConfirms(
				false,
				status,
				rowPageParse,
				page,
				1,
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
				1,
				sort.id,
				sort.direction,
				search,
				search,
				dateStart,
				dateEnd
			)
		);
	};
	const createSortHandler = property => event => {
		const id = property;
		let direction = 'desc';

		if (sort.id === property && sort.direction === 'desc') {
			direction = 'asc';
		}
		dispatch(action.searchConfirms(false, status, rowPage, page, 1, id, direction, search, dateStart, dateEnd));
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
			<HistoryAllocation handleCloseHistory={handleCloseHistory} open={history} />
			<div className="flex flex-col">
				<ActionComponent actionLoading={actionLoading} />
				<FuseAnimate animation="transition.slideUpIn" delay={200}>
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className={`${classes.TableContainer} flex flex-1`}>
							<Paper className={classes.rootPaper}>
								<Table className={`${classes.tableGoverGroup}`} stickyHeader>
									<HeaderTableAllocation createSortHandler={createSortHandler} sort={sort} />
									<BodyTableAllocation
										classes={classes}
										entities={entities}
										handleOpenTimeLine={handleOpenTimeLine}
										handleOpenHistory={handleOpenHistory}
										handleOpenForm={handleOpenForm}
										lastErrors={lastErrors}
									/>
								</Table>
								{(entities && entities.length === 0) || lastErrors ? (
									<FuseAnimate delay={300}>
										<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
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
