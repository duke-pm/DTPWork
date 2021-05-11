import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import { useDispatch } from 'react-redux';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { TableContainer, Paper, Table } from '@material-ui/core';
import * as actions from '../../../_redux/possesionActions';
import TableHeaderProcessing from './TableProcessingUseAsset/TableHeaderProcessing';
import TableBodyProcessing from './TableProcessingUseAsset/TableBodyProcessing';
import { useStyles } from '../../StyleCustomAll';

export default function InformationProceeUseAsset({ entitiesEdit }) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [history, setHistory] = useState(null);
	useEffect(() => {
		dispatch(actions.getAssetHistory(entitiesEdit.assetID)).then(data => {
			setHistory(data.data.listTransHistory);
		});
	}, [dispatch, entitiesEdit.assetID]);
	return (
		<>
			<div className="flex justify-between flex-row">
				<h5 className="font-extrabold">Thông tin tài sản.</h5>
			</div>
			<div className=" grid grid-cols-1 sm:grid-cols-2 gap-26">
				<div className="flex-row flex ">
					<div className="flex flex-col">
						<p className="p-6"> Mã tài sản </p>
						<p className="p-6"> Tên tài sản </p>
						<p className="p-6"> Nhóm tài sản </p>
						<p className="p-6"> Mô tả </p>
					</div>
					<div className="flex sm:mr-96 mr-auto flex-col">
						<p className="p-6 font-extrabold">{entitiesEdit && entitiesEdit.assetCode}</p>
						<p className="p-6 font-extrabold">{entitiesEdit && entitiesEdit.assetName}</p>
						<p className="p-6 font-extrabold">{entitiesEdit && entitiesEdit.groupName}</p>
						<p className="p-6 font-extrabold"> {entitiesEdit && entitiesEdit.descr}</p>
					</div>
				</div>
				<div className="flex-row flex ">
					<div className="flex flex-col">
						<p className="p-6">Ngày mua </p>
						<p className="p-6"> Nguyên giá </p>
						<p className="p-6"> Tình trạng </p>
					</div>
					<div className="flex sm:mr-96 mr-auto flex-col">
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
			<div className="flex justify-between flex-row">
				<h5 className="font-extrabold">Quá trình sử dụng.</h5>
			</div>
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<TableContainer>
					<Table className={`${classes.table}`} stickyHeader>
						<Paper>
							<TableHeaderProcessing />
							<TableBodyProcessing history={history} />
						</Paper>
					</Table>
				</TableContainer>
			</FuseAnimate>
		</>
	);
}
