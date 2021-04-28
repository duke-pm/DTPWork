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
		id: 'empCode',
		align: 'left',
		label: 'Mã nhân viên',
		sort: true
	},
	{
		id: 'fullName',
		align: 'left',
		label: 'Tên nhân viên',
		sort: true
	},
	{
		id: 'deptName',
		align: 'left',
		label: 'Bộ phận',
		sort: true
	},
	{
		id: 'regionName',
		align: 'left',
		label: 'Khu vực'
	},
	{
		id: 'requestDate',
		align: 'left',
		label: 'Ngày yêu cầu'
	},
	{
		id: 'status',
		align: 'left',
		label: 'Trạng thái'
	}
];
