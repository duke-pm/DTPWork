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
		translate: 'Navigation',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'asset',
				title: 'asset',
				translate: 'Tài sản',
				type: 'collapse',
				icon: 'emoji_transportation',
				children: [
					{
						id: 'example-component',
						title: 'Quản lí tài sản',
						translate: 'Quản lí tài sản',
						type: 'item',
						icon: 'arrow_right',
						url: '/tai-san'
					},
					{
						id: 'requestUser',
						title: 'Danh sách đề xuất',
						transalate: 'Danh sách đề xuất',
						type: 'item',
						icon: 'arrow_right',
						url: '/xet-duyet'
					},
					{
						id: 'recomend',
						title: 'Đề xuất cần xử lí',
						transalate: 'Đề xuất cần xử lí',
						type: 'item',
						icon: 'arrow_right',
						url: '/de-xuat-can-xu-ly'
					}
				]
			},
			{
				id: 'Govern',
				title: 'Govern',
				translate: 'Quản trị',
				type: 'collapse',
				icon: 'settings',
				children: [
					{
						id: 'groupUser',
						title: 'Nhóm người dùng',
						transalate: 'Nhóm người dùng',
						type: 'item',
						icon: 'arrow_right',
						url: '/quan-tri/nhom-nguoi-dung'
					},
					{
						id: 'listUser',
						title: 'Danh sách người dùng',
						transalate: 'Danh sách người dùng',
						type: 'item',
						icon: 'arrow_right',
						url: '/quan-tri/danh-sach-nguoi-dung'
					},
					{
						id: 'settingNavigation',
						title: 'Thiết lập menu ',
						transalate: 'Danh sách người dùng',
						type: 'item',
						icon: 'arrow_right',
						url: '/quan-tri/thiet-lap-menu'
					},
					{
						id: 'roleNavigation',
						title: 'Phân quyền chức năng',
						transalate: 'Phân quyền chức năng',
						type: 'item',
						icon: 'arrow_right',
						url: '/quan-tri/phan-quyen-chuc-nang'
					}
				]
			}
		]
	}
];

export default navigationConfig;
