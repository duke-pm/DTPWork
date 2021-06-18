/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import { Paper, Table, TableContainer } from '@material-ui/core';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import { Empty } from 'antd';
import FormCustomCorrupt from './FormCorrupt';
import { PossessionContext } from '../PossessionContext';
import * as actions from '../_redux/possesionActions';
import TableHeaderCorrupt from './Component/TableHeaderCorrupt';
import TableBodyCorrupt from './Component/TableBodyCorrupt';
import ActionComponent from './Component/ActionComponentFilter';

export default function PossessionCorrupt(props) {
	const { value } = props;
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count } = currentState;
	const possessionContext = useContext(PossessionContext);
	const {
		rowPage,
		setRowPage,
		page,
		setPage,
		search,
		setLiquiAsset,
		setFormService,
		setTypeLiquiAsset,
		typeSetFormService,
		sort,
		setSort
	} = possessionContext;
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenFormLiquiAsset = item => {
		setLiquiAsset(true);
		setTypeLiquiAsset('damage');
		dispatch(actions.setTaskEditPossesionAll(item));
	};
	const handleOpenFormService = item => {
		setFormService(true);
		typeSetFormService('damage');
		dispatch(actions.setTaskEditPossesionAll(item));
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
		dispatch(actions.fetchPossesionAll(4));
	}, [dispatch]);
	const classes = DtpCustomStyles(props);
	if (listloading) {
		return <FuseLoading />;
	}
	return (
		<>
			<FormCustomCorrupt open={open} handleClose={handleClose} />
			<div className="flex flex-col">
				<ActionComponent value={props.value} />
				<FuseAnimate animation="transition.slideUpIn" delay={200}>
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className={`${classes.TableContainer} flex flex-1`}>
							<Paper className={classes.rootPaper}>
								<Table className={classes.table} stickyHeader>
									<TableHeaderCorrupt createSortHandler={createSortHandler} sort={sort} />
									<TableBodyCorrupt
										entities={entities}
										lastErrors={lastErrors}
										classes={classes}
										handleOpenFormService={handleOpenFormService}
										handleOpenFormLiquiAsset={handleOpenFormLiquiAsset}
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
