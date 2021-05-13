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
export const rowConfirmAllocation = [
	{
		id: 'RequestID',
		align: 'left',
		label: 'Số yêu cầu',
		sort: true
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
		sort: true
	},
	{
		id: 'statusID',
		align: 'left',
		label: 'Trạng thái',
		sort: true
	}
];
