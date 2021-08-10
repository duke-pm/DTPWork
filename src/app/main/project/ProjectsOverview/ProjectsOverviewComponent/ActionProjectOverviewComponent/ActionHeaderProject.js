import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Button, IconButton, InputBase, Paper, Typography, Grid, Hidden } from '@material-ui/core';
import React, { useContext } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { DatePicker, Select } from 'antd';
import * as moment from 'moment';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ProjectOverviewContext } from '../../ProjectOverviewContext';
import { fetchsProjectOverviewFilter } from '../../../_redux/_projectActions';

export default function ActionHeaderProject({ classes, ArrProjectStatus, owner, sectorArr }) {
	const dispatch = useDispatch();
	const projectContext = useContext(ProjectOverviewContext);
	const {
		search,
		setSearch,
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
	const handleSearch = () => {
		dispatch(
			fetchsProjectOverviewFilter(rowPage, page, year, ownerFilter, sector, status, dateStart, dateEnd, search)
		);
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		if (e.target.value.length <= 0) {
			dispatch(
				fetchsProjectOverviewFilter(
					rowPage,
					page,
					year,
					ownerFilter,
					sector,
					status,
					dateStart,
					dateEnd,
					e.target.value
				)
			);
		}
	};
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
				<Grid className="mb-16" container spacing={2}>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Paper className="flex justify-between">
							<DatePicker
								onChange={handleChangeFilterYear}
								defaultValue={moment()}
								picker="year"
								format="YYYY"
								placeholder="Year start"
								style={{ width: '100%' }}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Paper className="sm:mb-0 mb-9">
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
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Paper className="sm:mb-0 mb-9">
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
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Paper>
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
						</Paper>
					</Grid>
					{/* <Hidden mdDown>
						<Grid item lg={3} />
					</Hidden> */}
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Paper>
							<DatePicker
								onChange={handleChangeFilterDateStart}
								format="DD/MM/YYYY"
								placeholder="Date start"
								style={{ width: '100%' }}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Paper>
							<DatePicker
								onChange={handleChangeFilterDateEnd}
								format="DD/MM/YYYY"
								placeholder="Date end"
								style={{ width: '100%' }}
							/>
						</Paper>
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
				<div className="flex sm:flex-row justify-end">
					<Paper className="flex justify-between">
						<InputBase
							onKeyPress={event => {
								if (event.key === 'Enter') {
									handleSearch();
								}
							}}
							onChange={e => onHandleChange(e)}
							className={classes.input}
							value={search}
							placeholder="Search"
							inputProps={{ 'aria-label': 'search google maps' }}
						/>
						<IconButton
							onClick={handleSearch}
							type="button"
							className={classes.iconButton}
							aria-label="search"
						>
							<SearchIcon />
						</IconButton>
					</Paper>
				</div>
			</FuseAnimateGroup>
		</div>
	);
}
