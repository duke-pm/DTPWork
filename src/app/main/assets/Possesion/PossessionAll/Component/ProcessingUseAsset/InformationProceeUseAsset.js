import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import { useDispatch } from 'react-redux';
import image from '@fuse/assets/group.png';
import { TableContainer, Paper, Table } from '@material-ui/core';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Spin } from 'antd';
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
				<div className=" grid grid-cols-1 sm:grid-cols-2 gap-48">
					<div className="flex-row flex ">
						<div className="flex flex-col" style={{ width: '30rem' }}>
							<p className="p-6"> Mã tài sản </p>
							<p className="p-6"> Tên tài sản </p>
							<p className="p-6"> Nhóm tài sản </p>
							<p className="p-6"> Mô tả </p>
						</div>
						<div className="flex sm:mr-96 mr-auto flex-col" style={{ width: '600px' }}>
							<p className="p-6 font-extrabold">{entitiesEdit && entitiesEdit.assetCode}</p>
							<p className="p-6 font-extrabold">{entitiesEdit && entitiesEdit.assetName}</p>
							<p className="p-6 font-extrabold">{entitiesEdit && entitiesEdit.groupName}</p>
							<p className="p-6 font-extrabold"> {entitiesEdit && entitiesEdit.descr}</p>
						</div>
					</div>
					<div className="flex-row flex ">
						<div className="flex flex-col" style={{ width: '15rem' }}>
							<p className="p-6">Ngày mua </p>
							<p className="p-6"> Nguyên giá </p>
							<p className="p-6"> Tình trạng </p>
						</div>
						<div className="flex flex-col sm:mr-98 mr-auto" style={{ width: '600px' }}>
							<p className="p-6 font-extrabold">
								{entitiesEdit && moment(entitiesEdit.purchaseDate).format('DD/MM/YYYY')}
							</p>
							<p className="p-6 font-extrabold">
								{' '}
								{entitiesEdit && currencyFormat(entitiesEdit.originalPrice)}
							</p>
							<p className="p-6 font-extrabold"> {entitiesEdit.statusName || ''} </p>
						</div>
					</div>
				</div>
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
