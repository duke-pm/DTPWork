/* eslint-disable no-shadow */
import React, { useContext } from 'react';
import { Paper, Table, TableContainer } from '@material-ui/core';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import image from '@fuse/assets/group.png';
import FormCustomCorrupt from './FormCorrupt';
import { PossessionContext } from '../PossessionContext';
import * as actions from '../_redux/possesionActions';
import TableHeaderCorrupt from './Component/TableHeaderCorrupt';
import TableBodyCorrupt from './Component/TableBodyCorrupt';
import { useStyles } from '../PossessionAll/StyleCustomAll';
import ActionComponent from './Component/ActionComponentFilter';

export default function PossessionCorrupt(props) {
	const { value } = props;
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors, total_count } = currentState;
	const possessionContext = useContext(PossessionContext);
	const {
		handleOpenFormCycle,
		rowPage,
		setRowPage,
		page,
		setPage,
		search,
		setLiquiAsset,
		setFormService
	} = possessionContext;
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenFormCycleView = type => handleOpenFormCycle(type);
	const handleOpenFormLiquiAsset = () => setLiquiAsset(true);
	const handleOpenFormService = () => setFormService(true);
	const handleRowChange = e => {
		setRowPage(parseInt(e.target.value, 10));
		setPage(0);
		const rowPage = parseInt(e.target.value, 10);
		dispatch(actions.fetchPossesionAll(value, rowPage, page + 1, search));
	};
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
			<FormCustomCorrupt open={open} handleClose={handleClose} />
			<div className="flex flex-col">
				<ActionComponent value={props.value} />
				<FuseAnimate animation="transition.slideUpIn" delay={200}>
					<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
						<TableContainer className={`${classes.TableContainer} flex flex-1`}>
							<Paper className={classes.rootPaper}>
								<Table className={classes.table} stickyHeader>
									<TableHeaderCorrupt />
									<TableBodyCorrupt
										entities={entities}
										lastErrors={lastErrors}
										classes={classes}
										handleOpenFormService={handleOpenFormService}
										handleOpenFormLiquiAsset={handleOpenFormLiquiAsset}
										handleOpenFormCycleView={handleOpenFormCycleView}
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
