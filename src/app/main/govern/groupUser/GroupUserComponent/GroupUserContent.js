import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, Table, TableContainer } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import image from '@fuse/assets/group.png';
import { Spin } from 'antd';
import Panigation from '@fuse/core/FusePanigate';
import FuseLoading from '@fuse/core/FuseLoading';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import GroupUserContentBody from './GroupUserContentBody';
import GroupUserHeader from './GroupUserHeader';
import FormGroupUser from './FormGroupUser';
import ActionGroupUser from './ActionGroupUser';
import * as actions from '../_reduxGroupUser/groupUserActions';
import { GroupUserContext } from '../GroupUserContext';

export default function GroupUserContent() {
	const classes = DtpCustomStyles();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.fetchsGroupUser());
	}, [dispatch]);
	const groupUserContext = useContext(GroupUserContext);
	const { page, rowPage, setPage, setRowPage, sort, setSort } = groupUserContext;
	const [formGroupUser, setFormGroupUser] = useState(false);
	const { currentState } = useSelector(state => ({ currentState: state.govern.groupUser }), shallowEqual);
	const { entities, listLoading, actionLoading, total_count } = currentState;
	const handleOpenFormGroupUser = () => {
		setFormGroupUser(true);
		dispatch(actions.setTaskEditGroupUser(null));
	};
	const handleCloseFormGroupUser = () => setFormGroupUser(false);
	const handleEditGroupUser = item => {
		setFormGroupUser(true);
		dispatch(actions.setTaskEditGroupUser(item));
	};
	const handleEditGroupUserDelete = item => {
		dispatch(actions.deletedGroupUser(item));
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(actions.filterGroupUser(rowPage, newPage + 1, sort.id, sort.direction));
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(actions.filterGroupUser(rowPageParse, page, sort.id, sort.direction));
	};
	const createSortHandler = property => event => {
		const id = property;
		let direction = 'desc';

		if (sort.id === property && sort.direction === 'desc') {
			direction = 'asc';
		}
		dispatch(actions.filterGroupUser(rowPage, page, id, direction));
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
			<FormGroupUser handleCloseFormGroupUser={handleCloseFormGroupUser} open={formGroupUser} />
			<ActionGroupUser handleOpenFormGroupUser={handleOpenFormGroupUser} />
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
					<TableContainer className={`${classes.TableContainer} flex flex-1`}>
						<Paper className={classes.rootPaper}>
							<Table className={`${classes.tableGoverGroup}`} stickyHeader>
								<GroupUserHeader createSortHandler={createSortHandler} sort={sort} />
								<GroupUserContentBody
									handleEditGroupUserDelete={handleEditGroupUserDelete}
									handleEditGroupUser={handleEditGroupUser}
									classes={classes}
									entities={entities}
								/>
							</Table>
							{!entities || entities.length === 0 ? (
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
