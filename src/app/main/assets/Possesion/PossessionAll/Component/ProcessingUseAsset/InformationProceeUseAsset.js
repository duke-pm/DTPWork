import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import { useDispatch } from 'react-redux';
import image from '@fuse/assets/group.png';
import { TableContainer, Paper, Table, Grid, Typography } from '@material-ui/core';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Spin } from 'antd';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import Text from 'app/components/Text';
import * as actions from '../../../_redux/possesionActions';
import TableHeaderProcessing from './TableProcessingUseAsset/TableHeaderProcessing';
import TableBodyProcessing from './TableProcessingUseAsset/TableBodyProcessing';

export default function InformationProceeUseAsset({ entitiesEdit, actionLoading }) {
	const dispatch = useDispatch();
	const classes = DtpCustomStyles();
	const [history, setHistory] = useState([]);
	useEffect(() => {
		dispatch(actions.getAssetHistory(entitiesEdit?.assetID)).then(data => {
			setHistory(data?.data.listTransHistory);
		});
	}, [dispatch, entitiesEdit?.assetID]);
	return (
		<>
			<div className="px-16 sm:px-24">
				<div>
					<Text type="subTitle" color="primary" borderBottom>
						THÔNG TIN TÀI SẢN.
					</Text>
				</div>
				<Grid container item spacing={2} className="mb-16">
					<Grid item xs={5} md={4} lg={3}>
						<Text type="body">Mã tài sản:</Text>
					</Grid>
					<Grid item xs={7} md={8} lg={9}>
						<Text type="body">{entitiesEdit?.assetCode}</Text>
					</Grid>
					<Grid item xs={5} md={4} lg={3}>
						<Text type="body">Tên tài sản:</Text>
					</Grid>
					<Grid item xs={7} md={8} lg={9}>
						<Text variant="body1">{entitiesEdit?.assetName}</Text>
					</Grid>
					<Grid item xs={5} md={4} lg={3}>
						<Text type="body">Nhóm tài sản:</Text>
					</Grid>
					<Grid item xs={7} md={8} lg={9}>
						<Text variant="body1">{entitiesEdit?.groupName}</Text>
					</Grid>
					<Grid item xs={5} md={4} lg={3}>
						<Text type="body">Mô tả:</Text>
					</Grid>
					<Grid item xs={7} md={8} lg={9}>
						<Text type="body">{entitiesEdit?.descr}</Text>
					</Grid>
					<Grid item xs={5} md={4} lg={3}>
						<Text type="body">Ngày mua:</Text>
					</Grid>
					<Grid item xs={7} md={8} lg={9}>
						<Text type="body">
							{entitiesEdit?.purchaseDate ? moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY') : ''}
						</Text>
					</Grid>
					<Grid item xs={5} md={4} lg={3}>
						<Text type="body">Nguyên giá:</Text>
					</Grid>
					<Grid item xs={7} md={8} lg={9}>
						<Text type="body">{entitiesEdit && currencyFormat(entitiesEdit.originalPrice)}</Text>
					</Grid>
					<Grid item xs={5} md={4} lg={3}>
						<Text type="body">Tình trạng:</Text>
					</Grid>
					<Grid item xs={7} md={8} lg={9}>
						<Text type="body">{entitiesEdit?.statusName}</Text>
					</Grid>
				</Grid>
			</div>
			<div className="px-16 sm:px-24">
				<div>
					<Text color="primary" type="subTitle" borderBottom>
						QUÁ TRÌNH SỬ DỤNG.
					</Text>
					{actionLoading && <Spin className="mr-18" />}
				</div>
				<div className="table-form">
					<TableBodyProcessing history={history} />
				</div>
			</div>
		</>
	);
}
