import React, { useContext, useEffect } from 'react';
import Search from 'antd/lib/input/Search';
import moment from 'moment';
import { DatePicker, Select, Spin } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Text from '../../../../components/Text';
import TableDocumentAssets from './TableDocumentAssets';
import { DocumentContext } from '../DocumentAssetsContext';
import { fetchsDocumentAsset, fetchsDocumentAssetFilter } from '../service/_actionDocumentAssets';
import Panigation from '../../../../../@fuse/core/FusePanigate';
import { fetchsBookingFilter } from '../../../booking/manageBooking/_reduxBooking/bookingActions';

const { RangePicker } = DatePicker;

const typeArr = [
	{ label: 'Cấp phát', value: 2 },
	{ label: 'Thu hồi', value: 7 }
];
export default function DocumentAssetsPage() {
	const dispatch = useDispatch();
	const documentContex = useContext(DocumentContext);
	const { setFromDate, setToDate, setType, rowPage, page, fromDate, toDate, setPage, setRowPage, type } =
		documentContex;
	const { currentState } = useSelector(state => ({ currentState: state.documentAsset }), shallowEqual);
	const { entities, listLoading, actionLoading, total_count } = currentState;
	const handleChange = (date, dateString) => {
		setFromDate(date && moment(date[0]).format('YYYY/MM/DD'));
		setToDate(date && moment(date[1]).format('YYYY/MM/DD'));
		dispatch(
			fetchsDocumentAssetFilter(
				rowPage,
				page,
				date && moment(date[0]).format('YYYY/MM/DD'),
				date && moment(date[1]).format('YYYY/MM/DD'),
				type
			)
		);
	};
	const handleChangeType = value => {
		setType(value);
		dispatch(fetchsDocumentAssetFilter(rowPage, page, fromDate, toDate, value));
	};
	useEffect(() => {
		dispatch(fetchsDocumentAsset());
	}, [dispatch]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(fetchsDocumentAssetFilter(rowPage, newPage + 1, fromDate, toDate, type));
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(fetchsDocumentAssetFilter(rowPageParse, page, fromDate, toDate, type));
	};
	return (
		<div className="container assets">
			<div className="assets__header px-16">
				<Text color="primary" type="title">
					Quản lý biên bản
				</Text>
			</div>
			<div className="mr-24 flex justify-end mt-16">
				<div className="form-item-input mr-16">
					<Select
						allowClear
						placeholder="Cấp phát/thu hồi"
						onChange={handleChangeType}
						style={{ width: '200px' }}
					>
						{typeArr.map(p => (
							<Select.Option key={p.value} value={p.value}>
								{p.label}
							</Select.Option>
						))}
					</Select>
				</div>
				<RangePicker
					className="mr-16"
					defaultValue={[moment().startOf('month'), moment().endOf('month')]}
					format="DD/MM/YYYY"
					onChange={handleChange}
				/>
			</div>
			<div className="assets__Tab px-16 mt-16">
				<div className="table--tab">
					<TableDocumentAssets entities={entities} />
					{entities?.length !== 0 && (
						<div className="flex flex-row items-center justify-end">
							{actionLoading && <Spin />}
							<Panigation
								page={page}
								handleChangePage={handleChangePage}
								rowPage={rowPage}
								handleChangeRowsPerPage={handleRowPage}
								count={total_count}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
