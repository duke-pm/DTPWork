import FuseAnimate from '@fuse/core/FuseAnimate';
import { Paper, Table, TableContainer } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import image from '@fuse/assets/group.png';
import { useStyles } from '../StyleGroupUser';
import GroupUserContentBody from './GroupUserContentBody';
import GroupUserHeader from './GroupUserHeader';
import FormGroupUser from './FormGroupUser';
import ActionGroupUser from './ActionGroupUser';

export default function GroupUserContent() {
	const classes = useStyles();
	const [formGroupUser, setFormGroupUser] = useState(false);
	const { currentState } = useSelector(state => ({ currentState: state.govern.groupUser }), shallowEqual);
	const { entities, listLoading, actionLoading } = currentState;
	const handleOpenFormGroupUser = () => setFormGroupUser(true);
	const handleCloseFormGroupUser = () => setFormGroupUser(false);
	return (
		<div className="w-full flex flex-col">
			<FormGroupUser handleCloseFormGroupUser={handleCloseFormGroupUser} open={formGroupUser} />
			<ActionGroupUser handleOpenFormGroupUser={handleOpenFormGroupUser} />
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
					<TableContainer className={`${classes.TableContainer} flex flex-1`}>
						<Paper className={classes.rootPaper}>
							<Table className={`${classes.table}`} stickyHeader>
								<GroupUserHeader />
								<GroupUserContentBody />
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
