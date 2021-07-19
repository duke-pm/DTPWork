import { validateField } from '@fuse/core/DtpConfig';
import * as Yup from 'yup';

export const chipColor = {
	1: 'bg-blue text-white',
	2: 'bg-green text-white',
	3: 'bg-gray text-white',
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
	6: 'Thanh lý'
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
		id: 'GroupDetailName',
		align: 'left',
		label: 'Loại tài sản',
		sort: true
	},
	{
		id: 'StatusName',
		align: 'center',
		label: 'Trạng thái',
		sort: true
	},
	{
		id: 'PurchaseDate',
		align: 'center',
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
		label: 'NV Quản lý',
		sort: true
	},
	{
		id: 'RegionName',
		align: 'left',
		label: 'Khu vực',
		sort: true
	},
	{
		id: 'Remark',
		align: 'left',
		label: 'Mã tham chiếu',
		sort: true
	}
];

export const checkValidateFormConfig = Yup.object().shape({
	assetName: Yup.string().required(`${validateField}`),
	purchaseDate: Yup.date().required(`${validateField}`).nullable(),
	qty: Yup.number().typeError(`${validateField}`).required(`${validateField}`),
	company: Yup.string().required(`${validateField}`),
	category: Yup.string().required(`${validateField}`),
	group: Yup.string().required(`${validateField}`),
	asset: Yup.string().required(`${validateField}`),
	deptCodeManager: Yup.string().required(`${validateField}`)
});

export const checkValidateFormConfigUpdate = Yup.object().shape({
	assetName: Yup.string().required(`${validateField}`),
	purchaseDate: Yup.date().required(`${validateField}`).nullable()
});
