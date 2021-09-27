/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { sliceString } from '@fuse/core/DtpConfig';
import { Grid, Icon } from '@material-ui/core';
import { Avatar } from 'antd';
import Text from 'app/components/Text';
import React from 'react';

export default function index({ entitiesEdit }) {
	return (
		<Grid container item spacing={2}>
			<Grid className="mb-20" item lg={12}>
				<Text borderBottom type="subTitle" color="primary">
					{' '}
					INFORMATION{' '}
				</Text>
			</Grid>
			<Grid item lg={6}>
				<Text type="body"> Group Code :</Text>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<Text type="body"> {entitiesEdit?.groupID}</Text>
			</Grid>
			<Grid item lg={6}>
				<Text type="body"> Name :</Text>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<Text type="body">{entitiesEdit?.groupName}</Text>
			</Grid>
			<Grid item lg={6}>
				<Text type="body"> Description :</Text>
			</Grid>
			<Grid item lg={6}>
				{' '}
				<Text type="body"> {entitiesEdit?.descr ? entitiesEdit.descr : '-'}</Text>
			</Grid>
			<Grid item lg={6}>
				<Text type="body"> Resource group icons :</Text>
			</Grid>
			<Grid item lg={6}>
				<Icon fontSize="small" color="primary">
					{' '}
					{entitiesEdit?.icon}
				</Icon>
			</Grid>
			{/* <Grid item lg={6}>
				<Text type="body" >
					{' '}
					Recurrence :
				</Text>
			</Grid>
			<Grid item lg={6}>
				<Text type="body"> Không</Text>
			</Grid> */}
			{/* <Grid item lg={6}>
				<Text type="body" >
					{' '}
					Extra services :
				</Text>
			</Grid> */}
			{/* <Grid item lg={6}>
				<Text type="body"  />
			</Grid> */}
			<Grid item lg={6}>
				<Text type="body"> Created by :</Text>
			</Grid>
			<Grid item lg={6}>
				<div className="flex items-center">
					<Avatar size="small" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
						{entitiesEdit && sliceString(entitiesEdit?.crtdName)}
					</Avatar>{' '}
					<Text className="ml-8" type="body">
						{entitiesEdit?.crtdName}
					</Text>
				</div>
			</Grid>
			<Grid item lg={6}>
				<Text type="body"> Date of creation :</Text>
			</Grid>
			<Grid item lg={6}>
				<Text type="body">-</Text>
			</Grid>
			<Grid item lg={6}>
				<Text type="body"> Last modified :</Text>
			</Grid>
			<Grid item lg={6}>
				<Text type="body">{entitiesEdit?.strCrtdDate}</Text>
			</Grid>
			{/* <Grid item lg={12}>
				<Text type="body" className="title__view" >
					Approval process
				</Text>
			</Grid> */}
			{/* <Grid item lg={6}>
				<Text type="body" >
					{' '}
					Approval process :
				</Text>
			</Grid> */}
			{/* <Grid item lg={6}>
				<Text type="body">Booking created - Complete</Text>
			</Grid> */}
			{/* <Grid item lg={12}>
				<Text type="body" className="title__view" >
					Notifications
				</Text>
			</Grid> */}
			{/* <Grid item lg={6}>
				<Text type="body" >
					{' '}
					Notification scenario :
				</Text>
			</Grid> */}
			{/* <Grid item lg={6}>
				<Text type="body">Kịch bản thông báo mặc định</Text>
			</Grid> */}
			{/* <Grid item lg={12}>
				<Text type="body" className="title__view" >
					Authorization
				</Text>
			</Grid> */}
			{/* <Grid item lg={6}>
				<Text type="body" >
					{' '}
					Department :
				</Text>
			</Grid>
			<Grid item lg={6}>
				<Tag>DTP</Tag>
			</Grid> */}
		</Grid>
	);
}
