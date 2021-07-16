import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Button, IconButton, InputBase, Paper, Typography, Grid } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { DatePicker, Select } from 'antd';
import * as moment from 'moment';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { ProjectContext } from '../../ProjectContext';
import { setTaskEditProject, fetchsProjectFilter } from '../../../_redux/_projectActions';
import ModalListControlFilter from './ModalListControlFilter';

export default function ActionHeaderProject({ classes, ArrProjectStatus, owner }) {
	const dispatch = useDispatch();
	const projectContext = useContext(ProjectContext);
	const {
		setFormProject,
		search,
		setSearch,
		dateStart,
		setDateStart,
		ownerFilter,
		setOwnerFilter,
		status,
		setStatus,
		page,
		rowPage
	} = projectContext;
	const handleOpenFormProject = () => {
		setFormProject(true);
		dispatch(setTaskEditProject());
	};
	const [openFilter, setOpenFilter] = useState(false);
	const handleOpenFilter = () => setOpenFilter(true);
	const handleCloseFilter = () => setOpenFilter(false);
	const handleSearch = () => {
		dispatch(fetchsProjectFilter(rowPage, page, status, ownerFilter, dateStart, search));
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		if (e.target.value.length <= 0) {
			dispatch(fetchsProjectFilter(rowPage, page, status, ownerFilter, dateStart, e.target.value));
		}
	};
	const handleChangeFilterDateStart = (date, dateString) => setDateStart(dateString);
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
	const handleFilter = () => {
		dispatch(fetchsProjectFilter(rowPage, page, status, ownerFilter, dateStart, search));
	};
	return (
		<div>
			<ModalListControlFilter
				onHandleChangeOwner={onHandleChangeOwner}
				owner={owner}
				handleChangeFilterDateStart={handleChangeFilterDateStart}
				onHandleChangeStatus={onHandleChangeStatus}
				ArrProjectStatus={ArrProjectStatus}
				handleFilter={handleFilter}
				openFilter={openFilter}
				status={status}
				ownerFilter={ownerFilter}
				dateStart={dateStart}
				handleCloseFilter={handleCloseFilter}
			/>
			<FuseAnimateGroup
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				<div className="flex flex-col sm:flex-row justify-between">
					<Typography variant="h6">Filter</Typography>
				</div>
				<Grid className="mb-16" container spacing={2}>
					<Grid item xs={12} sm={6} md={2} lg={2}>
						<Paper className="flex justify-between">
							<DatePicker
								onChange={handleChangeFilterDateStart}
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
					<Grid item xs={12} sm={6} md={2} lg={4}>
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
				<div className="flex flex-row justify-between items-center">
					<div className="flex flex-row justify-between">
						{/* <IconButton onClick={handleOpenFilter} className={clsx('sm:hidden block')}>
							{' '}
							<FilterListIcon />{' '}
						</IconButton> */}
						<Button
							onClick={handleOpenFormProject}
							className="sm:mb-0 mb-9 mt-8 sm:mt-0 max-w-sm md:max-w-lg h-26"
							variant="contained"
							color="primary"
							startIcon={<AddCircleOutline />}
						>
							<Typography variant="inherit">Project</Typography>
						</Button>
					</div>
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
