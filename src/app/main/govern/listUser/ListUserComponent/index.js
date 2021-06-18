import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, Table, TableContainer } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Empty, Spin } from 'antd';
import Panigation from '@fuse/core/FusePanigate';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import FuseLoading from '@fuse/core/FuseLoading';
import ListUserContentBody from './ListUserContentBody';
import ListUserHeader from './ListUserHeader';
import FormListUser from './FormListUser';
import ActionListUser from './ActionListUser';
import { ListUserContext } from '../ListUserContext';
import * as actions from '../_reduxListUser/listUserActions';

export default function ListUserContent() {
	const classes = DtpCustomStyles();
	const dispatch = useDispatch();
	const useListUserContext = useContext(ListUserContext);
	const { page, rowPage, setPage, sort, setRowPage, setSort } = useListUserContext;
	const [formListUser, setFormListUser] = useState(false);
	const { currentState } = useSelector(state => ({ currentState: state.govern.listUser }), shallowEqual);
	const { entities, actionLoading, total_count, listLoading } = currentState;
	const handleOpenFormGroupUser = () => {
		setFormListUser(true);
		dispatch(actions.setTaskEditListUser(null));
	};
	const handleCloseFormGroupUser = () => setFormListUser(false);
	const handleEditListUser = item => {
		setFormListUser(true);
		dispatch(actions.setTaskEditListUser(item));
	};
	const handleDeleteListUser = item => {
		dispatch(actions.deletedListUser(item));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.fetchsListFilter(newPage + 1, rowPage, sort.id, sort.direction));
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(actions.fetchsListFilter(page, rowPageParse, sort.id, sort.direction));
	};
	const createSortHandler = property => event => {
		const id = property;
		let direction = 'desc';

		if (sort.id === property && sort.direction === 'desc') {
			direction = 'asc';
		}
		dispatch(actions.fetchsListFilter(page, rowPage, id, direction));
		setSort({
			direction,
			id
		});
	};
	if (listLoading) {
		return <FuseLoading />;
	}
	return (
		<div className="w-full flex flex-col">
			<FormListUser handleCloseFormGroupUser={handleCloseFormGroupUser} open={formListUser} />
			<ActionListUser handleOpenFormGroupUser={handleOpenFormGroupUser} />
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
					<TableContainer className={`${classes.TableContainer} flex flex-1`}>
						<Paper className={classes.rootPaper}>
							<Table className={`${classes.tableGoverListUser}`} stickyHeader>
								<ListUserHeader createSortHandler={createSortHandler} sort={sort} />
								<ListUserContentBody
									handleDeleteListUser={handleDeleteListUser}
									handleEditListUser={handleEditListUser}
									classes={classes}
									entities={entities}
								/>
							</Table>
							{!entities || entities.length === 0 ? (
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
								handleChangeRowsPerPage={handleRowPage}
								count={total_count}
							/>
						</div>
					)}
				</div>
			</FuseAnimate>
		</div>
	);
}
