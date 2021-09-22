import { Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import Search from 'antd/lib/input/Search';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import { ConfirmContext } from './ConfirmContext';
import ConfirmAll from './ConfirmAll';
import ConfirmDamaged from './ConfirmDamaged';
import ConfirmLose from './ConfirmLose';
import FormAllocation from './FormControlConfirm/Allocation';
import FormConfirmGobal from './FormControlConfirm/ConfirmCorrupt';
import TimeLine from '../TimeLine';
import * as actions from '../../../../store/Tabs/actionsTab';
import { fetchDataConfirms, searchConfirms } from '../_redux/confirmAction';

const { TabPane } = Tabs;
function PossesionPage(props) {
	const confirmContext = useContext(ConfirmContext);
	const {
		formAllocation,
		setFormAllocation,
		typeReasonReject,
		setTypeReasonReject,
		reasonReject,
		setReasonReject,
		timeLine,
		setTimeLine,
		setPage,
		setRowPage,
		setSearch,
		setSort,
		setStatus,
		status,
		rowPage,
		page,
		sort,
		search,
		dateStart,
		dateEnd
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
	const handleChange = key => {
		dispatch(actions.changeTabs(key));
		setPage(0);
		setStatus(null);
		setRowPage(25);
		setSort({
			direction: 'asc',
			id: null
		});
		setSearch('');
		switch (key) {
			case '0':
				dispatch(fetchDataConfirms(0, 1));
				break;
			case '1':
				dispatch(fetchDataConfirms(0, 2));
				break;
			case '2':
				dispatch(fetchDataConfirms(0, 3));
				break;
			default:
				dispatch(fetchDataConfirms(0, 1));
		}
	};
	const handleCloseFormAllocation = () => setFormAllocation(false);
	const hanleCancle = () => setReasonReject(false);
	const handleSearch = () => {
		setPage(0);
		switch (value) {
			case '0':
				dispatch(
					searchConfirms(false, status, rowPage, page, 1, sort.id, sort.direction, search, dateStart, dateEnd)
				);
				break;
			case '1':
				dispatch(
					searchConfirms(false, status, rowPage, page, 2, sort.id, sort.direction, search, dateStart, dateEnd)
				);
				break;
			case '2':
				dispatch(
					searchConfirms(false, status, rowPage, page, 3, sort.id, sort.direction, search, dateStart, dateEnd)
				);
				break;
			default:
				dispatch(
					searchConfirms(false, status, rowPage, page, 1, sort.id, sort.direction, search, dateStart, dateEnd)
				);
				break;
		}
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		setPage(0);
		if (e.target.value.length <= 0) {
			switch (value) {
				case '0':
					dispatch(
						searchConfirms(
							false,
							status,
							rowPage,
							page,
							1,
							sort.id,
							sort.direction,
							e.target.value,
							dateStart,
							dateEnd
						)
					);
					break;
				case '1':
					dispatch(
						searchConfirms(
							false,
							status,
							rowPage,
							page,
							2,
							sort.id,
							sort.direction,
							e.target.value,
							dateStart,
							dateEnd
						)
					);
					break;
				case '2':
					dispatch(
						searchConfirms(
							false,
							status,
							rowPage,
							page,
							3,
							sort.id,
							sort.direction,
							e.target.value,
							dateStart,
							dateEnd
						)
					);
					break;
				default:
					dispatch(
						searchConfirms(
							false,
							status,
							rowPage,
							page,
							1,
							sort.id,
							sort.direction,
							e.target.value,
							dateStart,
							dateEnd
						)
					);
					break;
			}
		}
	};
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
			{/* <FormCustomCorrupt open={formControl} handleClose={handleCloseForm} /> */}
			<div className="container proposedManagement">
				<div className="proposedManagement__header px-16 shadow-lg">
					<Typography color="primary" variant="h6">
						Danh sách đề xuất
					</Typography>
					<div className="proposedManagement__header--action">
						<Search
							onKeyPress={event => {
								if (event.key === 'Enter') {
									handleSearch();
								}
							}}
							onSearch={handleSearch}
							onChange={e => onHandleChange(e)}
							className="input__search"
							placeholder="Search"
						/>
					</div>
				</div>
				<div className="proposedManagement__Tab px-16">
					<Tabs onChange={handleChange} defaultActiveKey={value}>
						<TabPane
							tab={
								<Typography variant="body1">
									Cấp phát ({(total_Record && total_Record.countAllocation) || 0}){' '}
								</Typography>
							}
							key="0"
						>
							<ConfirmAll />
						</TabPane>
						<TabPane
							tab={
								<Typography variant="body1">
									Báo hỏng ({(total_Record && total_Record.countDamage) || 0})
								</Typography>
							}
							key="1"
						>
							<ConfirmDamaged />
						</TabPane>
						<TabPane
							tab={
								<Typography variant="body1">
									Báo mất ({(total_Record && total_Record.countLost) || 0})
								</Typography>
							}
							key="2"
						>
							<ConfirmLose />
						</TabPane>
					</Tabs>
				</div>
			</div>
		</>
		// <>
		// 	<TimeLine setTimeLine={setTimeLine} timeLine={timeLine} />
		// 	{/* <FormConfirmGobal type={typeReasonReject} open={reasonReject} handleClose={hanleCancle} />
		// 	<FormAllocation
		// 		setTypeReasonReject={setTypeReasonReject}
		// 		setReasonReject={setReasonReject}
		// 		open={formAllocation}
		// 		handleClose={handleCloseFormAllocation}
		// 	/>
		// 	<FormCustomCorrupt open={formControl} handleClose={handleCloseForm} /> */}
		// 	<FusePageCarded
		// 		innerScroll
		// 		classes={{
		// 			// content: 'flex',
		// 			header: 'min-h-10 h-10	sm:h-16 sm:min-h-16'
		// 		}}
		// 		header={
		// 			<div className="flex flex-1 w-full items-center justify-between">
		// 				<div className="flex flex-1 flex-col items-center sm:items-start">
		// 					<FuseAnimate animation="transition.slideRightIn" delay={300}>
		// 						<Typography
		// 							className="text-16 sm:text-20 truncate"
		// 							// component={Link}
		// 							// role="button"
		// 							// to="/apps/e-commerce/orders"
		// 							color="inherit"
		// 						>
		// 							{/* {xhtm} */}
		// 						</Typography>
		// 					</FuseAnimate>
		// 				</div>
		// 			</div>
		// 		}
		// 		contentToolbar={
		// 			<Tabs
		// 				classes={{ root: 'w-full h-64' }}
		// 				value={value}
		// 				onChange={handleChange}
		// 				indicatorColor="primary"
		// 				textColor="primary"
		// 				variant="scrollable"
		// 				scrollButtons="auto"
		// 				aria-label="scrollable auto tabs example"
		// 			>
		// 				<Tab
		// 					label={
		// 						<Typography variant="body1">
		// 							{' '}
		// 							Cấp phát ({(total_Record && total_Record.countAllocation) || 0}){' '}
		// 						</Typography>
		// 					}
		// 					{...a11yProps(0)}
		// 				/>
		// 				<Tab
		// 					label={
		// 						<Typography variant="body1">
		// 							Báo hỏng ({(total_Record && total_Record.countDamage) || 0})
		// 						</Typography>
		// 					}
		// 					{...a11yProps(1)}
		// 				/>
		// 				<Tab
		// 					label={
		// 						<Typography variant="body1">
		// 							Báo mất ({(total_Record && total_Record.countLost) || 0})
		// 						</Typography>
		// 					}
		// 					{...a11yProps(2)}
		// 				/>
		// 			</Tabs>
		// 		}
		// 		content={
		// 			<div className="">
		// 				<TabPanel value={value} index={0}>
		// 					<ConfirmAll />
		// 				</TabPanel>
		// 				<TabPanel value={value} index={1}>
		// 					<ConfirmDamaged />
		// 				</TabPanel>
		// 				<TabPanel value={value} index={2}>
		// 					<ConfirmLose />
		// 				</TabPanel>
		// 			</div>
		// 		}
		// 	/>
		// </>
	);
}

export default PossesionPage;
