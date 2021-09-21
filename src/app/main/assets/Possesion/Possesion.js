/* eslint-disable no-shadow */
import { Button, Typography } from '@material-ui/core';
import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Search from 'antd/lib/input/Search';
import { Tabs } from 'antd';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
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

const { TabPane } = Tabs;

function PossesionPage(props) {
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const type = location.search ? queryString.parse(location.search) : null;
	const dispatch = useDispatch();
	const possessionContext = useContext(PossessionContext);
	const { value, setPage, setRowPage, setSort, setSearch, search, rowPage, page, sort } = possessionContext;
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const total_Record = currentState && currentState.total_items;
	const handleSearch = () => {
		switch (type?.loai) {
			case 'tat-ca':
				dispatch(actions.searchPossesion(0, search, rowPage, page, sort.id, sort.direction));
				break;
			case 'chua-su-dung':
				dispatch(actions.searchPossesion(1, search, rowPage, page, sort.id, sort.direction));
				break;
			case 'dang-su-dung':
				dispatch(actions.searchPossesion(2, search, rowPage, page, sort.id, sort.direction));
				break;
			case 'sua-chua-bao-hanh':
				dispatch(actions.searchPossesion(3, search, rowPage, page, sort.id, sort.direction));
				break;
			case 'hu-hong-mat':
				dispatch(actions.searchPossesion(4, search, rowPage, page, sort.id, sort.direction));
				break;
			case 'thanh-ly':
				dispatch(actions.searchPossesion(6, search, rowPage, page, sort.id, sort.direction));
				break;
			default:
				dispatch(actions.searchPossesion(0, search, rowPage, page, sort.id, sort.direction));
		}
		setPage(0);
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		setPage(0);
		if (e.target.value.length <= 0) {
			switch (type?.loai) {
				case 'tat-ca':
					dispatch(actions.searchPossesion(0, search, rowPage, page, sort.id, sort.direction));
					break;
				case 'chua-su-dung':
					dispatch(actions.searchPossesion(1, search, rowPage, page, sort.id, sort.direction));
					break;
				case 'dang-su-dung':
					dispatch(actions.searchPossesion(2, search, rowPage, page, sort.id, sort.direction));
					break;
				case 'sua-chua-bao-hanh':
					dispatch(actions.searchPossesion(3, search, rowPage, page, sort.id, sort.direction));
					break;
				case 'hu-hong-mat':
					dispatch(actions.searchPossesion(4, search, rowPage, page, sort.id, sort.direction));
					break;
				case 'thanh-ly':
					dispatch(actions.searchPossesion(6, search, rowPage, page, sort.id, sort.direction));
					break;
				default:
					dispatch(actions.searchPossesion(0, search, rowPage, page, sort.id, sort.direction));
			}
		}
	};
	const handleChange = value => {
		setPage(0);
		setRowPage(25);
		setSort({
			direction: 'desc',
			id: null
		});
		setSearch('');
		switch (value) {
			case 'tat-ca':
				history.push('/tai-san/quan-ly-tai-san/danh-sach?loai=tat-ca');
				dispatch(actions.fetchPossesionAll(0));
				break;
			case 'chua-su-dung':
				history.push('/tai-san/quan-ly-tai-san/danh-sach?loai=chua-su-dung');
				dispatch(actions.fetchPossesionAll(1));
				break;
			case 'dang-su-dung':
				history.push('/tai-san/quan-ly-tai-san/danh-sach?loai=dang-su-dung');
				dispatch(actions.fetchPossesionAll(2));
				break;
			case 'sua-chua-bao-hanh':
				history.push('/tai-san/quan-ly-tai-san/danh-sach?loai=sua-chua-bao-hanh');
				dispatch(actions.fetchPossesionAll(3));
				break;
			case 'hu-hong-mat':
				history.push('/tai-san/quan-ly-tai-san/danh-sach?loai=hu-hong-mat');
				dispatch(actions.fetchPossesionAll(4));
				break;
			case 'thanh-ly':
				history.push('/tai-san/quan-ly-tai-san/danh-sach?loai=thanh-ly');
				dispatch(actions.fetchPossesionAll(6));
				break;
			default:
				dispatch(actions.fetchPossesionAll(0));
		}
	};
	const handleOpenForm = () => {
		dispatch(actions.setTaskEditPossesionAll(null));
		history.push('/tai-san/quan-ly-tai-san/modify?type=tao-moi');
	};
	console.log(type);
	return (
		<>
			<div className="container assets">
				<div className="assets__header px-16 shadow-lg">
					<Typography color="primary" variant="h6">
						Tài sản
					</Typography>
					<div className="assets__header--action">
						<Search
							onKeyPress={event => {
								if (event.key === 'Enter') {
									handleSearch();
								}
							}}
							value={search}
							onSearch={handleSearch}
							onChange={e => onHandleChange(e)}
							className="input__search"
							placeholder="Search"
						/>
						{type?.loai === 'tat-ca' || type === null ? (
							<Button
								onClick={handleOpenForm}
								variant="contained"
								className="button__create"
								color="primary"
							>
								<Typography variant="button"> Thêm mới </Typography>
							</Button>
						) : (
							''
						)}
					</div>
				</div>
				<div className="assets__Tab px-16">
					<Tabs onChange={handleChange} defaultActiveKey={type?.loai || '0'}>
						<TabPane
							tab={
								<Typography variant="body1">
									Tất cả ({(total_Record && total_Record.countAll) || 0})
								</Typography>
							}
							key="tat-ca"
						>
							<PossessionAll open={open} />
						</TabPane>
						<TabPane
							tab={
								<Typography variant="body1">
									Chưa sử dụng ({(total_Record && total_Record.countNoUseYet) || 0}){' '}
								</Typography>
							}
							key="chua-su-dung"
						>
							<PossessionUnused value={value} />
						</TabPane>
						<TabPane
							tab={
								<Typography variant="body1">
									Đang sử dụng ({(total_Record && total_Record.countUsing) || 0}){' '}
								</Typography>
							}
							key="dang-su-dung"
						>
							<PossessionUsed value={value} />
						</TabPane>
						<TabPane
							tab={
								<Typography variant="body1">
									Sửa chữa - bảo hành ({(total_Record && total_Record.countWarrantyRepair) || 0})
								</Typography>
							}
							key="sua-chua-bao-hanh"
						>
							<PossessionRepair value={value} />
						</TabPane>
						<TabPane
							tab={
								<Typography variant="body1">
									Hư hỏng - mất ({(total_Record && total_Record.countDamaged) || 0} -{' '}
									{(total_Record && total_Record.countLost) || 0} ){' '}
								</Typography>
							}
							key="hu-hong-mat"
						>
							<PossessionCorrupt value={value} />
						</TabPane>
						<TabPane
							tab={
								<Typography variant="body1">
									Thanh lý ({(total_Record && total_Record.countLiquidation) || 0})
								</Typography>
							}
							key="thanh-ly"
						>
							<PossessionPay value={value} />
						</TabPane>
					</Tabs>
				</div>
			</div>
		</>
		// <>
		// 	<FormAssetLiquidation />
		// 	<FormCustomService />
		// 	<FormControlCycle />
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
		// 				classes={{ root: 'flex w-full h-64' }}
		// 				value={value}
		// 				onChange={handleChange}
		// 				indicatorColor="primary"
		// 				textColor="primary"
		// 				variant="scrollable"
		// 				scrollButtons="auto"
		// 			>
		// 				<Tab
		// 					label={
		// 						<Typography variant="body1">
		// 							Tất cả ({(total_Record && total_Record.countAll) || 0})
		// 						</Typography>
		// 					}
		// 					{...a11yProps(0)}
		// 				/>
		// 				<Tab
		// 					label={
		// 						<Typography variant="body1">
		// 							{' '}
		// 							Chưa sử dụng ({(total_Record && total_Record.countNoUseYet) || 0}){' '}
		// 						</Typography>
		// 					}
		// 					{...a11yProps(1)}
		// 				/>
		// 				<Tab
		// 					label={
		// 						<Typography variant="body1">
		// 							Đang sử dụng ({(total_Record && total_Record.countUsing) || 0}){' '}
		// 						</Typography>
		// 					}
		// 					{...a11yProps(2)}
		// 				/>
		// 				<Tab
		// 					label={
		// 						<Typography variant="body1">
		// 							Sửa chữa - bảo hành ({(total_Record && total_Record.countWarrantyRepair) || 0})
		// 						</Typography>
		// 					}
		// 					{...a11yProps(3)}
		// 				/>
		// 				<Tab
		// 					label={
		// 						<Typography variant="body1">
		// 							Hư hỏng - mất ({(total_Record && total_Record.countDamaged) || 0} -{' '}
		// 							{(total_Record && total_Record.countLost) || 0} )
		// 						</Typography>
		// 					}
		// 					{...a11yProps(4)}
		// 				/>
		// 				<Tab
		// 					label={
		// 						<Typography variant="body1">
		// 							Thanh lý ({(total_Record && total_Record.countLiquidation) || 0})
		// 						</Typography>
		// 					}
		// 					{...a11yProps(5)}
		// 				/>
		// 			</Tabs>
		// 		}
		// 		content={
		// 			<div className="">
		// 				<TabPanel value={value} index={0}>
		// 					<PossessionAll value={value} />
		// 				</TabPanel>
		// 				<TabPanel value={value} index={1}>
		// 					<PossessionUnused value={value} />
		// 				</TabPanel>
		// 				<TabPanel value={value} index={2}>
		// 					<PossessionUsed value={value} />
		// 				</TabPanel>
		// 				<TabPanel value={value} index={3}>
		// 					<PossessionRepair value={value} />
		// 				</TabPanel>
		// 				<TabPanel value={value} index={4}>
		// 					<PossessionCorrupt value={value} />
		// 				</TabPanel>
		// 				<TabPanel value={value} index={5}>
		// 					<PossessionPay value={value} />
		// 				</TabPanel>
		// 			</div>
		// 		}
		// 	/>
		// </>
	);
}

export default PossesionPage;
