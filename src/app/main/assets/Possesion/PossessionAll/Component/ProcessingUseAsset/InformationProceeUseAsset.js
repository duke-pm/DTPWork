import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import { useDispatch } from 'react-redux';
import image from '@fuse/assets/group.png';
import { TableContainer, Paper, Table, Grid, Typography } from '@material-ui/core';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Spin, Tooltip } from 'antd';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import * as actions from '../../../_redux/possesionActions';
import TableHeaderProcessing from './TableProcessingUseAsset/TableHeaderProcessing';
import TableBodyProcessing from './TableProcessingUseAsset/TableBodyProcessing';

export default function InformationProceeUseAsset({ entitiesEdit, actionLoading }) {
	const dispatch = useDispatch();
	const classes = DtpCustomStyles();
	const [history, setHistory] = useState([]);
	useEffect(() => {
		dispatch(actions.getAssetHistory(entitiesEdit.assetID)).then(data => {
			setHistory(data.data.listTransHistory);
		});
	}, [dispatch, entitiesEdit.assetID]);
	return (
		<>
			<div className="px-16 sm:px-24">
				<div className="flex justify-between flex-row">
					<h5 className="font-extrabold">Thông tin tài sản.</h5>
				</div>
				<Grid alignItems="flex-start" container item>
					<Grid container item xs={12} sm={6} md={6} lg={6}>
						<Grid item xs={5} md={4} lg={3}>
							<Typography className="p-6 text-left truncate" variant="body1">
								Mã tài sản
							</Typography>
						</Grid>
						<Grid item xs={7} md={8} lg={9}>
							<Typography className="p-6 font-extrabold " variant="body1">
								{entitiesEdit?.assetCode}
							</Typography>
						</Grid>
						<Grid item xs={5} md={4} lg={3}>
							<Typography className="p-6 truncate" variant="body1">
								Tên tài sản
							</Typography>
						</Grid>
						<Grid item xs={7} md={8} lg={9}>
							<Typography className="p-6 font-extrabold " variant="body1">
								{entitiesEdit?.assetName}
							</Typography>
						</Grid>
						<Grid item xs={5} md={4} lg={3}>
							<Typography className="p-6 truncate" variant="body1">
								Nhóm tài sản
							</Typography>
						</Grid>
						<Grid item xs={7} md={8} lg={9}>
							<Typography className="p-6 font-extrabold " variant="body1">
								{entitiesEdit?.groupName}
							</Typography>
						</Grid>
						<Grid item xs={5} md={4} lg={3}>
							<Typography className="p-6 truncate" variant="body1">
								Mô tả
							</Typography>
						</Grid>
						<Grid item xs={7} md={8} lg={9}>
							<Typography className="p-6 font-extrabold " variant="body1">
								{entitiesEdit?.descr}
							</Typography>
						</Grid>
					</Grid>
					<Grid container item xs={12} sm={6} md={6} lg={6}>
						<Grid item xs={5} md={4} lg={3}>
							<Typography className="p-6 truncate" variant="body1">
								Ngày mua
							</Typography>
						</Grid>
						<Grid item xs={7} md={8} lg={9}>
							<Typography className="p-6 font-extrabold " variant="body1">
								{entitiesEdit && moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY')}
							</Typography>
						</Grid>
						<Grid item xs={5} md={4} lg={3}>
							<Typography className="p-6 truncate" variant="body1">
								Nguyên giá
							</Typography>
						</Grid>
						<Grid item xs={7} md={8} lg={9}>
							<Typography className="p-6 font-extrabold " variant="body1">
								{entitiesEdit && currencyFormat(entitiesEdit.originalPrice)}
							</Typography>
						</Grid>
						<Grid item xs={5} md={4} lg={3}>
							<Typography className="p-6 truncate" variant="body1">
								Tình trạng
							</Typography>
						</Grid>
						<Grid item xs={7} md={8} lg={9}>
							<Typography className="p-6 font-extrabold " variant="body1">
								{entitiesEdit?.statusName}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</div>
			<div className="px-16 sm:px-24">
				<div className="flex flex-row">
					<h5 className="font-extrabold">Quá trình sử dụng.</h5>
					{actionLoading && <Spin className="mr-18" />}
				</div>
				<FuseAnimateGroup
					enter={{
						animation: 'transition.expandIn'
					}}
				>
					<Paper>
						<TableContainer>
							<Table
								className={history.length === 0 ? classes.tableHistoryNoData : classes.tableHistroy}
								stickyHeader
							>
								<TableHeaderProcessing />
								<TableBodyProcessing history={history} />
							</Table>
							{history && history.length === 0 ? (
								<div className="flex items-center justify-center h-auto">
									<img className="rounded-full mx-auto" src={image} alt="" width="484" height="512" />
								</div>
							) : null}
						</TableContainer>
					</Paper>
				</FuseAnimateGroup>
			</div>
		</>
	);
}
