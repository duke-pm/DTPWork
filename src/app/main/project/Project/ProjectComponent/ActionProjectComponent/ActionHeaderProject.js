import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Button, IconButton, InputBase, ListItemText, MenuItem, Paper, Grid } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { Popover, Select } from 'antd';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import FilterListIcon from '@material-ui/icons/FilterList';
import Text from 'app/components/Text';
import { ProjectContext } from '../../ProjectContext';
import { setTaskEditProject, fetchProjectDetailFilter, getTaskDetailAll } from '../../../_redux/_projectActions';
import ModalListControlFilter from './ModalListControlFilter';

export default function ActionHeaderProject({ classes, sectorArr, ArrProjectStatus, owner, params, project }) {
	const dispatch = useDispatch();
	const projectContext = useContext(ProjectContext);
	const {
		setFormProject,
		search,
		setSearch,
		formProject,
		setGantt,
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
	const [openFilter, setOpenFilter] = useState(false);
	const handleCloseFilter = () => setOpenFilter(false);
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
		dispatch(getTaskDetailAll(params.detail, ownerFilter, status, sector, search));
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
			dispatch(getTaskDetailAll(params.detail, ownerFilter, status, sector, e.target.value));
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
		dispatch(getTaskDetailAll(params.detail, ownerFilter, status, sector, search));
	};
	return (
		<div>
			<ModalListControlFilter
				handleFilter={handleFilter}
				onHandleChangeOwner={onHandleChangeOwner}
				owner={owner}
				handleCloseFilter={handleCloseFilter}
				onHandleChangeStatus={onHandleChangeStatus}
				ArrProjectStatus={ArrProjectStatus}
				onHandleChangeSector={onHandleChangeSector}
				sectorArr={sectorArr}
				openFilter={openFilter}
				sector={sector}
				ownerFilter={ownerFilter}
				status={status}
			/>
			<FuseAnimateGroup
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				<div className="flex flex-col sm:flex-row justify-between">
					<Text type="subTitle">Filter </Text>
				</div>
				<Grid className="mb-16" container spacing={2}>
					<Grid item xs={12} sm={6} md={6} lg={2}>
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
					<Grid item xs={12} sm={6} md={6} lg={2}>
						<Paper>
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
					<Grid item xs={12} sm={6} md={6} lg={2}>
						<Paper>
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
					<Grid item xs={12} sm={6} md={6} lg={6}>
						<Button
							onClick={handleFilter}
							variant="contained"
							type="button"
							color="primary"
							startIcon={<FilterListIcon />}
						>
							<Text type="button">Filter</Text>
						</Button>
						<Button
							onClick={handleOpenGant}
							variant="contained"
							type="button"
							color="primary"
							className="ml-16"
							startIcon={<EqualizerIcon />}
						>
							<Text type="button">Gantt chart</Text>
						</Button>
					</Grid>
				</Grid>
				<div className="flex sm:flex-row flex-col-reverse justify-between">
					<div className="flex flex-row justify-between">
						{/* <IconButton onClick={handleOpenFilter} className={clsx('sm:hidden block')}>
							{' '}
							<FilterListIcon />{' '}
						</IconButton> */}
						{/* <Button
							onClick={handleOpenGant}
							className="sm:hidden inline-flex "
							variant="contained"
							color="primary"
							startIcon={<EqualizerIcon />}
						>
							Gantt chart
						</Button>{' '} */}
						{project?.isProjectOwner && (
							<Popover
								d={!project?.isProjectOwner}
								overlayStyle={{ zIndex: '19', display: formProject.open ? 'none' : '' }}
								placement="rightTop"
								content={() => (
									<>
										<MenuItem onClick={() => handleOpenFormProject('Task')} role="button">
											<ListItemText style={{ color: '#007AFF' }} primary="TASK" />
										</MenuItem>
										<MenuItem onClick={() => handleOpenFormProject('Miltestone')} role="button">
											<ListItemText style={{ color: '#34C759' }} primary="MILESTONE" />
										</MenuItem>
										<MenuItem onClick={() => handleOpenFormProject('Phase')} role="button">
											<ListItemText style={{ color: '#FF9500' }} primary="PHASE" />
										</MenuItem>
									</>
								)}
							>
								<Button
									className="mt-8 sm:mt-0 mb-8 sm:mb-0 h-26 max-w-160 "
									variant="contained"
									color="primary"
									startIcon={<AddCircleOutline />}
								>
									Create
								</Button>
							</Popover>
						)}
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
