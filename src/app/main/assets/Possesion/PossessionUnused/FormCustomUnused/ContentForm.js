import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import React from 'react';
import * as moment from 'moment';
import { Grid, Typography } from '@material-ui/core';

export default function ContentForm({ entitiesEdit }) {
	return (
		<Grid alignItems="flex-start" container item spacing={2}>
			<Grid container item xs={12} sm={6} md={6} lg={6}>
				<Grid item xs={5} md={4} lg={3}>
					<Typography className="p-6 text-left truncate" variant="body1">
						Mã tài sản
					</Typography>
				</Grid>
				<Grid item xs={7} md={8} lg={9}>
					<Typography className="p-6" variant="subtitle2">
						{entitiesEdit?.assetCode}
					</Typography>
				</Grid>
				<Grid item xs={5} md={4} lg={3}>
					<Typography className="p-6 text-left truncate" variant="body1">
						Tên tài sản
					</Typography>
				</Grid>
				<Grid item xs={7} md={8} lg={9}>
					<Typography className="p-6" variant="subtitle2">
						{entitiesEdit?.assetName}
					</Typography>
				</Grid>
				<Grid item xs={5} md={4} lg={3}>
					<Typography className="p-6 text-left truncate" variant="body1">
						Nhóm tài sản
					</Typography>
				</Grid>
				<Grid item xs={7} md={8} lg={9}>
					<Typography className="p-6" variant="subtitle2">
						{entitiesEdit?.groupName}
					</Typography>
				</Grid>
				<Grid item xs={5} md={4} lg={3}>
					<Typography className="p-6 text-left truncate" variant="body1">
						Mô tả
					</Typography>
				</Grid>
				<Grid item xs={7} md={8} lg={9}>
					<Typography className="p-6" variant="subtitle2">
						{entitiesEdit?.descr}
					</Typography>
				</Grid>
			</Grid>
			<Grid container item xs={12} sm={6} md={6} lg={6}>
				<Grid item xs={5} md={4} lg={3}>
					<Typography className="p-6 text-left truncate" variant="body1">
						Ngày mua
					</Typography>
				</Grid>
				<Grid item xs={7} md={8} lg={9}>
					<Typography className="p-6" variant="subtitle2">
						{entitiesEdit?.purchaseDate ? moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY') : ''}
					</Typography>
				</Grid>
				<Grid item xs={5} md={4} lg={3}>
					<Typography className="p-6 text-left truncate" variant="body1">
						Nguyên giá
					</Typography>
				</Grid>
				<Grid item xs={7} md={8} lg={9}>
					<Typography className="p-6" variant="subtitle2">
						{entitiesEdit && currencyFormat(entitiesEdit.originalPrice)}
					</Typography>
				</Grid>
				<Grid item xs={5} md={4} lg={3}>
					<Typography className="p-6 text-left truncate" variant="body1">
						Tình trạng
					</Typography>
				</Grid>
				<Grid item xs={7} md={8} lg={9}>
					<Typography className="p-6" variant="subtitle2">
						Chưa sử dụng
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
}
