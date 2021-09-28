import { Button } from '@material-ui/core';
import Search from 'antd/lib/input/Search';
import React, { useContext, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Text from 'app/components/Text';
import { Spin } from 'antd';
import Panigation from '@fuse/core/FusePanigate';
import {
	fetchResouceBooking,
	fetchResouceBookingFilter,
	setTaskEditResource
} from '../_reduxResourceBooking/resourceBookingActions';
import TableResource from './component/TableResource';
import { ResourceContext } from '../resourceContext';

export default function ResourcePage() {
	const history = useHistory();
	const dispatch = useDispatch();
	const resourceGroupContext = useContext(ResourceContext);
	const { page, rowPage, setPage, sort, search, setRowPage, setSort, setSearch } = resourceGroupContext;
	const { currentState } = useSelector(state => ({ currentState: state.booking.resource }), shallowEqual);
	const handleChangeRoute = () => {
		dispatch(setTaskEditResource(null));
		history.push('/booking/resource/modify-resource/create');
	};
	const { entities, listLoading, actionLoading, total_count } = currentState;
	useEffect(() => {
		dispatch(fetchResouceBooking());
	}, [dispatch]);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(fetchResouceBookingFilter(rowPage, newPage + 1, sort.id, sort.direction, search));
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(fetchResouceBookingFilter(rowPageParse, page, sort.id, sort.direction, search));
	};
	const handleSearch = () => {
		setPage(0);
		dispatch(fetchResouceBookingFilter(rowPage, page, sort.id, sort.direction, search));
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		setPage(0);
		if (e.target.value.length <= 0) {
			dispatch(fetchResouceBookingFilter(rowPage, page, sort.id, sort.direction, e.target.value));
		}
	};
	const createSortHandler = (direction, id) => {
		dispatch(fetchResouceBookingFilter(rowPage, page, id, direction));
		setSort({
			direction,
			id
		});
	};
	return (
		<div className="container resource">
			<div className="resource__header px-16 shadow-lg">
				<Text color="primary" type="title">
					{' '}
					Resource{' '}
				</Text>
				<div className="resource__header--action">
					<Search
						onSearch={handleSearch}
						onChange={onHandleChange}
						className="input__search"
						placeholder="Search"
					/>
					<Button onClick={handleChangeRoute} className="button__create" variant="contained" color="primary">
						{' '}
						<Text type="button" color="white">
							{' '}
							Create{' '}
						</Text>
					</Button>
				</div>
			</div>
			<div className="resource__content mt-8">
				<div className="resource__content--table px-16">
					<TableResource
						createSortHandler={createSortHandler}
						listLoading={listLoading}
						entities={entities}
					/>
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
