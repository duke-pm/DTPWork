import * as Yup from 'yup';

export const chipColor = {
	'Đã báo hỏng': 'bg-purple text-white',
	'Đã báo mất': 'bg-red-700 text-white',
	false: 'bg-green text-white'
};
export const rowPossesion = [
	{
		id: 'assetId',
		align: 'left',
		label: 'Mã tài sản'
	},
	{
		id: 'assetName',
		align: 'left',
		label: 'Tên tài sản'
	},
	{
		id: 'assetGroup',
		align: 'left',
		label: 'Nhóm tài sản'
	},
	{
		id: 'purschaseDate',
		align: 'left',
		label: 'Ngày mua'
	},
	{
		id: 'depart',
		align: 'left',
		label: 'BP Quản lý'
	},
	{
		id: 'empName',
		align: 'left',
		label: 'Nhân viên'
	},
	{
		id: 'status',
		align: 'left',
		label: 'Trạng thái'
	}
];

export const validateSchema = Yup.object().shape({
	name: Yup.string().required('Nhân viên không được để trống'),
	department: Yup.string().required('Bộ phận không được để trống'),
	region: Yup.string().required('Khu vực không được để trống'),
	locationUse: Yup.string().required('Nơi dùng không được để trống'),
	reason: Yup.string().required('Lí do không được để trống')
});