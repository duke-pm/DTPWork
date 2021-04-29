import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import React from 'react';
import * as moment from 'moment';

export default function ContentForm({ entitiesEdit }) {
	return (
		<div className=" grid grid-cols-1 sm:grid-cols-2 gap-48">
			<div className="flex-row justify-between flex ">
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
			<div className="flex-row justify-between flex ">
				<div className="flex flex-col">
					<p className="p-6">Ngày mua </p>
					<p className="p-6"> Nguyên giá </p>
					<p className="p-166"> Tình trạng </p>
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