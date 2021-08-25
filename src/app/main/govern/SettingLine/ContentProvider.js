import FuseAnimate from '@fuse/core/FuseAnimate';
import { Box, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import FusePageCardedTask from '@fuse/core/FusePageCarded/FusePageCardedTask';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import ProjectComponent from './LineComponent';
import { SettingLineContext } from './SettingLineContext';
import FormLine from './LineComponent/FormLine';

export default function ContentProvider() {
	const { currentState, project } = useSelector(
		state => ({
			currentState: state.possesion.entitiesInformation,
			projectAll: state.project.entitiesAll,
			project: state.project.entitiesDetail,
			listLoading: state.project.listLoading
		}),
		shallowEqual
	);
	const settingLineContext = useContext(SettingLineContext);
	const { form, setForm } = settingLineContext;
	const classes = DtpCustomStyles();
	const dispatch = useDispatch();

	return (
		<>
			<FormLine />
			<FusePageCardedTask
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
					<div className="flex items-center p-16 flex-1">
						<Typography className="ml-16" variant="h6">
							Role setting
						</Typography>
					</div>
				}
				content={
					<Box p={3}>
						<ProjectComponent />
					</Box>
				}
			/>
		</>
	);
}
