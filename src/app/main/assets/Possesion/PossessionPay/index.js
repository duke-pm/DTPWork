/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableContainer } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import image from '@fuse/assets/group.png';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { PossessionContext } from '../PossessionContext';
import * as actions from '../_redux/possesionActions';
import TableHeaderPay from './Component/TableHeaderPay';
import TableBodyPay from './Component/TableBodyPay';
import { useStyles } from './StyleCustomPay';

export default function PossessionPay(props) {
	const { value } = props;
	const dispatch = useDispatch();
	const possessionContext = useContext(PossessionContext);
	const { rowPage, setRowPage, page, setPage, search } = possessionContext;
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count } = currentState;

	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPage = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAll(value, rowPage, page + 1, search));
	};
	useEffect(() => {
		dispatch(actions.fetchPossesionAll(6));
	}, [dispatch]);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAll(value, rowPage, page + 1, search));
	};
	const classes = useStyles(props);
	if (listloading) {
		return <FuseLoading />;
	}
	return (
		<>
			{/* <FormCustomRepair open={open} handleClose={handleClose} /> */}
			<div className="flex flex-col">
				{/* <ActionComponent /> */}

				<FuseAnimate delay={200} animation="transition.slideUpIn">
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className="flex flex-1">
							<Paper className={classes.rootPaper}>
								<Table className={classes.table} stickyHeader>
									<TableHeaderPay />
									<TableBodyPay entities={entities} />
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
