import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Button, IconButton, InputBase, Paper, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { DatePicker, Select } from 'antd';
import * as moment from 'moment';
import FilterListIcon from '@material-ui/icons/FilterList';
import { badgeStatus } from 'app/main/project/Project/ProjectComponent/TableProject/ConfigTableProject';
import { ProjectContext } from '../../ProjectContext';
import { setTaskEditProject, fetchsProjectFilter } from '../../../_redux/_projectActions';

export default function ActionHeaderProject({ classes, sectorArr, ArrProjectStatus, owner }) {
	const dispatch = useDispatch();
	const projectContext = useContext(ProjectContext);
	const {
		setFormProject,
		search,
		setSearch,
		dateStart,
		setDateStart,
		dateEnd,
		setDateEnd,
		ownerFilter,
		setOwnerFilter,
		status,
		setStatus,
		sector,
		setSector,
		page,
		rowPage
	} = projectContext;
	const handleOpenFormProject = () => {
		setFormProject(true);
		dispatch(setTaskEditProject());
	};
	const handleSearch = () => {
		dispatch(fetchsProjectFilter(search));
	};
	const onHandleChange = e => {
		setSearch(e.target.value);

		if (e.target.value.length <= 0) {
			dispatch(fetchsProjectFilter(e.target.value));
		}
	};
	const handleChangeFilterDateStart = (date, dateString) => setDateStart(dateString);
	const handleChangeFilterDateEnd = (date, dateString) => setDateEnd(dateString);
	const onHandleChangeOwner = value => setOwnerFilter(value);
	const onHandleChangeStatus = value => setStatus(value);
	const onHandleChangeSector = value => setSector(value);
	const handleFilter = () => {
		console.log({ rowPage, page, dateStart, dateEnd, ownerFilter, status, sector });
	};
	return (
		<div>
			<FuseAnimateGroup
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				<div className="flex flex-col sm:flex-row justify-between">
					<Typography variant="subtitle1" color="inherit">
						Filter
					</Typography>
				</div>
				<div className="flex flex-col sm:flex-row mb-16">
					<Paper className="w-full sm:w-1/4 flex justify-between">
						<DatePicker
							onChange={handleChangeFilterDateStart}
							defaultValue={moment()}
							picker="year"
							format="YYYY"
							placeholder="Year start"
							style={{ width: '100%' }}
						/>
						<DatePicker
							picker="year"
							onChange={handleChangeFilterDateEnd}
							defaultValue={moment().add(5, 'year')}
							format="YYYY"
							placeholder="Ngày kết thúc"
							style={{ width: '100%' }}
						/>
					</Paper>
					<Paper style={{ width: '180px' }} className="ml-16 sm:mb-0 mb-9">
						<Select
							placeholder="Owner"
							onChange={onHandleChangeOwner}
							bordered={false}
							style={{ width: '100%' }}
						>
							{owner &&
								owner.map(item => (
									<Select.Option value={item.value} key={item.value}>
										{item.label}
									</Select.Option>
								))}
						</Select>
					</Paper>
					<Paper style={{ width: '180px' }} className="ml-16 sm:mb-0 mb-9">
						<Select
							placeholder="Status"
							onChange={onHandleChangeStatus}
							bordered={false}
							style={{ width: '100%' }}
						>
							{ArrProjectStatus &&
								ArrProjectStatus.map(item => (
									<Select.Option value={item.value} key={item.value}>
										<p style={{ color: badgeStatus[item.value] }}> {item.label} </p>
									</Select.Option>
								))}
						</Select>
					</Paper>
					<Paper style={{ width: '180px' }} className="ml-16 sm:mb-0 mb-9">
						<Select
							placeholder="Sector"
							onChange={onHandleChangeSector}
							bordered={false}
							style={{ width: '100%' }}
						>
							{sectorArr &&
								sectorArr.map(item => (
									<Select.Option value={item.value} key={item.value}>
										<p> {item.label} </p>
									</Select.Option>
								))}
						</Select>
					</Paper>
					<Button
						onClick={handleFilter}
						variant="contained"
						type="button"
						color="primary"
						className="ml-16 sm:mb-0 mb-9"
						startIcon={<FilterListIcon />}
					>
						{' '}
						Filter{' '}
					</Button>
				</div>
				<div className="flex flex-col sm:flex-row justify-between">
					<Button
						onClick={handleOpenFormProject}
						className="mt-8 sm:mt-0 max-w-sm md:max-w-lg h-26"
						variant="contained"
						color="primary"
					>
						<svg
							className="h-16 w-16"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Project
					</Button>{' '}
					<Paper className="w-full sm:w-1/4 flex justify-between ">
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
