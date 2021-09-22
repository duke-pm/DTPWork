import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Spin } from 'antd';
import Text from 'app/components/Text';
import * as actions from '../../../_redux/possesionActions';
import TableBodyProcessing from './TableProcessingUseAsset/TableBodyProcessing';

export default function InformationProceeUseAsset({ entitiesEdit, actionLoading }) {
	const dispatch = useDispatch();
	const [history, setHistory] = useState([]);
	useEffect(() => {
		dispatch(actions.getAssetHistory(entitiesEdit?.assetID)).then(data => {
			setHistory(data?.data.listTransHistory);
		});
	}, [dispatch, entitiesEdit]);
	return (
		<>
			<div className="px-16 sm:px-24">
				<Text type="subTitle" color="primary" borderBottom>
					THÔNG TIN TÀI SẢN
				</Text>
				<Grid container item spacing={2} className="mb-16">
					<Grid item xs={5} md={4} lg={3}>
						<Text>Mã tài sản:</Text>
					</Grid>
					<Grid item xs={7} md={8} lg={9}>
						<Text>{entitiesEdit?.assetCode}</Text>
					</Grid>
					<Grid item xs={5} md={4} lg={3}>
						<Text>Tên tài sản:</Text>
					</Grid>
					<Grid item xs={7} md={8} lg={9}>
						<Text variant="body1">{entitiesEdit?.assetName}</Text>
					</Grid>
					<Grid item xs={5} md={4} lg={3}>
						<Text>Nhóm tài sản:</Text>
					</Grid>
					<Grid item xs={7} md={8} lg={9}>
						<Text variant="body1">{entitiesEdit?.groupName}</Text>
					</Grid>
					<Grid item xs={5} md={4} lg={3}>
						<Text>Mô tả:</Text>
					</Grid>
					<Grid item xs={7} md={8} lg={9}>
						<Text>{entitiesEdit?.descr ? entitiesEdit.descr : '-'}</Text>
					</Grid>
					<Grid item xs={5} md={4} lg={3}>
						<Text>Ngày mua:</Text>
					</Grid>
					<Grid item xs={7} md={8} lg={9}>
						<Text>
							{entitiesEdit?.purchaseDate ? moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY') : ''}
						</Text>
					</Grid>
					<Grid item xs={5} md={4} lg={3}>
						<Text>Nguyên giá:</Text>
					</Grid>
					<Grid item xs={7} md={8} lg={9}>
						<Text>{entitiesEdit && currencyFormat(entitiesEdit.originalPrice)}</Text>
					</Grid>
					<Grid item xs={5} md={4} lg={3}>
						<Text>Tình trạng:</Text>
					</Grid>
					<Grid item xs={7} md={8} lg={9}>
						<Text>{entitiesEdit?.statusName}</Text>
					</Grid>
				</Grid>
			</div>
			<div className="px-16 sm:px-24">
				<Text color="primary" type="subTitle" borderBottom>
					QUÁ TRÌNH SỬ DỤNG
				</Text>
				{actionLoading && <Spin className="mr-18" />}
				<div className="table-form">
					<TableBodyProcessing history={history} />
				</div>
			</div>
		</>
	);
}
