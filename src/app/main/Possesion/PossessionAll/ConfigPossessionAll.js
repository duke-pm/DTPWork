import * as Yup from 'yup';

export const chipColor = {
	1: 'bg-blue text-white',
	2: 'bg-green text-white',
	3: 'bg-orange text-black',
	4: 'bg-purple text-white',
	5: 'bg-red-700 text-white',
	6: 'bg-yellow-900 text-white'
};
export const chipText = {
	1: 'Chưa sử dụng',
	2: 'Đang sử dụng',
	3: 'Sửa chữa-bảo hành',
	4: 'Hư hỏng',
	5: 'Mất ',
	6: 'Thanh lí'
};

export const rowPossesion = [
	{
		id: 'assetId',
		align: 'left',
		label: 'Mã tài sản',
		sort: true
	},
	{
		id: 'assetName',
		align: 'left',
		label: 'Tên tài sản',
		sort: true
	},
	{
		id: 'assetGroup',
		align: 'left',
		label: 'Nhóm tài sản',
		sort: true
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

export const checkValidateFormConfig = Yup.object().shape({
	assetName: Yup.string().required('Tên tài sản không được để trống'),
	purchaseDate: Yup.date().required('Ngày mua không được để trống').nullable(),
	qty: Yup.number()
		.typeError('Số lượng phải là dạng số và không được để trống. ')
		.required('Số lượng không được để trống'),
	company: Yup.string().required('Công ty không được để trống'),
	category: Yup.string().required('Loại không được để trống'),
	group: Yup.string().required('Nhóm không được để trống'),
	asset: Yup.string().required('Tiền đố không được để trống')
});