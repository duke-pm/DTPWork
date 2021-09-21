import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import React from 'react';
import * as moment from 'moment';
import { Grid, Typography } from '@material-ui/core';

export default function ContentForm({ entitiesEdit }) {
	return (
		<Grid alignItems="flex-start" container item spacing={2}>
			<Grid item xs={6} md={6} lg={4}>
				<Typography variant="subtitle2">Mã tài sản</Typography>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Typography variant="body1">{entitiesEdit?.assetCode}</Typography>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Typography variant="subtitle2">Tên tài sản</Typography>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Typography variant="body1">{entitiesEdit?.assetName}</Typography>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Typography variant="subtitle2">Nhóm tài sản</Typography>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Typography variant="body1">{entitiesEdit?.groupName}</Typography>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Typography variant="subtitle2">Mô tả</Typography>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Typography variant="body1">{entitiesEdit?.descr}</Typography>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Typography variant="subtitle2">Ngày mua</Typography>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Typography variant="body1">
					{entitiesEdit?.purchaseDate ? moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY') : ''}
				</Typography>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Typography variant="subtitle2">Nguyên giá</Typography>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Typography variant="body1">{entitiesEdit && currencyFormat(entitiesEdit.originalPrice)}</Typography>
			</Grid>
			<Grid item xs={6} md={6} lg={4}>
				<Typography variant="subtitle2">Tình trạng</Typography>
			</Grid>
			<Grid item xs={6} md={6} lg={8}>
				<Typography variant="body1">Chưa sử dụng</Typography>
			</Grid>
		</Grid>
	);
}
