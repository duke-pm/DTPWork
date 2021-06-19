import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Button, IconButton, InputBase, ListItemText, MenuItem, Paper, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { DatePicker, Popover, Select } from 'antd';
import AppsIcon from '@material-ui/icons/Apps';
import * as moment from 'moment';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ProjectContext } from '../../ProjectContext';
import { setTaskEditProject, fetchProjectDetailFilter } from '../../../_redux/_projectActions';
import { badgeStatus } from '../TableProject/ConfigTableProject';

export default function ActionHeaderProject({ classes, sectorArr, ArrProjectStatus, owner, params }) {
	const dispatch = useDispatch();
	const projectContext = useContext(ProjectContext);
	const {
		setFormProject,
		search,
		setSearch,
		formProject,
		setGantt,
		setDateStart,
		setOwnerFilter,
		setSector,
		sector,
		setStatus,
		rowPage,
		page,
		status,
		ownerFilter,
		dateStart
	} = projectContext;
	const handleOpenFormProject = title => {
		setFormProject({
			open: true,
			title
		});
		dispatch(setTaskEditProject(null));
	};
	const handleSearch = () => {
		dispatch(
			fetchProjectDetailFilter(params.detail, rowPage, page, ownerFilter, status, dateStart, sector, search)
		);
	};
	const onHandleChange = e => {
		setSearch(e.target.value);

		if (e.target.value.length <= 0) {
			dispatch(
				fetchProjectDetailFilter(
					params.detail,
					rowPage,
					page,
					ownerFilter,
					status,
					dateStart,
					sector,
					e.target.value
				)
			);
		}
	};
	const handleOpenGant = () => setGantt(true);
	// const handleChangeFilterDateStart = (date, dateString) => setDateStart(dateString);
	const onHandleChangeOwner = value => {
		if (value.length > 0) {
			setOwnerFilter(value.toString());
		} else {
			setOwnerFilter(value);
		}
	};
	const onHandleChangeSector = value => setSector(value);
	const onHandleChangeStatus = value => {
		if (value.length > 0) {
			setStatus(value.toString());
		} else {
			setStatus(value);
		}
	};
	const handleFilter = () => {
		dispatch(
			fetchProjectDetailFilter(params.detail, rowPage, page, ownerFilter, status, dateStart, sector, search)
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
					<Typography variant="subtitle1" color="inherit">
						Filter
					</Typography>
				</div>
				<div className="flex flex-col sm:flex-row mb-16">
					{/* <Paper style={{ width: '180px' }} className="w-full sm:w-1/4 flex justify-between">
						<DatePicker
							onChange={handleChangeFilterDateStart}
							defaultValue={moment()}
							picker="year"
							format="YYYY"
							placeholder="Year start"
							style={{ width: '100%' }}
						/>
					</Paper> */}
					<Paper style={{ width: '180px' }} className="sm:mb-0 mb-9">
						<Select
							allowClear
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
					<Paper style={{ width: '260px' }} className="ml-16 sm:mb-0 mb-9">
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
							{owner &&
								owner.map(item => (
									<Select.Option value={item.value} key={item.value}>
										{item.label}
									</Select.Option>
								))}
						</Select>
					</Paper>
					<Paper style={{ width: '250px' }} className="ml-16 sm:mb-0 mb-9">
						<Select
							allowClear
							placeholder="Status"
							mode="multiple"
							maxTagCount={1}
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
				<div>
					<div className="flex flex-col sm:flex-row justify-between ">
						<div className="flex flex-row">
							<Popover
								overlayStyle={{ zIndex: '19', display: formProject.open ? 'none' : '' }}
								placement="bottom"
								content={() => (
									<>
										<MenuItem onClick={handleOpenGant} role="button">
											<ListItemText primary="Gantt Chart" />
										</MenuItem>
									</>
								)}
								// title="Action"
							>
								<Button
									className="mt-8 sm:mt-0 max-w-sm md:max-w-lg h-26"
									variant="contained"
									color="primary"
								>
									<AppsIcon />
								</Button>{' '}
							</Popover>
							<Popover
								overlayStyle={{ zIndex: '19', display: formProject.open ? 'none' : '' }}
								placement="rightTop"
								content={() => (
									<>
										<MenuItem onClick={() => handleOpenFormProject('Task')} role="button">
											<ListItemText style={{ color: '#108ee9' }} primary="TASK" />
										</MenuItem>
										<MenuItem onClick={() => handleOpenFormProject('Miltestone')} role="button">
											<ListItemText style={{ color: '#87d068' }} primary="MILESTONE" />
										</MenuItem>
										<MenuItem onClick={() => handleOpenFormProject('Phase')} role="button">
											<ListItemText style={{ color: '#f50' }} primary="PHASE" />
										</MenuItem>
									</>
								)}
								// title="Action"
							>
								<Button
									className="mt-8 ml-16 sm:mt-0 max-w-sm md:max-w-lg h-26"
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
									Create
								</Button>{' '}
							</Popover>
						</div>
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
				</div>
			</FuseAnimateGroup>
		</div>
	);
}
