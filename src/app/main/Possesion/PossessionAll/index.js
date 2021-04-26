/* eslint-disable no-shadow */
import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, Table, TableContainer } from '@material-ui/core';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import image from '@fuse/assets/group.png';
import PossessionAll from './FormCustomAll';
import ActionComponent from './Component/ActionComponent';
import * as actions from '../_redux/possesionActions';
import { PossessionContext } from '../PossessionContext';
import TableHeader from './Component/TableHeader';
import TableBodyAssetAll from './Component/TableBody';

const useStyles = makeStyles(theme => ({
	tableHead: {
		height: 44
	},
	table: {
		minWidth: 1540,
		overflowX: 'auto'
	},
	cellTabel: {
		width: 340
	},
	rootPaper: {
		width: '100%',
		overflowX: 'auto'
	},
	TableContainer: {
		maxHeight: '600px'
	},
	modal: {
		display: 'flex',
		alignItems: 'start',
		marginTop: 80,
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		width: 900
	}
}));

export default function PossessionAllPage(props) {
	const { value } = props;
	const possesionContext = useContext(PossessionContext);
	const { rowPage, setRowPage, page, setPage, search } = possesionContext;
	const [open, setOpen] = useState(false);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count } = currentState;
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const handleClose = React.useCallback(() => {
		setOpen(false);
	}, []);
	const handleOpenForm = () => {
		dispatch(actions.setTaskEditPossesionAll(null));
		setOpen(true);
	};
	const handleOpenFormEdit = items => {
		setOpen(true);
		dispatch(actions.setTaskEditPossesionAll(items));
	};
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPageParse = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAll(value, rowPageParse, 1, search));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchPossesionAll(value, rowPage, newPage + 1, search));
	};
	const createSortHandler = property => event => {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}
		setOrder({
			direction,
			id
		});
	};
	if (listloading) {
		return <FuseLoading />;
	}
	return (
		<>
			<PossessionAll rowPage={rowPage} open={open} handleClose={handleClose} />
			<div className="flex flex-col">
				<ActionComponent value={value} handleOpenForm={handleOpenForm} />
				<FuseAnimate animation="transition.slideUpIn" delay={200}>
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className={`${classes.TableContainer} flex flex-1`}>
							<Paper className={classes.rootPaper}>
								<Table className={`${classes.table}`} stickyHeader>
									<TableHeader createSortHandler={createSortHandler} order={order} />
									<TableBodyAssetAll
										handleOpenFormEdit={handleOpenFormEdit}
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
