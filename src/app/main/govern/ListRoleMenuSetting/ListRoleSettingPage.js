import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Box, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actionsInfor from '../../assets/Possesion/_redux/possesionActions';
import ListRoleSettingContent from './ListRoleSettingComponent';
import * as actions from './_reduxListRoleMenu/listRoleMenuSettingActions';

export default function ListRoleSettingPage() {
	const dispatch = useDispatch();
	const params = 'UserGroups,Users';
	useEffect(() => {
		dispatch(actionsInfor.getInformationCompany(params));
		dispatch(actions.fetchsListRoleSettings());
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
						<Typography component="span" className="font-bold flex text-sm	">
							Phân quyền chức năng
						</Typography>
					</div>
				}
				content={
					<Box p={3}>
						<ListRoleSettingContent />
					</Box>
				}
			/>
		</>
	);
}
