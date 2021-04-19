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
		translate: 'Quản lý',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'example-component',
				title: 'Tài sản',
				translate: 'Tài sản',
				type: 'item',
				icon: 'whatshot',
				url: '/tai-san'
			}
		]
	}
];

export default navigationConfig;
