import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import React from 'react';
import * as moment from 'moment';
import { Tooltip } from 'antd';

export default function ContentForm({ entitiesEdit }) {
	return (
		<div className=" grid lg:grid-cols-2 md:grid-cols-2  sm:grid-cols-1">
			<div className="flex-row flex">
				<div className="flex flex-col ">
					<p className="p-6"> Mã tài sản </p>
					<p className="p-6"> Tên tài sản </p>
					<p className="p-6"> Nhóm tài sản </p>
					<p className="p-6"> Mô tả </p>
				</div>
				<div className="flex sm:mr-96 mr-auto  flex-col">
					<p className="p-6 font-extrabold">{entitiesEdit?.assetCode}</p>
					<Tooltip placement="topLeft" title={entitiesEdit?.assetName}>
						<p className="p-6 font-extrabold truncate max-w-200"> {entitiesEdit?.assetName}</p>
					</Tooltip>
					<p className="p-6 font-extrabold">{entitiesEdit?.groupName}</p>
					<Tooltip placement="topLeft" title={entitiesEdit?.descr}>
						<p className="p-6 font-extrabold truncate max-w-200"> {entitiesEdit?.descr}</p>
					</Tooltip>
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
					<p className="p-6 font-extrabold"> {entitiesEdit && currencyFormat(entitiesEdit.originalPrice)}</p>
					<p className="p-6 font-extrabold"> Chưa sử dụng </p>
				</div>
			</div>
		</div>
	);
}
