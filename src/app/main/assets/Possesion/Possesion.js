import { Tabs, Tab, Box, Typography } from '@material-ui/core';
import React, { useEffect, useContext } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import PossessionAll from './PossessionAll';
import PossessionUnused from './PossessionUnused';
import PossessionUsed from './PossessionUsed';
import PossessionRepair from './PossessionRepair';
import PossessionCorrupt from './PossessionCorrupt';
import PossessionPay from './PossessionPay';
import { PossessionContext } from './PossessionContext';
import FormControlCycle from './FormControl/FormControlCycle';
import * as actions from './_redux/possesionActions';
import FormAssetLiquidation from './FormControl/FormAssetLiquidation';
import FormCustomService from './FormControl/FormCustomRepair';

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
	const possessionContext = useContext(PossessionContext);
	const { value, setValue, setPage, setRowPage, setSort, setSearch } = possessionContext;
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const total_Record = currentState && currentState.total_items;
	const handleChange = (event, newValue) => {
		setValue(newValue);
		setPage(0);
		setRowPage(25);
		setSort({
			direction: 'desc',
			id: null
		});
		setSearch('');
	};
	const params = 'Region,Department,Employee,Supplier,Company,AssetType,AssetGroup,AssetGroupDetail';
	useEffect(() => {
		dispatch(actions.getInformationCompany(params));
	}, [dispatch]);
	return (
		<>
			<FormAssetLiquidation />
			<FormCustomService />
			<FormControlCycle />
			<FusePageCarded
				innerScroll
				classes={{
					// content: 'flex',
					header: 'min-h-10 h-10	sm:h-16 sm:min-h-16',
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
						classes={{ root: 'flex w-full h-64' }}
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
					>
						<Tab
							className="font-sans"
							label={`Tất cả (${(total_Record && total_Record.countAll) || 0})`}
							{...a11yProps(0)}
						/>
						<Tab
							className="font-sans	"
							label={`Chưa sử dụng (${(total_Record && total_Record.countNoUseYet) || 0})`}
							{...a11yProps(1)}
						/>
						<Tab
							className=" font-sans	"
							label={`Đang sử dụng (${(total_Record && total_Record.countUsing) || 0})`}
							{...a11yProps(2)}
						/>
						<Tab
							className=" font-sans	"
							label={`Sửa chữa - bảo hành (${(total_Record && total_Record.countWarrantyRepair) || 0})`}
							{...a11yProps(3)}
						/>
						<Tab
							className=" font-sans	"
							label={`Hư hỏng - mất (${(total_Record && total_Record.countDamaged) || 0} - ${
								(total_Record && total_Record.countLost) || 0
							} )`}
							{...a11yProps(4)}
						/>
						<Tab
							className=" font-sans	"
							label={`Thanh lý (${(total_Record && total_Record.countLiquidation) || 0})`}
							{...a11yProps(5)}
						/>
					</Tabs>
				}
				content={
					<div className="">
						<TabPanel value={value} index={0}>
							<PossessionAll value={value} />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<PossessionUnused value={value} />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<PossessionUsed value={value} />
						</TabPanel>
						<TabPanel value={value} index={3}>
							<PossessionRepair value={value} />
						</TabPanel>
						<TabPanel value={value} index={4}>
							<PossessionCorrupt value={value} />
						</TabPanel>
						<TabPanel value={value} index={5}>
							<PossessionPay value={value} />
						</TabPanel>
					</div>
				}
			/>
		</>
	);
}

export default PossesionPage;
