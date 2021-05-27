import { validateField } from '@fuse/core/DtpConfig';
import * as Yup from 'yup';

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
		id: 'GroupDetailName',
		align: 'left',
		label: 'Loại tài sản',
		sort: true
	},
	{
		id: 'PurchaseDate',
		align: 'left',
		label: 'Ngày mua',
		sort: true
	},
	{
		id: 'OriginalPrice',
		align: 'left',
		label: 'Nguyên giá',
		sort: true
	},
	{
		id: 'DeptNameManager',
		align: 'left',
		label: 'BP Quản lý',
		sort: true
	},
	{
		id: 'Remark',
		align: 'left',
		label: 'Mã tham chiếu',
		sort: true
	}
];
export const checkValidateForm = Yup.object().shape({
	customer: Yup.string().required(`${validateField}`),
	department: Yup.string().required(`${validateField}`).nullable(),
	location: Yup.string().required(`${validateField}`)
});
