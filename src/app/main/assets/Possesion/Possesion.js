/* eslint-disable no-shadow */
import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Search from 'antd/lib/input/Search';
import { Tabs } from 'antd';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import Text from 'app/components/Text';
import PossessionAll from './PossessionAll';
import PossessionUnused from './PossessionUnused';
import PossessionUsed from './PossessionUsed';
import PossessionRepair from './PossessionRepair';
import PossessionCorrupt from './PossessionCorrupt';
import PossessionPay from './PossessionPay';
import { PossessionContext } from './PossessionContext';
import * as actions from './_redux/possesionActions';
import { getToken, URL } from '../../../../@fuse/core/DtpConfig';

const { TabPane } = Tabs;

function PossesionPage(props) {
	const local = localStorage.getItem('data_user');
	const data = JSON.parse(local);
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
	const ExportExcel = () => {
		const token = getToken();
		const dataReq = {
			UserToken: token
		};
		window.location = `${URL}/api/Assets/ExportAsset?value=${JSON.stringify(dataReq)}`;
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
	return (
		<>
			<div className="container assets">
				<div className="assets__header px-16">
					<Text color="primary" type="title">
						Tài sản
					</Text>
					<div className="assets__header--action">
						<Search
							value={search}
							onSearch={handleSearch}
							onChange={e => onHandleChange(e)}
							className="input__search"
							placeholder="Search"
						/>
						{type?.loai === 'tat-ca' || type === null ? (
							<>
								<Button
									onClick={handleOpenForm}
									variant="contained"
									className="button__create mr-8"
									color="primary"
								>
									<Text type="button" color="white">
										Thêm mới
									</Text>
								</Button>
								<Button
									onClick={ExportExcel}
									variant="contained"
									className="button__create"
									color="primary"
								>
									<Text type="button" color="white">
										Export
									</Text>
								</Button>
							</>
						) : (
							''
						)}
						{data?.userName === 'admin' && (
							<Button
								onClick={ExportExcel}
								variant="contained"
								className="button__create ml-8"
								color="primary"
							>
								<Text type="button" color="white">
									Get data
								</Text>
							</Button>
						)}
					</div>
				</div>
				<div className="assets__Tab px-16">
					<Tabs onChange={handleChange} defaultActiveKey={type?.loai || '0'}>
						<TabPane
							tab={<Text type="subTitle">Tất cả ({(total_Record && total_Record.countAll) || 0})</Text>}
							key="tat-ca"
						>
							<PossessionAll open={open} />
						</TabPane>
						<TabPane
							tab={
								<Text type="subTitle">
									Chưa sử dụng ({(total_Record && total_Record.countNoUseYet) || 0})
								</Text>
							}
							key="chua-su-dung"
						>
							<PossessionUnused value={value} />
						</TabPane>
						<TabPane
							tab={
								<Text type="subTitle">
									Đang sử dụng ({(total_Record && total_Record.countUsing) || 0})
								</Text>
							}
							key="dang-su-dung"
						>
							<PossessionUsed value={value} />
						</TabPane>
						<TabPane
							tab={
								<Text type="subTitle">
									Sửa chữa - bảo hành ({(total_Record && total_Record.countWarrantyRepair) || 0})
								</Text>
							}
							key="sua-chua-bao-hanh"
						>
							<PossessionRepair value={value} />
						</TabPane>
						<TabPane
							tab={
								<Text type="subTitle">
									{`Hư hỏng - mất (${(total_Record && total_Record.countDamaged) || 0} -
									${(total_Record && total_Record.countLost) || 0})`}
								</Text>
							}
							key="hu-hong-mat"
						>
							<PossessionCorrupt value={value} />
						</TabPane>
						<TabPane
							tab={
								<Text type="subTitle">
									Thanh lý ({(total_Record && total_Record.countLiquidation) || 0})
								</Text>
							}
							key="thanh-ly"
						>
							<PossessionPay value={value} />
						</TabPane>
					</Tabs>
				</div>
			</div>
		</>
	);
}

export default PossesionPage;
