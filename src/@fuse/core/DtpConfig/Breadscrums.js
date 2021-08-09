/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
export function convertToVietNamese(array) {
	return array.map(word => {
		switch (word) {
			case 'trang-chu':
				return '';
			case 'tai-san':
				return 'Quản lý tài sản';
			case 'xet-duyet':
				return 'Danh sách đề xuất';
			case 'de-xuat-can-xu-ly':
				return 'Đề xuất cần xử lý';
			case 'quan-tri':
				return 'Quản trị';
			case 'nhom-nguoi-dung':
				return 'Nhóm người dùng';
			case 'danh-sach-nguoi-dung':
				return 'Danh sách người dùng';
			case 'thiet-lap-menu':
				return 'Thiết lập menu';
			case 'yeu-cau-cap-phat':
				return 'Yêu cầu cấp phát';
			case 'bao-mat-hong-tai-san':
				return 'Báo mất/hỏng tài sản';
			case 'phan-quyen-chuc-nang':
				return 'Phân quyền chức năng';
			case 'quan-ly-du-an':
				return 'Quản lý dự án';
			case 'thong-tin-nguoi-dung':
				return 'Thông tin người dùng';
			case 'tong-quan-du-an':
				return 'Tổng quan dự án';
			default:
				break;
		}
	});
}
