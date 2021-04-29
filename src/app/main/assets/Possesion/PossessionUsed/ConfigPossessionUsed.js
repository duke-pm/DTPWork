import * as Yup from 'yup';

export const chipColor = {
	'Đã báo hỏng': 'bg-purple text-white',
	'Đã báo mất': 'bg-red-700 text-white',
	false: 'bg-green text-white'
};
export const rowPossesion = [
	{
		id: 'AssetCode',
		align: 'left',
		label: 'Mã tài sản',
		sort: true
	},
	{
		id: 'AssetName',
		align: 'left',
		label: 'Tên tài sản',
		sort: true
	},
	{
		id: 'GroupName',
		align: 'left',
		label: 'Nhóm tài sản',
		sort: true
	},
	{
		id: 'PurchaseDate',
		align: 'left',
		label: 'Ngày mua',
		sort: true
	},
	{
		id: 'DeptNameManager',
		align: 'left',
		label: 'BP Quản lý',
		sort: true
	},
	{
		id: 'EmpName',
		align: 'left',
		label: 'Nhân viên quản lí tài sản',
		sort: true
	},
	{
		id: 'StatusName',
		align: 'left',
		label: 'Trạng thái',
		sort: true
	}
];