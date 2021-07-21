import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Box, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ListUserContent from './ListUserComponent';
import * as actionsInfor from '../../assets/Possesion/_redux/possesionActions';
import * as actions from './_reduxListUser/listUserActions';

export default function ListUserPage() {
	const dispatch = useDispatch();
	const params = 'Region, Employee, Company,  Users, Sales, BizLines, UserGroups';
	useEffect(() => {
		dispatch(actionsInfor.getInformationCompany(params));
		dispatch(actions.fetchsListUser());
	}, [dispatch]);
	return (
		<>
			<FusePageCarded
				innerScroll
				classes={{
					// content: 'flex',
					header: 'min-h-10 h-10	sm:h-16 sm:min-h-16'
				}}
				header={
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-1 flex-col items-center sm:items-start">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="text-16 sm:text-20 truncate"
									// component={Link}
									// role="button"
									// to="/apps/e-commerce/orders"
									color="inherit"
								>
									{/* {xhtm} */}
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				}
				contentToolbar={
					<div className="flex  items-center px-16 flex-1">
						<Typography variant="h6">Danh sách người dùng</Typography>
					</div>
				}
				content={
					<Box p={3}>
						<ListUserContent />
					</Box>
				}
			/>
		</>
	);
}
