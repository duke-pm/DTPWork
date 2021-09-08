import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Button, Typography, Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { DatePicker, Select } from 'antd';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ProjectOverviewContext } from '../../ProjectOverviewContext';
import { fetchsProjectOverviewFilter } from '../../../_redux/_projectActions';

export default function ActionHeaderProject({ classes, ArrProjectStatus, owner, sectorArr }) {
	const dispatch = useDispatch();
	const projectContext = useContext(ProjectOverviewContext);
	const {
		search,
		dateStart,
		setDateStart,
		setDateEnd,
		dateEnd,
		ownerFilter,
		setSector,
		sector,
		setOwnerFilter,
		status,
		setStatus,
		page,
		rowPage,
		year,
		setYear
	} = projectContext;
	const handleChangeFilterYear = (date, dateString) => setYear(dateString);
	const handleChangeFilterDateStart = (date, dateString) => setDateStart(dateString);
	const handleChangeFilterDateEnd = (date, dateString) => setDateEnd(dateString);
	const onHandleChangeOwner = value => {
		if (value.length > 0) {
			setOwnerFilter(value.toString());
		} else {
			setOwnerFilter(value);
		}
	};
	const onHandleChangeStatus = value => {
		if (value.length > 0) {
			setStatus(value.toString());
		} else {
			setStatus(value);
		}
	};
	const onHandleChangeSector = value => setSector(value);
	const handleFilter = () => {
		dispatch(
			fetchsProjectOverviewFilter(rowPage, page, year, ownerFilter, sector, status, dateStart, dateEnd, search)
		);
	};
	return (
		<div>
			<FuseAnimateGroup
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				<div className="flex flex-col sm:flex-row justify-between">
					<Typography variant="subtitle2">Filter </Typography>
				</div>
				<Grid className="mb-16 control-filter" container spacing={2}>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<DatePicker
							onChange={handleChangeFilterYear}
							// defaultValue={moment()}
							picker="year"
							format="YYYY"
							placeholder="Select Year"
							style={{ width: '100%' }}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Select
							placeholder="Owner"
							showSearch
							mode="multiple"
							allowClear
							maxTagCount={1}
							onChange={onHandleChangeOwner}
							bordered={false}
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
							style={{ width: '100%' }}
						>
							{owner?.map(item => (
								<Select.Option value={item.value} key={item.value}>
									{item.label}
								</Select.Option>
							))}
						</Select>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Select
							allowClear
							placeholder="Status"
							mode="multiple"
							maxTagCount={1}
							onChange={onHandleChangeStatus}
							bordered={false}
							style={{ width: '100%' }}
						>
							{ArrProjectStatus?.map(item => (
								<Select.Option value={item.value} key={item.value}>
									<p style={{ color: item.colorCode }}> {item.label} </p>
								</Select.Option>
							))}
						</Select>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Select
							allowClear
							placeholder="Sector"
							onChange={onHandleChangeSector}
							bordered={false}
							style={{ width: '100%' }}
						>
							{sectorArr?.map(item => (
								<Select.Option value={item.value} key={item.value}>
									<p> {item.label} </p>
								</Select.Option>
							))}
						</Select>
					</Grid>
					{/* <Hidden mdDown>
						<Grid item lg={3} />
					</Hidden> */}
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<DatePicker
							onChange={handleChangeFilterDateStart}
							format="DD/MM/YYYY"
							placeholder="Date start"
							style={{ width: '100%' }}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<DatePicker
							onChange={handleChangeFilterDateEnd}
							format="DD/MM/YYYY"
							placeholder="Date end"
							style={{ width: '100%' }}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={2} lg={3}>
						<Button
							onClick={handleFilter}
							variant="contained"
							type="button"
							color="primary"
							className="sm:mb-0 mb-9"
							startIcon={<FilterListIcon />}
						>
							<Typography variant="inherit">Filter</Typography>
						</Button>
					</Grid>
				</Grid>
			</FuseAnimateGroup>
		</div>
	);
}
