/* eslint-disable class-methods-use-this */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
// import * as fs from 'file-saver';
// import ExcelJs from 'exceljs';
import { getToken, URL } from '@fuse/core/DtpConfig';
import { Button } from '@material-ui/core';
// import moment from 'moment';
import { GetApp } from '@material-ui/icons';

class ExportToExcel extends React.Component {
	// getTotalPrice = arr => {
	// 	let result = 0;
	// 	arr.forEach(row => {
	// 		result += row.price;
	// 	});
	// 	return result;
	// };

	// exportToExcel = () => {
	// 	const myHeader = [
	// 		'AssetID',
	// 		'Nhóm tài sản',
	// 		'Loại tài sản',
	// 		'Mã tài sản',
	// 		'Tên Tài sản',
	// 		'Quy cách/Thông số kĩ thuật',
	// 		'Ngày mua',
	// 		'Giá Tiền',
	// 		'Mã Nhân viên',
	// 		'Tên nhân viên',
	// 		'Mã bộ phận',
	// 		'Tên bộ phận',
	// 		'Khu vực',
	// 		'Mã tham chiếu'
	// 	];
	// 	const newData = this.props.entities.reduce(
	// 		(arr, curr) => [
	// 			...arr,
	// 			{
	// 				assetId: curr.assetID,
	// 				groupAsset: curr.groupName,
	// 				typeAsset: curr.assetTypeName,
	// 				assetCode: curr.assetCode,
	// 				nameAsset: curr.assetName,
	// 				description: curr.descr,
	// 				purchaseDate: curr.purchaseDate ? moment(curr.purchaseDate).format('DD/MM/YYYY') : '',
	// 				price: curr.originalPrice,
	// 				empCode: curr.empCode,
	// 				empName: curr.empName,
	// 				deptCodeManager: curr.deptCodeManager,
	// 				deptNameManager: curr.deptNameManager,
	// 				regionName: curr.regionName,
	// 				remarks: curr.remarks
	// 			}
	// 		],
	// 		[]
	// 	);
	// 	const total = this.getTotalPrice(newData);
	// 	const mySum = ['Tổng giá trị', '', '', '', '', '', '', +total.toFixed(2)];
	// 	this.exportToExcelPro(newData, 'DowLoad', 'Sheet1', 'Thống kê tài sản', myHeader, mySum, [
	// 		{ width: 55 },
	// 		{ width: 55 },
	// 		{ width: 55 },
	// 		{ width: 55 },
	// 		{ width: 55 },
	// 		{ width: 55 },
	// 		{ width: 55 },
	// 		{ width: 55 },
	// 		{ width: 55 },
	// 		{ width: 55 },
	// 		{ width: 55 },
	// 		{ width: 55 },
	// 		{ width: 55 },
	// 		{ width: 55 }
	// 	]);
	// };

	// addRow = (ws, data, section) => {
	// 	const borderStyle = {
	// 		top: { style: 'thin' },
	// 		left: { style: 'thin' },
	// 		bottom: { style: 'thin' },
	// 		right: { style: 'thin' }
	// 	};
	// 	const row = ws.addRow(data);
	// 	row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
	// 		if (section?.border) {
	// 			cell.border = borderStyle;
	// 		}
	// 		if (section?.money && typeof cell.value === 'number') {
	// 			cell.alignment = { horizontal: 'right' };
	// 			cell.numFmt = '#,##;[Red]-#,##';
	// 		}
	// 		if (section?.alignment) {
	// 			cell.alignment = section.alignment;
	// 		}
	// 		if (section?.font) {
	// 			cell.font = section.font;
	// 		}
	// 		if (section?.fill) {
	// 			cell.fill = section.fill;
	// 		}
	// 	});
	// 	if (section?.height > 0) {
	// 		row.height = section.height;
	// 	}
	// 	return row;
	// };

	// mergeCells = (ws, row, from, to) => {
	// 	ws.mergeCells(`${row.getCell(from)._address}:${row.getCell(to)._address}`);
	// };

	// async exportToExcelPro(myData, fileName, sheetName, report, myHeader, mySum, width) {
	// 	if (!myData || myData.length === 0) {
	// 		console.log('Chưa có data');
	// 	}
	// 	const wb = new ExcelJs.Workbook();
	// 	const ws = wb.addWorksheet(sheetName);
	// 	const columns = myHeader?.length;
	// 	const title = {
	// 		border: true,
	// 		money: true,
	// 		height: 50,
	// 		font: { size: 30, bold: false, color: { argb: '000000' } },
	// 		alignment: { horizontal: 'center', vertical: 'middle' },
	// 		fill: {
	// 			type: 'pattern',
	// 			pattern: 'solid',
	// 			fgColor: {
	// 				argb: 'FFFFFF'
	// 			}
	// 		}
	// 	};
	// 	const header = {
	// 		border: true,
	// 		money: false,
	// 		height: 50,
	// 		font: { size: 20, bold: true, color: { argb: '000000' } },
	// 		alignment: { horizontal: 'center', vertical: 'middle' },
	// 		fill: {
	// 			type: 'pattern',
	// 			pattern: 'solid',
	// 			fgColor: {
	// 				argb: 'F7E6AD'
	// 			}
	// 		}
	// 	};
	// 	const data = {
	// 		border: true,
	// 		money: true,
	// 		height: 30,
	// 		font: { size: 15, bold: false, color: { argb: '000000' } },
	// 		alignment: null,
	// 		fill: null
	// 	};
	// 	const sumPrice = {
	// 		border: true,
	// 		money: true,
	// 		height: 40,
	// 		font: { size: 25, bold: true, color: { argb: '000000' } },
	// 		alignment: { vertical: 'middle' },
	// 		fill: {
	// 			type: 'pattern',
	// 			pattern: 'solid',
	// 			fgColor: {
	// 				argb: 'F7E6AD'
	// 			}
	// 		}
	// 	};
	// 	if (width && width.length > 0) {
	// 		ws.columns = width;
	// 	}
	// 	let row = this.addRow(ws, [report], title);

	// 	this.mergeCells(ws, row, 1, columns);

	// 	this.addRow(ws, myHeader, header);

	// 	myData.forEach(r => {
	// 		this.addRow(ws, Object.values(r), data);
	// 	});

	// 	row = this.addRow(ws, mySum, sumPrice);
	// 	this.mergeCells(ws, row, 1, 7);

	// 	const buf = await wb.xlsx.writeBuffer();
	// 	fs.saveAs(new Blob([buf]), `${fileName}.xlsx`);
	// }
	exportToExcel = () => {
		const token = getToken();
		const data = {
			UserToken: token
		};
		window.location = `${URL}/api/Assets/ExportAsset?value=${JSON.stringify(data)}`;
	};

	render() {
		return (
			<Button
				className="mt-8 sm:mt-0 mb-8 sm:mb-0 h-26 max-w-160 "
				variant="contained"
				color="primary"
				onClick={this.exportToExcel}
				startIcon={<GetApp />}
			>
				{' '}
				Xuất excel{' '}
			</Button>
		);
	}
}
export default ExportToExcel;
