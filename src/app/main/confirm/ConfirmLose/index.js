/* eslint-disable no-shadow */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, Table, TableContainer } from '@material-ui/core';
import { useSelector, shallowEqual } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import image from '@fuse/assets/group.png';
import { ConfirmContext } from '../ConfirmContext';
import TableHeader from './Components/TableHeader';
import TableBodyLose from './Components/TableBodyLose';

const useStyles = makeStyles(theme => ({
	// InputSearch: {
	// 	width: '160px'
	// },
	tableHead: {
		height: 44
	},
	table: {
		minWidth: 800
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

export default function ConfirmLose(props) {
	const ConfirmContextLose = useContext(ConfirmContext);
	const { setFormControl, setType } = ConfirmContextLose;
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { listloading, entities, lastErrors } = currentState;
	const classes = useStyles(props);
	const handleOpenFormEdit = items => {
		setFormControl(true);
		setType('lose');
		// const params = 'Supplier,Company,AssetType,AssetGroup,AssetGroupDetail,Department';
		// dispatch(actions.getInformationCompany(params));
		// dispatch(actions.setTaskEditPossesionAll(null));
		// setOpen(true);
	};
	// const handleOpenFormEdit = items => {
	// 	setActionMenu(null);
	// 	// setOpen(true);
	// };
	// const handleRowChange = e => {
	// setRowPage(parseInt(e.target.value, 10));
	// setPage(0);
	// const rowPageParse = parseInt(e.target.value, 10);
	// dispatch(actions.fetchPossesionAll(value, rowPageParse, 1, search));
	// };
	// const handleChangePage = (event, newPage) => {
	// setPage(newPage);
	// dispatch(actions.fetchPossesionAll(value, rowPage, newPage + 1, search));
	// };
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
									<TableHeader />
									<TableBodyLose
										handleOpenForm={handleOpenFormEdit}
										classes={classes}
										entities={entities}
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
						{/* {entities && entities.length !== 0 && (
							<Panigation
								page={page}
								handleChangePage={handleChangePage}
								rowPage={rowPage}
								handleChangeRowsPerPage={handleRowChange}
								count={total_count}
							/>
						)} */}
					</div>
				</FuseAnimate>
			</div>
		</>
	);
}
