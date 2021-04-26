import { Tabs, Tab, Box, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useSelector, shallowEqual } from 'react-redux';
import { ConfirmContext } from './ConfirmContext';
import ConfirmAll from './ConfirmAll';
import ConfirmDamaged from './ConfirmDamaged';
import ConfirmLose from './ConfirmLose';
import FormAllocation from './FormControlConfirm/Allocation';
import FormConfirmGobal from './FormControlConfirm/ConfirmCorrupt';
import FormCustomCorrupt from './FormControlConfirm/FormCustomCorrupt';

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
			hidden={value !== index}
			// id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

function PossesionPage(props) {
	const confirmContext = useContext(ConfirmContext);
	const {
		value,
		setValue,
		formControl,
		setFormControl,
		formAllocation,
		setFormAllocation,
		typeReasonReject,
		reasonReject,
		setReasonReject
	} = confirmContext;
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const total_Record = currentState && currentState.total_items;
	const handleChange = (event, newValue) => {
		setValue(newValue);
		// setPage(0);
		// setRowPage(25);
	};
	// useEffect(() => {
	// 	if (value === 5) {
	// 		dispatch(actions.fetchPossesionAll(6, rowPage));
	// 	} else {
	// 		dispatch(actions.fetchPossesionAll(value, rowPage));
	// 	}
	// }, [value, rowPage, dispatch]);
	const handleCloseForm = () => {
		setFormControl(false);
	};
	const handleCloseFormAllocation = () => {
		setFormAllocation(false);
	};
	const hanleCancle = () => {
		setReasonReject(false);
	};
	console.log({ reasonReject });
	return (
		<>
			<FormConfirmGobal type={typeReasonReject} open={reasonReject} handleClose={hanleCancle} />
			<FormAllocation
				setReasonReject={setReasonReject}
				open={formAllocation}
				handleClose={handleCloseFormAllocation}
			/>
			<FormCustomCorrupt open={formControl} handleClose={handleCloseForm} />
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
					<Tabs
						classes={{ root: 'w-full h-64' }}
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						aria-label="scrollable auto tabs example"
					>
						<Tab
							className="font-sans"
							label={`Cấp phát (${(total_Record && total_Record.countAll) || 0})`}
							{...a11yProps(0)}
						/>
						<Tab
							className="font-sans	"
							label={`Báo hỏng (${(total_Record && total_Record.countNoUseYet) || 0})`}
							{...a11yProps(1)}
						/>
						<Tab
							className=" font-sans	"
							label={`Báo mất (${(total_Record && total_Record.countUsing) || 0})`}
							{...a11yProps(2)}
						/>
					</Tabs>
				}
				content={
					<div className="">
						<TabPanel value={value} index={0}>
							<ConfirmAll />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<ConfirmDamaged />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<ConfirmLose />
						</TabPanel>
					</div>
				}
			/>
		</>
	);
}

export default PossesionPage;
