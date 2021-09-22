import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import React from 'react';
import * as moment from 'moment';
import { Grid } from '@material-ui/core';
import Text from 'app/components/Text';

export default function ContentForm({ entitiesEdit }) {
	return (
		<Grid alignItems="flex-start" container spacing={2}>
			<Grid item xs={6} md={6} lg={4}>
				<Text>Mã tài sản:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text>{entitiesEdit?.assetCode ? entitiesEdit.assetCode : '-'}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text>Tên tài sản:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text>{entitiesEdit?.assetName ? entitiesEdit.assetName : '-'}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text>Nhóm tài sản:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text>{entitiesEdit?.groupName ? entitiesEdit.groupName : '-'}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text>Mô tả:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text>{entitiesEdit?.descr ? entitiesEdit.descr : '-'}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text>Ngày mua:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text>{entitiesEdit?.purchaseDate ? moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY') : ''}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text>Nguyên giá:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text>{entitiesEdit && currencyFormat(entitiesEdit.originalPrice)}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text>Tình trạng:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text>Chưa sử dụng:</Text>
			</Grid>
		</Grid>
	);
}
