import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import React from 'react';
import * as moment from 'moment';
import { Grid, Typography } from '@material-ui/core';
import Text from 'app/components/Text';

export default function ContentForm({ entitiesEdit }) {
	return (
		<Grid alignItems="flex-start" container item spacing={2}>
			<Grid item xs={6} md={6} lg={4}>
				<Text type="body">Mã tài sản:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text type="body">{entitiesEdit?.assetCode}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text type="body">Tên tài sản:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text type="body">{entitiesEdit?.assetName}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text type="body">Nhóm tài sản:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text type="body">{entitiesEdit?.groupName}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text type="body">Mô tả:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text type="body">{entitiesEdit?.descr}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text type="body">Ngày mua:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text type="body">
					{entitiesEdit?.purchaseDate ? moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY') : ''}
				</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text type="body">Nguyên giá:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text type="body">{entitiesEdit && currencyFormat(entitiesEdit.originalPrice)}</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Text type="body">Tình trạng:</Text>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Text type="body">Chưa sử dụng:</Text>
			</Grid>
		</Grid>
	);
}
