import * as Yup from 'yup';

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
		id: 'bill',
		align: 'left',
		label: 'Nguyên giá'
	},
	{
		id: 'depart',
		align: 'left',
		label: 'BP Quản lý'
	}
];
export const checkValidateForm = Yup.object().shape({
	customer: Yup.string().required('Nhân viên không được để trống'),
	department: Yup.string().required('Bộ phận không được để trống').nullable(),
	location: Yup.string().required('Khu vực không được để trống')
});
