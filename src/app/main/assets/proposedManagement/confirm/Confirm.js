import { Tabs, Tab, Box, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Route, BrowserRouter, Switch, Link, Redirect } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { ConfirmContext } from './ConfirmContext';
import ConfirmAll from './ConfirmAll';
import ConfirmDamaged from './ConfirmDamaged';
import ConfirmLose from './ConfirmLose';
import FormAllocation from './FormControlConfirm/Allocation';
import FormConfirmGobal from './FormControlConfirm/ConfirmCorrupt';
import FormCustomCorrupt from './FormControlConfirm/FormCustomCorrupt';
import TimeLine from '../TimeLine';
import * as actions from '../../../../store/Tabs/actionsTab';

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`
	};
}
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			// id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby="scrollable-auto-tab"
			{...other}
		>
			<Box p={3}>{children}</Box>
		</div>
	);
}

function PossesionPage(props) {
	const confirmContext = useContext(ConfirmContext);
	const {
		formControl,
		setFormControl,
		formAllocation,
		setFormAllocation,
		typeReasonReject,
		setTypeReasonReject,
		reasonReject,
		setReasonReject,
		timeLine,
		setTimeLine
	} = confirmContext;
	const dispatch = useDispatch();
	const { currentState, tabs } = useSelector(
		state => ({
			currentState: state.confirm,
			tabs: state.tabs
		}),
		shallowEqual
	);
	const { value } = tabs;
	const total_Record = currentState && currentState.total_items;
	const handleChange = (event, newValue) => {
		dispatch(actions.changeTabs(newValue));
	};
	const routes = ['/xet-duyet/cap-phat', '/xet-duyet/bao-hong', '/xet-duyet/bao-mat'];
	const handleCloseForm = () => setFormControl(false);
	const handleCloseFormAllocation = () => setFormAllocation(false);
	const hanleCancle = () => setReasonReject(false);
	return (
		<>
			<TimeLine setTimeLine={setTimeLine} timeLine={timeLine} />
			<FormConfirmGobal type={typeReasonReject} open={reasonReject} handleClose={hanleCancle} />
			<FormAllocation
				setTypeReasonReject={setTypeReasonReject}
				setReasonReject={setReasonReject}
				open={formAllocation}
				handleClose={handleCloseFormAllocation}
			/>
			<FormCustomCorrupt open={formControl} handleClose={handleCloseForm} />
			<BrowserRouter>
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
						<Route
							path="/xet-duyet"
							render={history => (
								<Tabs
									classes={{ root: 'w-full h-64' }}
									value={history.location.pathname !== '/' ? history.location.pathname : false}
									indicatorColor="primary"
									textColor="primary"
									variant="scrollable"
									scrollButtons="auto"
									aria-label="scrollable auto tabs example"
								>
									<Tab
										value={routes[0]}
										to={routes[0]}
										component={Link}
										className="font-sans"
										label={`Cấp phát (${(total_Record && total_Record.countAllocation) || 0})`}
										{...a11yProps(0)}
									/>
									<Tab
										value={routes[1]}
										to={routes[1]}
										component={Link}
										className="font-sans	"
										label={`Báo hỏng (${(total_Record && total_Record.countDamage) || 0})`}
										{...a11yProps(1)}
									/>
									<Tab
										value={routes[2]}
										to={routes[2]}
										component={Link}
										className=" font-sans	"
										label={`Báo mất (${(total_Record && total_Record.countLost) || 0})`}
										{...a11yProps(2)}
									/>
								</Tabs>
							)}
						/>
					}
					content={
						<Switch>
							<Route exact path="/xet-duyet/cap-phat">
								<TabPanel>
									<ConfirmAll />
								</TabPanel>
							</Route>
							<Route path="/xet-duyet/bao-hong">
								<TabPanel>
									<ConfirmDamaged />
								</TabPanel>
							</Route>
							<Route path="/xet-duyet/bao-mat">
								<TabPanel>
									<ConfirmLose />
								</TabPanel>
							</Route>
						</Switch>
					}
				/>
			</BrowserRouter>
		</>
	);
}

export default PossesionPage;
