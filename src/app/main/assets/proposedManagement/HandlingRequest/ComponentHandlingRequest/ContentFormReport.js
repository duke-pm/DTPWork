import React from 'react';
import * as moment from 'moment';
import { Grid } from '@material-ui/core';
import Text from 'app/components/Text';

export default function ContentFormReport({ entitiesEdit, classes }) {
	return (
		<Grid container item spacing={2}>
			<Grid item xs={12} md={12} lg={12}>
				<Text type="subTitle" color="primary" borderBottom>
					THÔNG TIN TÀI SẢN
				</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text>Mã tài sản:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text type="subTitle">{entitiesEdit?.assetCode ? entitiesEdit.assetCode : '-'}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text>Tên tài sản:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text type="subTitle">{entitiesEdit?.assetName ? entitiesEdit.assetName : '-'}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text>Nhóm tài sản:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text type="subTitle">{entitiesEdit?.groupName ? entitiesEdit.assetGroupName : '-'}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text>Ngày mua:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text type="subTitle">
					{entitiesEdit?.purchaseDate ? moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY') : '-'}
				</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text>Tình trạng:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text type="subTitle">{entitiesEdit?.statusName ? entitiesEdit.statusName : '-'}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text>Mô tả:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text type="subTitle">{entitiesEdit?.descr ? entitiesEdit.descr : '-'}</Text>
			</Grid>
		</Grid>
	);
}
