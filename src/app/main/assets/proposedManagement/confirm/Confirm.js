import React, { useContext, useEffect } from 'react';
import Search from 'antd/lib/input/Search';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import Text from 'app/components/Text';
import { useHistory } from 'react-router';
import moment from 'moment';
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
		dateEnd,
		setDateStart,
		setDateEnd
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
	const history = useHistory();
	const total_Record = currentState && currentState.total_items;
	useEffect(() => {
		switch (value) {
			case '0':
				dispatch(
					fetchDataConfirms(
						0,
						1,
						null,
						moment(dateStart).format('YYYY/MM/DD'),
						moment(dateEnd).format('YYYY/MM/DD')
					)
				);
				break;
			case '1':
				dispatch(
					fetchDataConfirms(
						0,
						2,
						null,
						moment(dateStart).format('YYYY/MM/DD'),
						moment(dateEnd).format('YYYY/MM/DD')
					)
				);
				break;
			case '3':
				dispatch(
					fetchDataConfirms(
						0,
						2,
						null,
						moment(dateStart).format('YYYY/MM/DD'),
						moment(dateEnd).format('YYYY/MM/DD')
					)
				);
				break;
			default:
		}
	}, [value, dateStart, dateEnd, dispatch]);
	const handleChange = key => {
		dispatch(actions.changeTabs(key));
		setPage(0);
		setDateStart(moment().startOf('month'));
		setDateEnd(moment().endOf('month'));
		setStatus(null);
		setRowPage(25);
		setSort({
			direction: 'asc',
			id: null
		});
		setSearch('');
		switch (key) {
			case '0':
				history.push(`/tai-san/danh-sach-de-xuat`);
				dispatch(fetchDataConfirms(0, 1));
				break;
			case '1':
				history.push('/tai-san/danh-sach-de-xuat');
				dispatch(fetchDataConfirms(0, 2));
				break;
			case '2':
				history.push('/tai-san/danh-sach-de-xuat');
				dispatch(fetchDataConfirms(0, 3));
				break;
			default:
				history.push('/tai-san/danh-sach-de-xuat');
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
					<Text color="primary" type="title">
						Danh sách đề xuất
					</Text>
					<div className="proposedManagement__header--action">
						<Search
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
								<Text type="subTitle">
									Cấp phát ({(total_Record && total_Record.countAllocation) || 0})
								</Text>
							}
							key="0"
						>
							<ConfirmAll />
						</TabPane>
						<TabPane
							tab={
								<Text type="subTitle">
									Báo hỏng ({(total_Record && total_Record.countDamage) || 0})
								</Text>
							}
							key="1"
						>
							<ConfirmDamaged />
						</TabPane>
						<TabPane
							tab={<Text type="subTitle">Báo mất ({(total_Record && total_Record.countLost) || 0})</Text>}
							key="2"
						>
							<ConfirmLose />
						</TabPane>
					</Tabs>
				</div>
			</div>
		</>
	);
}

export default PossesionPage;
