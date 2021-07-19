import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Box, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import TimeLine from '../TimeLine';
import RequestResovelTable from './ComponentResovleRequest';
import FormAllocation from './FormControlConfirm/Allocation';
import FormConfirmGobal from './FormControlConfirm/FormConfirmGobal';
import FormCustomCorrupt from './FormControlConfirm/FormCustomCorrupt';
import { ResovleContext } from './ResovleRequestContext';

export default function ResovleRequestPage() {
	const ResovleContextHandle = useContext(ResovleContext);
	const { setTimeLine, timeLine } = ResovleContextHandle;
	return (
		<>
			<TimeLine setTimeLine={setTimeLine} timeLine={timeLine} />
			<FormAllocation />
			<FormConfirmGobal />
			<FormCustomCorrupt />
			<FusePageCarded
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
						<Typography variant="h6"> Đề xuất cần xử lý</Typography>
					</div>
				}
				content={
					<Box p={3}>
						<RequestResovelTable />
					</Box>
				}
				innerScroll
			/>
		</>
	);
}
