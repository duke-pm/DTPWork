/* eslint-disable no-shadow */
import React, { useContext } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, Table, TableContainer } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import Panigation from '@fuse/core/FusePanigate';
import image from '@fuse/assets/group.png';
import { ConfirmContext } from '../ConfirmContext';
import TableBodyDamaged from './DamagedComponets/TableBodyDamaged';
import TableHeaderDamaged from './DamagedComponets/TableHeaderDamaged';
import { useStyles } from './StyleCustomAll';
import * as action from '../_redux/confirmAction';

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
		setPage
	} = ConfirmContextDamage;
	const { currentState } = useSelector(state => ({ currentState: state.confirm }), shallowEqual);
	const { listloading, entities, lastErrors, total_count } = currentState;
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const handleOpenFormEdit = items => {
		setFormControl(true);
		setType('damaged');
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
			<div className="flex flex-col">
				<FuseAnimate animation="transition.slideUpIn" delay={200}>
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className={`${classes.TableContainer} flex flex-1`}>
							<Paper className={classes.rootPaper}>
								<Table className={`${classes.table}`} stickyHeader>
									<TableHeaderDamaged />
									<TableBodyDamaged
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
