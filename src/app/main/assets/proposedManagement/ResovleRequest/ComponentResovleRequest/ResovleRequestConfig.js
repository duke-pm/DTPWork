// import * as Yup from 'yup';

export const chipColor = {
	1: 'bg-blue text-white',
	2: 'bg-orange text-black',
	3: 'bg-green text-white',
	4: 'bg-purple text-white'
};
export const chipText = {
	1: 'Chờ phê duyệt',
	2: 'Đã duyệt',
	3: 'Hoàn thành',
	4: 'Từ chối'
};
export const chipTextType = {
	1: 'Yêu cầu cấp phát',
	2: 'Báo hỏng tài sản',
	3: 'Báo mất tài sản'
};
export const chipTextColor = {
	1: 'bg-blue text-white',
	2: 'bg-orange text-black',
	3: 'bg-green text-white'
};
export const rowConfirmAllocation = [
	{
		id: 'RequestID',
		align: 'left',
		label: '#',
		sort: true,
		width: 10
	},
	{
		id: 'FullName',
		align: 'left',
		label: 'Tên nhân viên',
		sort: true
	},
	{
		id: 'DeptName',
		align: 'left',
		label: 'Bộ phận',
		sort: true
	},
	{
		id: 'RegionName',
		align: 'left',
		label: 'Khu vực',
		sort: true
	},
	{
		id: 'RequestDate',
		align: 'left',
		label: 'Ngày yêu cầu',
		sort: true,
		width: 20
	},
	{
		id: 'TypeRequest',
		align: 'left',
		label: 'Loại yêu cầu',
		sort: true,
		width: 20
	},
	{
		id: 'statusID',
		align: 'left',
		label: 'Trạng thái',
		sort: true,
		width: 20
	}
];
