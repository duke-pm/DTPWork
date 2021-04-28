/* eslint-disable no-shadow */
import React, { useContext, useState } from 'react';
import Panigation from '@fuse/core/FusePanigate';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, Table, TableContainer } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import image from '@fuse/assets/group.png';
import HeaderTableAllocation from './Components/HeaderTableAllocation';
import BodyTableAllocation from './Components/BodyTableAllocation';
import { ConfirmContext } from '../ConfirmContext';
import ActionComponent from './Components/FilterActionComponent';
import * as action from '../_redux/confirmAction';
import { useStyles } from './StyleCustomAll';
import HistoryAllocation from './Components/HistoryAllocation';

export default function ConfrimAllocation(props) {
	const dispatch = useDispatch();
	const [history, setHistory] = useState();
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
		dateEnd
	} = AllocationContext;
	const { currentState } = useSelector(state => ({ currentState: state.confirm }), shallowEqual);
	const { listloading, entities, lastErrors, total_count, actionLoading } = currentState;
	const classes = useStyles(props);
	const handleOpenHistory = () => setHistory(true);
	const handleCloseHistory = () => setHistory(false);
	const handleOpenForm = items => {
		dispatch(action.fetchDataConfirm(items));
		setFormAllocation(true);
	};
	const handleRowChange = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(action.fetchDataConfirms(status, rowPageParse, page, search, dateStart, dateEnd));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(action.fetchDataConfirms(status, rowPage, newPage + 1, search, dateStart, dateEnd));
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
								<Table className={`${classes.table}`} stickyHeader>
									<HeaderTableAllocation />
									<BodyTableAllocation
										classes={classes}
										entities={entities}
										handleOpenHistory={handleOpenHistory}
										handleOpenForm={handleOpenForm}
										lastErrors={lastErrors}
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
