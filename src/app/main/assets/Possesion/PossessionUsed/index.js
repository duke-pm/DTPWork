/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import React, { useContext, useEffect } from 'react';
import { Paper, Table, TableContainer } from '@material-ui/core';
import Panigation from '@fuse/core/FusePanigate';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { Empty, Spin } from 'antd';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import * as actions from '../_redux/possesionActions';
import FormCustomUsed from './FormCustomUsed';
import { PossessionContext } from '../PossessionContext';
import ActionComponent from './Component/ActionFliterComponent';
import TableHeaderUsed from './Component/TableHeaderUsed';
import TableBodyUsed from './Component/TableBodyUsed';

export default function PossessionUsed(props) {
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const classes = DtpCustomStyles(props);
	const possessionContext = useContext(PossessionContext);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count, actionLoading } = currentState;
	const { rowPage, setRowPage, page, setPage, search, value, sort, setSort, setFormService, typeSetFormService } =
		possessionContext;
	const handleOpenFormRequest = () => setFormRequest(true);
	const handleClose = () => setOpen(false);
	useEffect(() => {
		dispatch(actions.fetchPossesionAll(2));
	}, [dispatch]);
	const handleOpenForm = items => {
		dispatch(actions.setTaskEditPossesionAll(items));
		setOpen(true);
	};
	const handleOpenFromService = items => {
		typeSetFormService('use');
		dispatch(actions.setTaskEditPossesionAll(items));
		setFormService(true);
	};
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPage = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAllPanigate(value, rowPage, page + 1, search, sort.id, sort.direction));
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
	if (listloading) {
		return <FuseLoading />;
	}
	return (
		<>
			<FormCustomUsed open={open} handleClose={handleClose} />
			<div className="flex flex-col">
				<ActionComponent entities={entities} handleOpenForm={handleOpenFormRequest} value={props.value} />
				<FuseAnimate delay={200} animation="transition.slideUpIn">
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className={`${classes.TableContainer} flex flex-1`}>
							<Paper className={classes.rootPaper}>
								<Table className={classes.table} stickyHeader>
									<TableHeaderUsed createSortHandler={createSortHandler} sort={sort} />
									<TableBodyUsed
										handleOpenFromService={handleOpenFromService}
										entities={entities}
										handleOpenForm={handleOpenForm}
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
