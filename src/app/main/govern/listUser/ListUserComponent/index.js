import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, Table, TableContainer } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import image from '@fuse/assets/group.png';
import { useStyles } from '../StyleGroupUser';
import ListUserContentBody from './ListUserContentBody';
import ListUserHeader from './ListUserHeader';
import FormListUser from './FormListUser';
import ActionListUser from './ActionListUser';

export default function ListUserContent() {
	const classes = useStyles();
	const [formGroupUser, setFormGroupUser] = useState(false);
	const { currentState } = useSelector(state => ({ currentState: state.govern.groupUser }), shallowEqual);
	const { entities, listLoading, actionLoading } = currentState;
	const handleOpenFormGroupUser = () => setFormGroupUser(true);
	const handleCloseFormGroupUser = () => setFormGroupUser(false);
	return (
		<div className="w-full flex flex-col">
			<FormListUser handleCloseFormGroupUser={handleCloseFormGroupUser} open={formGroupUser} />
			<ActionListUser handleOpenFormGroupUser={handleOpenFormGroupUser} />
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
					<TableContainer className={`${classes.TableContainer} flex flex-1`}>
						<Paper className={classes.rootPaper}>
							<Table className={`${classes.table}`} stickyHeader>
								<ListUserHeader />
								<ListUserContentBody />
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
				</div>
			</FuseAnimate>
		</div>
	);
}
