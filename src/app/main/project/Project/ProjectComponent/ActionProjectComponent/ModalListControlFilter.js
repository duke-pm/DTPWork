import {
	AppBar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	IconButton,
	Paper,
	Toolbar,
	Typography
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Select } from 'antd';

export default function ModalListControlFilter({
	onHandleChangeOwner,
	owner,
	onHandleChangeStatus,
	ArrProjectStatus,
	handleFilter,
	openFilter,
	handleCloseFilter,
	status,
	ownerFilter,
	onHandleChangeSector,
	sectorArr,
	sector
}) {
	return (
		<Dialog
			style={{ zIndex: 20 }}
			fullWidth
			maxWidth="sm"
			aria-labelledby="customized-dialog-title"
			open={openFilter}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton onClick={handleCloseFilter} edge="start" color="inherit" aria-label="close">
						<CloseIcon />
					</IconButton>
					<h5 className="font-extrabold">Filter</h5>
				</Toolbar>
			</AppBar>
			<DialogContent>
				<div className="flex flex-col">
					<Paper className="sm:mb-0 mb-9">
						<Select
							allowClear
							placeholder="Sector"
							value={sector}
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
					<Paper className="mb-16 mt-16">
						<Select
							placeholder="Owner"
							showSearch
							mode="multiple"
							allowClear
							value={ownerFilter?.length ? ownerFilter.split(',').map(Number) : []}
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
					<Paper className="mb-16">
						<Select
							allowClear
							placeholder="Status"
							mode="multiple"
							maxTagCount={1}
							value={status?.length ? status.split(',').map(Number) : []}
							onChange={onHandleChangeStatus}
							bordered={false}
							style={{ width: '100%' }}
						>
							{ArrProjectStatus &&
								ArrProjectStatus.map(item => (
									<Select.Option value={item.value} key={item.value}>
										<p style={{ color: item.colorCode }}> {item.label} </p>
									</Select.Option>
								))}
						</Select>
					</Paper>
				</div>
			</DialogContent>
			<DialogActions>
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
			</DialogActions>
		</Dialog>
	);
}
