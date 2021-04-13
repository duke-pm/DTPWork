import { Tabs, Tab, Box, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PossessionAll from './PossessionAll';
import PossessionUnused from './PossessionUnused';
import PossessionUsed from './PossessionUsed';
import PossessionRepair from './PossessionRepair';
import PossessionCorrupt from './PossessionCorrupt';
import PossessionPay from './PossessionPay';
import PossessionContextProvider from './PossessionContext';
import FormControlCycle from './FormControl/FormControlCycle';
import * as actions from './_redux/possesionActions';

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
	const dispatch = useDispatch();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	useEffect(() => {
		switch (value) {
			case 0:
				dispatch(actions.fetchPossesionAll());
				break;
			case 1:
				console.log(value);
				break;
			case 2:
				console.log(value);
				break;
			case 3:
				console.log(value);
				break;
			case 4:
				console.log(value);
				break;
			case 5:
				console.log(value);
				break;
			default:
				console.log(value);
		}
	}, [value]);
	// const renderRouteMenu = () => {
	// let xhtm;
	// switch (value) {
	// 	case 0:
	// 		xhtm = 'Tất cả';
	// 		break;
	// 	case 1:
	// 		xhtm = 'Chưa sử dụng';
	// 		break;
	// 	case 2:
	// 		xhtm = 'Đang sử dụng';
	// 		break;
	// 	case 3:
	// 		xhtm = 'Sửa chữa - bảo hành';
	// 		break;
	// 	case 4:
	// 		xhtm = 'Hư hỏng - Mất';
	// 		break;
	// 	case 5:
	// 		xhtm = 'Thanh lí';
	// 		break;
	// 	default:
	// 		xhtm = 'Tất cả';
	// }
	// // };
	return (
		<PossessionContextProvider>
			<FormControlCycle />
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
									component={Link}
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
						<Tab className="font-sans" label="Tất cả ()" {...a11yProps(0)} />
						<Tab className="font-sans	" label="Chưa sử dụng ( )" {...a11yProps(1)} />
						<Tab className=" font-sans	" label="Đang sử dụng( )" {...a11yProps(2)} />
						<Tab className=" font-sans	" label="Sửa chữa - bảo hành( )" {...a11yProps(3)} />
						<Tab className=" font-sans	" label="Hư hỏng - Mất" {...a11yProps(4)} />
						<Tab className=" font-sans	" label="Thanh lí( )" {...a11yProps(5)} />
					</Tabs>
				}
				content={
					<div className="">
						<TabPanel value={value} index={0}>
							<PossessionAll />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<PossessionUnused />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<PossessionUsed />
						</TabPanel>
						<TabPanel value={value} index={3}>
							<PossessionRepair />
						</TabPanel>
						<TabPanel value={value} index={4}>
							<PossessionCorrupt />
						</TabPanel>
						<TabPanel value={value} index={5}>
							<FuseAnimate animation="transition.slideUpIn">
								<PossessionPay />
							</FuseAnimate>
						</TabPanel>
					</div>
				}
			/>
		</PossessionContextProvider>
	);
}

export default PossesionPage;
