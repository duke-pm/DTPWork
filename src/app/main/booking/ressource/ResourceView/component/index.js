/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Grid, Typography } from '@material-ui/core';
import { Avatar } from 'antd';
import React from 'react';

export default function index() {
	return (
		<Grid container item spacing={2}>
			<Grid className="mb-20" item lg={12}>
				<Typography variant="subtitle2" className="title__view" color="primary">
					{' '}
					Information{' '}
				</Typography>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Resource code :
				</Typography>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<Typography variant="body2"> BKRS-1</Typography>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Name :
				</Typography>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<Typography variant="body2"> Phòng họp</Typography>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Description :
				</Typography>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<Typography variant="body2"> Meeting room 303</Typography>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Colors :
				</Typography>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<div className="resource__radio" style={{ backgroundColor: '#006565' }} />
			</Grid>
			{/* <Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Recurrence :
				</Typography>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="body2"> Không</Typography>
			</Grid> */}
			{/* <Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Extra services :
				</Typography>
			</Grid> */}
			{/* <Grid item lg={6}>
				<Typography variant="body2" color="primary" />
			</Grid> */}
			<Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Created by :
				</Typography>
			</Grid>
			<Grid item lg={6}>
				<div className="flex items-center">
					<Avatar size="small" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
						L
					</Avatar>{' '}
					<Typography className="ml-8" variant="body2">
						The Linh
					</Typography>
				</div>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Date of creation :
				</Typography>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="body2">25/08/2021 14:03</Typography>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Last modified :
				</Typography>
			</Grid>
			<Grid item lg={6}>
				<Typography variant="body2">25/08/2021 14:03</Typography>
			</Grid>
			{/* <Grid item lg={12}>
				<Typography variant="subtitle2" className="title__view" color="primary">
					Approval process
				</Typography>
			</Grid> */}
			{/* <Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Approval process :
				</Typography>
			</Grid> */}
			{/* <Grid item lg={6}>
				<Typography variant="body2">Booking created - Complete</Typography>
			</Grid> */}
			{/* <Grid item lg={12}>
				<Typography variant="subtitle2" className="title__view" color="primary">
					Notifications
				</Typography>
			</Grid> */}
			{/* <Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Notification scenario :
				</Typography>
			</Grid> */}
			{/* <Grid item lg={6}>
				<Typography variant="body2">Kịch bản thông báo mặc định</Typography>
			</Grid> */}
			{/* <Grid item lg={12}>
				<Typography variant="subtitle2" className="title__view" color="primary">
					Authorization
				</Typography>
			</Grid> */}
			{/* <Grid item lg={6}>
				<Typography variant="subtitle2" color="primary">
					{' '}
					Department :
				</Typography>
			</Grid>
			<Grid item lg={6}>
				<Tag>DTP</Tag>
			</Grid> */}
		</Grid>
	);
}
