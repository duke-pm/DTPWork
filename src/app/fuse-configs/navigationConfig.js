import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'Tài sản',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'example-component',
				title: 'Quản lí tài sản',
				translate: 'Quản lí tài sản',
				type: 'item',
				icon: 'whatshot',
				url: '/tai-san'
			},
			{
				id: 'confirm',
				title: 'Quản lí đề xuất',
				translate: 'Quản lí đề xuất',
				type: 'collapse',
				icon: 'check',
				children: [
					{
						id: 'requestUser',
						title: 'Danh sách đề xuất',
						transalate: 'Danh sách đề xuất',
						type: 'item',
						url: '/quan-li-de-xuat/xet-duyet'
					},
					{
						id: 'recomend',
						title: 'Đề xuất cần xử lí',
						transalate: 'Đề xuất cần xử lí',
						type: 'item',
						url: '/quan-li-de-xuat/de-xuat-can-xu-ly'
					},
					{
						id: 'Report',
						title: 'Báo hỏng/mất tài sản',
						transalate: 'Báo hỏng/mất tài sản',
						type: 'item',
						url: '/quan-li-de-xuat/bao-mat-hong-tai-san'
					},
					{
						id: 'RequestAsset',
						title: 'Yêu cầu cấp phát tài sản',
						transalate: 'Yêu cầu cấp phát tài sản',
						type: 'item',
						url: '/quan-li-de-xuat/yeu-cau-cap-phat'
					}
				]
			}
		]
	},
	{
		id: 'Govern',
		title: 'Govern',
		translate: 'Quản trị',
		type: 'group',
		children: [
			{
				id: 'groupUser',
				title: 'Nhóm người dùng',
				transalate: 'Nhóm người dùng',
				type: 'item',
				icon: 'group_user',
				url: '/quan-tri/nhom-nguoi-dung'
			},
			{
				id: 'listUser',
				title: 'Danh sách người dùng',
				transalate: 'Danh sách người dùng',
				type: 'item',
				icon: 'list',
				url: '/quan-tri/danh-sach-nguoi-dung'
			},
			{
				id: 'settingNavigation',
				title: 'Thiết lập menu ',
				transalate: 'Danh sách người dùng',
				type: 'item',
				icon: 'settings',
				url: '/quan-tri/thiet-lap-menu'
			},
			{
				id: 'roleNavigation',
				title: 'Phân quyền chức năng',
				transalate: 'Phân quyền chức năng',
				type: 'item',
				icon: 'locks',
				url: '/quan-tri/phan-quyen-chuc-nang'
			}
		]
	}
];

export default navigationConfig;
